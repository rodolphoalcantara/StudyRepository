import 'package:bytebank/components/editor.dart';
import 'package:bytebank/models/transferencia.dart';
import 'package:flutter/material.dart';

const _appBarTitle = "Criando Transferência";
const _rotuloValor = 'Valor';
const _dicaValor = '0.00';
const _rotuloNumConta = 'Número da Conta';
const _dicaNumCOnta = '0000';
const _txtBtnConfirmar = 'Confirmar';

class FormularioTransferencia extends StatefulWidget {
  @override
  _FormularioTransferenciaState createState() =>
      _FormularioTransferenciaState();
}

class _FormularioTransferenciaState extends State<FormularioTransferencia> {
  final TextEditingController _controllerNumConta = TextEditingController();
  final TextEditingController _controllerValor = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_appBarTitle),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Editor(
              controller: _controllerNumConta,
              rotulo: _rotuloNumConta,
              dica: _dicaNumCOnta,
            ),
            Editor(
              controller: _controllerValor,
              rotulo: _rotuloValor,
              dica: _dicaValor,
              icone: Icons.monetization_on,
            ),
            ElevatedButton(
              onPressed: () => _criaTransferencia(context),
              child: Text(_txtBtnConfirmar),
            ),
          ],
        ),
      ),
    );
  }

  void _criaTransferencia(BuildContext context) {
    final int? numConta = int.tryParse(_controllerNumConta.text);
    final double? valor = double.tryParse(_controllerValor.text);

    if (valor != null && numConta != null) {
      final transfCriada = Transferencia(valor, numConta);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("$transfCriada"),
        ),
      );
      Navigator.pop(context, transfCriada);
    }
  }
}
