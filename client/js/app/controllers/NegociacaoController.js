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
    }

    adiciona(event) {
        event.preventDefault()

        this._listaNegociacoes.adiciona(this._criaNegociacao())

        this._mensagem.texto = 'Negociação inserida com sucesso'

        this._limpaNegociacao()
    }

    apaga(event) {
        this._listaNegociacoes.apaga()
        this._mensagem.texto = 'Negociações apagadas com sucesso'
    }

    importaNegociacoes(event) {
        this._service.obterNegociacoes()
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
            this._listaNegociacoes.ordena((ant, prox) => ant[coluna] - prox[coluna])
        }
        this._ordemAtual = coluna
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaNegociacao() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0
        this._inputData.focus()
    }
}