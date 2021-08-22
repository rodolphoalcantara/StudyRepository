class Transferencia {
  final double valor;
  final int numConta;

  @override
  String toString() {
    return 'Transferencia{valor: $valor, numConta: $numConta}';
  }

  Transferencia(this.valor, this.numConta);
}
