class ListaNegociacoes {
    constructor(contexto, callback) {
        this._negociacoes = []
        this._contexto = contexto
        this._callback = callback
    }

    get negociacoes() {
        return [].concat(this._negociacoes)
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao)
        this._callback(this._negociacoes)
    }

    apaga() {
        this._negociacoes = []
        this._callback(this._negociacoes)
    }
}