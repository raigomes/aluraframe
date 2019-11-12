class NegociacaoController {
  constructor () {
    const $ = document.querySelector.bind(document)
    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')
    this._table = $('table tbody')
    this._listaNegociacoes = new ListaNegociacoes()
    this._negociacoesView = new NegociacoesView($('#negociacoesView'))
  }

  adiciona (event) {
    event.preventDefault()

    this._listaNegociacoes.adiciona(this._criaNegociacao())
    this._negociacoesView.update(this._listaNegociacoes)
  }

  _criaNegociacao () {
    return new Negociacao(
      DateHelper.textoParaData(this._inputData.value),
      this._inputQuantidade.value,
      this._inputValor.value
    )
  }
}
