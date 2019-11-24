class NegociacaoService {
    constructor() {
        this._service = new HttpService()
    }
    obterNegociacoesDaSemana() {
        return this._service
            .get('/negociacoes/semana')
            .then(negociacoes => {
                console.log(negociacoes)
                return negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
            })
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível importar as negociações da semana')
            })

    }
    obterNegociacoesDaSemanaAnterior() {
        return this._service
            .get('/negociacoes/anterior')
            .then(negociacoes => {
                console.log(negociacoes)
                return negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
            })
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível importar as negociações da semana')
            })
    }
    obterNegociacoesDaSemanaRetrasada() {
        return this._service
            .get('/negociacoes/retrasada')
            .then(negociacoes => {
                console.log(negociacoes)
                return negociacoes.map(item => new Negociacao(new Date(item.data), item.quantidade, item.valor))
            })
            .catch(erro => {
                console.log(erro)
                throw new Error('Não foi possível importar as negociações da semana')
            })
    }
}