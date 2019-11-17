class NegociacaoController {
    constructor() {
        const $ = document.querySelector.bind(document)
        const self = this
        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            get(target, prop, receiver) {
                if (['adiciona', 'apaga'].includes(prop) && typeof (target[prop]) === 'function') {

                    return function () {

                        Reflect.apply(target[prop], target, arguments)
                        return self._negociacoesView.update(target)
                    }
                }
                return Reflect.get(target, prop, receiver)
            }

        })
        this._negociacoesView = new NegociacoesView($('#negociacoesView'))

        this._mensagem = new Mensagem()
        this._mensagemView = new MensagemView($('#mensagemView'))
        this._mensagemView.update(this._mensagem)
    }

    adiciona(event) {
        event.preventDefault()

        this._listaNegociacoes.adiciona(this._criaNegociacao())

        this._mensagem.texto = 'Elemento inserido com sucesso'
        this._mensagemView.update(this._mensagem)

        this._limpaNegociacao()
    }

    apaga(event) {
        this._listaNegociacoes.apaga()
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