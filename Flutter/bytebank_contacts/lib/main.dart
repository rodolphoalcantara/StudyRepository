import 'package:bytebank_contacts/http/webclient.dart';
import 'package:bytebank_contacts/screens/dashboard.dart';
import 'package:flutter/material.dart';

import 'models/contact.dart';
import 'models/transaction.dart';

void main() {
  runApp(BytebankApp());
}

class BytebankApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        primaryColor: Colors.green[900],
        accentColor: Colors.blueAccent[700],
        buttonTheme: ButtonThemeData(
          buttonColor: Colors.blueAccent[700],
          textTheme: ButtonTextTheme.primary,
        ),
      ),
      title: 'Bytebank',
      home: Dashboard(),
    );
  }
}


