class NegociacaoController {
    constructor () {
        let $ = document.querySelector.bind(document)
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')
        this.table = $('table tbody')
    }

    adiciona(event) {
        event.preventDefault()

        let data = new Date(...this._inputData.value
                                .split('-')
                                .map((item, index) => item - index % 2))

        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        )

        this.table.appendChild(this.criaTr(negociacao))
    }

    criaTr(negociacao) {
        let tr = document.createElement('TR')
    
        tr.appendChild(this.criaTd(negociacao.data))
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