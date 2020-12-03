class NegociacoesView extends View{
    
    constructor(element){
        super(element)
    }

    template(model){

        return `
        <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
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
            <td>${model.negociacoes.reduce((total, n) => total += n.volume, 0.0)}</td>
        </tfoot>
    </table>        
        `;
    }
}


