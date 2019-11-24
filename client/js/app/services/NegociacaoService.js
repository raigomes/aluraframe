class NegociacaoService {
    constructor() {
        this._service = new HttpService()
    }
    obterNegociacoesDaSemana() {
        return this._service
            .get('/negociacoes/semana')
            .then(resposta =>
                resposta.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
            )
            .catch(erro => console.log('Não foi possível importar as negociações da semana', erro))

    }
    obterNegociacoesDaSemanaAnterior() {
        return this._service
            .get('/negociacoes/anterior')
            .then(resposta =>
                resposta.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
            )
            .catch(erro => console.log('Não foi possível importar as negociações da semana anterior', erro))
    }
    obterNegociacoesDaSemanaRetrasada() {
        return this._service
            .get('/negociacoes/retrasada')
            .then(resposta =>
                resposta.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
            )
            .catch(erro => console.log('Não foi possível importar as negociações da semana retrasada', erro))
    }
}