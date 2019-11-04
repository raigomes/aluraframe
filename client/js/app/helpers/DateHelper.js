class DateHelper {
    constructor() {
        throw new Error('Classe não pode ser instanciada')
    }

    static textoParaData(data) {
        if (!/\d{4}-\d{2}-\d{2}/.test(data)) throw new Error('Data inválida!')
        return new Date(...data.split('-').map((item, index) => item - index % 2))
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`
    }
}