class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)

        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._ordemAtual = ''

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            new NegociacoesView($('#negociacoesView')), 'adiciona', 'apaga', 'ordena', 'inverteOrdem')

        this._mensagem = new Bind(
            new Mensagem(), new MensagemView($('#mensagemView')), 'texto')

        this._service = new NegociacaoService()

        //Listando todas as negociações ao carregar a página
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                    negociacoes.forEach(negociacao => 
                        this._listaNegociacoes.adiciona(negociacao)))
            .then(() => this.ordena('data'))
            .catch(erro => {
                console.log(erro)
                this._mensagem.texto = erro
            })

    }

    adiciona(event) {
        event.preventDefault()

        //Adiciona uma negociação
        ConnectionFactory
            .getConnection()
            .then(connection => {
                let negociacao = this._criaNegociacao()

                new NegociacaoDao(connection)
                    .adiciona(negociacao)
                    .then(() => {
                        //Se a conexão foi criada com sucesso, atualiza a lista para refletir na view
                        this._listaNegociacoes.adiciona(negociacao)
                        this._mensagem.texto = 'Negociação inserida com sucesso'
                        this._limpaNegociacao()
                    })
            })
            .catch(erro => this._mensagem.texto = erro)
    }

    apaga(event) {

        //Apagando todas as negociações
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(mensagem => {
                this._listaNegociacoes.apaga()
                this._mensagem.texto = mensagem
            })
    }

    importaNegociacoes(event) {
        
        // O primeiro then somente vai importar os itens que não foram inseridos em this._listaNegociacoes
        this._service
            .obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                        JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao)))
            )
            .then(resultado => {
                resultado.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._mensagem.texto = "Negociações importadas com sucesso"
            })
            .catch(erro => console.log(erro))
    }

    ordena(coluna) {
        if (this._ordemAtual === coluna) {
            this._listaNegociacoes.inverteOrdem()
        } else {
            this._listaNegociacoes.ordena((ant, prox) => prox[coluna] - ant[coluna])
        }
        this._ordemAtual = coluna
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limpaNegociacao() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }
}