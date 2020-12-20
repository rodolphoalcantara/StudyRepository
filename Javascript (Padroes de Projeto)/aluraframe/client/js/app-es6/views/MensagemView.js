import { View } from './View';

export class MensagemView extends View {

    constructor(element){
        super(element)
    }
    
    template(model){
        return model.text ? `<p class="alert alert-info">${model.text}</p>` : '<p></p>';
    }

}