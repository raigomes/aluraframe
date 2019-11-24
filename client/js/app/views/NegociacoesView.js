class NegociacoesView extends View {
  template(model) {
    return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th onclick="negociacaoController.ordena('data')">
                  <span class="glyphicon glyphicon-sort" aria-hidden="true"></span>
                  DATA
                </th>
                <th onclick="negociacaoController.ordena('quantidade')">
                  <span class="glyphicon glyphicon-sort" aria-hidden="true"></span>
                  QUANTIDADE
                </th>
                <th onclick="negociacaoController.ordena('valor')">
                  <span class="glyphicon glyphicon-sort" aria-hidden="true"></span>
                  VALOR
                </th>
                <th onclick="negociacaoController.ordena('volume')">
                  <span class="glyphicon glyphicon-sort" aria-hidden="true"></span>
                  VOLUME
                </th>
            </tr>
        </thead>
        <tbody>
          ${model.negociacoes.map(elemento => `
            <tr>
                <td>${DateHelper.dataParaTexto(elemento.data)}</td>
                <td>${elemento.quantidade}</td>
                <td>${elemento.valor}</td>
                <td>${elemento.volume}</td>
            </tr>
          `
          ).join("")}
          <tr>
            <td colspan="3"></td>
            <td>${model.volumeTotal}</td>
          </tr>
        </tbody>
        <tfoot></tfoot>
    </table>
    `
  }
}