// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { Menu } from './menu';

// import { commands, ExtensionContext, languages } from "vscode";
import MyCodeLensProvider from "./myCodeLensProvider";
import { addDocString } from "./commands";
// import { addDocString } from "./addDocString";


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  vscode.window.createTreeView('codecat', {
    treeDataProvider: new Menu()
  });
  
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codecat" is now active!');

  // // display button for user to sign in
  // const signInButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
  // signInButton.text = "Sign in";
  // signInButton.command = "extension.signIn";
  // signInButton.show();


  // // open a browser window to sign in and then return the access token
  // const signIn = async () => {
  //   // const browser = await vscode.env.openExternal(vscode.Uri.parse("http://localhost:5000/"));
  //   signInButton.dispose();
  // };

  // vscode.commands.registerCommand('codecat.signIn', () => {
  //   signIn().then(token => {
  //     console.log("TOKEN:");
  //     console.log(token);
  //   });
  // });



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codecat.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code from CodeCat!');
	});

  // Register the command
  let addDocStringDisposable = vscode.commands.registerCommand(
    'codecat.addDocString',
    addDocString
  );

  // let addDocStringDisposable = vscode.commands.registerCommand('codecat.addDocString', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('addDocStringDisposable');
	// });

  // Get a document selector for the CodeLens provider
  // This one is any file that has the language of javascript
  let docSelector = {
    language: "javascript",
    scheme: "file"
  };

  // Register our CodeLens provider
  let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
    docSelector,
    new MyCodeLensProvider()
  );

  
  

	context.subscriptions.push(disposable);

  context.subscriptions.push(addDocStringDisposable );


  // Push the command and CodeLens provider to the context so it can be disposed of later
  context.subscriptions.push(codeLensProviderDisposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}
  function acquireVsCodeApi() {
    throw new Error('Function not implemented.');
  }

