class NegociacoesView extends View{
    
    constructor(element){
        super(element)
    }

    template(model){

        return `
        <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th onclick="negociacaoController.sortList('data')">DATA</th>
                <th onclick="negociacaoController.sortList('quantidade')">QUANTIDADE</th>
                <th onclick="negociacaoController.sortList('valor')">VALOR</th>
                <th onclick="negociacaoController.sortList('volume')">VOLUME</th>
            </tr>
        </thead>
        
        <tbody>
            ${model.negociacoes.map(neg => `
                <tr>
                    <td>${DateHelper.stringfyDate(neg.data)}</td>
                    <td>${neg.quantidade}</td>
                    <td>${neg.valor}</td>
                    <td>${neg.volume}</td>
                </tr>
            `).join('')}
        </tbody>
        <tfoot>
            <td colspan="3"></td>
            <td>${model.volumeTotal}</td>
        </tfoot>
    </table>        
        `;
    }
}


