class NegociacaoService {
    static enviaRequisicao(callback) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '/negociacoes/semana')

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    JSON.parse(xhr.responseText).map(item => {
                        callback(new Negociacao(new Date(item.data), item.quantidade, item.valor))
                    })
                    alert('Negociações importadas com sucesso!')
                } else {
                    console.error('Importação não concluida')
                }
            }
        }

        xhr.send()
    }
}