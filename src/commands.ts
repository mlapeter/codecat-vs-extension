import { Range, window, SnippetString } from "vscode";
import * as vscode from 'vscode';
import * as api from './api';
import { Console } from "console";
const editor = vscode.window.activeTextEditor;




async function addDocString(context: vscode.ExtensionContext) {
  if (!editor) {
    return; // No open text editor
}

  const text = editor.document.getText(editor.selection);

  const fileName = editor.document.fileName;
  

  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Generating ...',
      cancellable: false,
    },
    async (progress) => {
     for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        progress.report({ increment: i*10, message: "Generating" });
      }, 100000);
    }
   }
  );


  let url = "/api/v1/completions";
  let fastapiEndpoint = "docstring-generator";

  console.log("STARTING POST");

  const res = await api.postCompletion({url: url, textInput: "", codeInput: text, fastapiEndpoint: fastapiEndpoint, user: "",  machineId: vscode.env.machineId, fileName: fileName});

  console.log("RESPONSE:");
  console.log(res);
  const json = await res.json();


  
  let selection = editor.selection;
  let start = selection.start;
  let insertionLocation = new Range(start.line, start.character, start.line, start.character);
  let snippet = new SnippetString(json + "");
  editor.insertSnippet(snippet, insertionLocation);


}

export { addDocString };
