// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// import { commands, ExtensionContext, languages } from "vscode";
import MyCodeLensProvider from "./myCodeLensProvider";
import { addConsoleLog, addDocString } from "./commands";
// import { addDocString } from "./addDocString";


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "codecat" is now active!');

  // display button for user to sign in
  const signInButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
  signInButton.text = "Sign in";
  signInButton.command = "extension.signIn";
  signInButton.show();


  // open a browser window to sign in and then return the access token
  const signIn = async () => {
    // const vscodeApi = acquireVsCodeApi();
    // console.log("vscodeApi:" + vscodeApi);

    // const browser = await vscode.env.openExternal(vscode.Uri.parse("http://localhost:5000/"));

    console.log("URI:" + vscode.env.uriScheme);

    const httpConfig = vscode.workspace.getConfiguration('http');
    console.log("httpConfig:");
    console.log(httpConfig)

    // vscode.window.registerUriHandler({
    //   handleUri(uri:vscode.Uri) {
    //       // do something with the URI
    //       console.log("URI:");
    //       console.log(uri);
    //       // return true to indicate you handled the URI
    //       return true;
    //   }
    // });
     



   
    // const token = await new Promise((resolve, reject) => {
    //   browser.webview.onDidReceiveMessage((message: { type: string; token: unknown; }) => {
    //     console.log("MESSAGE RECEIVED:");
    //     console.log(message);
    //     if (message.type === "token") {
    //       resolve(message.token);
    //     }
    //   });
    // });
    signInButton.dispose();
    // return token;
  };

  


  // register a UriHandler for the "codecat" scheme
  // const codecatHandler = vscode.UriHandler.register(async (uri: vscode.Uri) => {
  //   console.log("URI:");
  //   console.log(uri);
    // const token = await signIn();
    // console.log("TOKEN:");
    // console.log(token);
    // const browser = await vscode.env.openExternal(vscode.Uri.parse(`http://localhost:5000/codecat?token=${token}`));
  //   const vscodeApi = acquireVsCodeApi();
  //   console.log("vscodeApi:" + vscodeApi);

  // });

    // const token = await new Promise((resolve, reject) => {
    //   browser.webview.onDidReceiveMessage((message: { type: string; token: unknown; }) => {
    //     console.log("MESSAGE RECEIVED:");
    //     console.log(message);
    //     if (message.type === "token") {
    //       resolve(message.token);
    //     }
    //   });
    // });


  
  vscode.commands.registerCommand('extension.signIn', () => {
    signIn().then(token => {
      console.log("TOKEN:");
      console.log(token);
    });
  });




	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('codecat.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello VS Code from CodeCat!');
	});

  // Register the command
  let commandDisposable = vscode.commands.registerCommand(
    'extension.addConsoleLog',
    addConsoleLog
  );

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
  context.subscriptions.push(commandDisposable);  
  context.subscriptions.push(codeLensProviderDisposable);

}

// this method is called when your extension is deactivated
export function deactivate() {}
  function acquireVsCodeApi() {
    throw new Error('Function not implemented.');
  }

