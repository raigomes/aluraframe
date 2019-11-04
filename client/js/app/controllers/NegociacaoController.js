class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        this._table = $('table tbody')
        this._listaNegociacoes = new ListaNegociacoes()
    }

    adiciona(event) {
        event.preventDefault()

        let negociacao = new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
        this._listaNegociacoes.adiciona(negociacao)

        this._table.appendChild(this.criaTr(negociacao))
        console.log(this._listaNegociacoes)
    }

    criaTr(negociacao) {
        let tr = document.createElement('TR')
        let data = DateHelper.dataParaTexto(negociacao.data)

        tr.appendChild(this.criaTd(data))
        tr.appendChild(this.criaTd(negociacao.quantidade))
        tr.appendChild(this.criaTd(negociacao.valor))
        tr.appendChild(this.criaTd(negociacao.volume))

        return tr
    }

    criaTd(valor) {
        let td = document.createElement('TD')
        td.innerHTML = valor

        return td
    }
}