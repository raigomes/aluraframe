class DateHelper {
    constructor() {
        throw new Error('Classe não pode ser instanciada')
    }

    static textoParaData(data) {
        if (!/\d{2}\/\d{2}\/\d{4}/.test(data)) throw new Error('Data deve estar no formato dd/mm/aaaa')
        return new Date(...data.split('/').reverse().map((item, indice) => item - indice % 2))
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
    }
}