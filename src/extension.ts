
import * as vscode from 'vscode';
import { Menu } from './menu';

import MyCodeLensProvider from "./myCodeLensProvider";
import { addDocString } from "./commands";


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  vscode.window.createTreeView('codecat', {
    treeDataProvider: new Menu()
  });
  
	// This line of code will only be executed once when your extension is activated
	console.log('CodeCat.AI online!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	let disposable = vscode.commands.registerCommand('codecat.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		vscode.window.showInformationMessage('Hello VS Code from CodeCat!');
	});

  // Register the command
  let addDocStringDisposable = vscode.commands.registerCommand(
    'codecat.addDocString',
    addDocString
  );

  // Get a document selector for the CodeLens provider
  // This one is any file that has the language of javascript
  let docSelector = {
    language: "javascript",
    scheme: "file"
  };

  // Register our CodeLens provider
  // let codeLensProviderDisposable = vscode.languages.registerCodeLensProvider(
  //   docSelector,
  //   new MyCodeLensProvider()
  // );

  
  

	context.subscriptions.push(disposable);
  context.subscriptions.push(addDocStringDisposable );

  // Push the command and CodeLens provider to the context so it can be disposed of later
  // context.subscriptions.push(codeLensProviderDisposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}

