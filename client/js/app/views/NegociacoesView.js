class NegociacoesView extends View {
  template(model) {
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
          ${model.negociacoes.map(elemento => `
            <tr>
                <td>${DateHelper.dataParaTexto(elemento.data)}</td>
                <td>${elemento.quantidade}</td>
                <td>${elemento.valor}</td>
                <td>${elemento.volume}</td>
            </tr>
          `
          )}
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