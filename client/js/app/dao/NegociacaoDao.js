class NegociacaoDao {

    constructor(connection) {
        this._connection = connection
        this._store = 'negociacoes'
    }

    adiciona(negociacao) {
        
        return new Promise ((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao)

            request.onsuccess = e => {
                resolve()
            }

            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível adicionar a negociação')
            }
        })
    }

    listaTodos() {
        
        return new Promise ((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore('negociacoes')
                .openCursor()

            let negociacoes = []

            cursor.onsuccess = e => {

                let atual = e.target.result

                if(atual) {
                    let dado = atual.value

                    negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor))

                    atual.continue()
                }
                else {
                    //Entra no else quando não tiver mais itens na lista, logo retorna o array preenchido
                    resolve(negociacoes)
                }
            }

            cursor.onerror = e => {

                console.log(e.target.error)
                reject('Não foi possível listar as negociações')
            }
        })
    }

    apagaTodos() {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore('negociacoes')
                .clear()

            request.onsuccess = e => resolve('Negociações apagadas com sucesso')
            
            request.onerror = e => {
                console.log(e.target.error)
                reject('Não foi possível apagar as negociações')
            }

        })
    }
}