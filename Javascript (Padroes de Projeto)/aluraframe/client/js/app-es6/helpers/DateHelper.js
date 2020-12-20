export class DateHelper{

    constructor(){
        throw new Error('Esta classe não pode ser instanciada')
    }
    
    static stringfyDate(data){
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`

    }

    static convertForDate(text){
        if(!/\d{2}\/\d{2}\/\d{4}/.test(text)) 
            throw new Error('Deverá estar no formato dd/mm/aaaa');

        return new Date(...text.split('/').reverse().map((item, indice) => item - indice%2));
    }
}