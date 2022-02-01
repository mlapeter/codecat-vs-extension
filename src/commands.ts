import { Range, window, SnippetString } from "vscode";
import * as vscode from 'vscode';
import * as api from './api';

async function addDocString(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

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


  const url = "/api/v1/completions";
  const fastapiEndpoint = "docstring-generator";
  const extension = fileName.split('.').pop();

  let docString = null;

  try {
    const res = await api.postCompletion({url: url, textInput: "", codeInput: text, fastapiEndpoint: fastapiEndpoint, user: "",  machineId: vscode.env.machineId, extension: extension});
    docString = await res.json();
  } catch (err) {
    vscode.window.showErrorMessage('Error, please [let us know](https://discord.gg/PR2N3KesyV)');
  }

  if (docString === null) {
    return;
  }

  docString = docString.replace(/^\s*\n/gm, '');
  docString = docString.replace(/\n\s*$/gm, '');
  
  let selection = editor.selection;
  let start = selection.start;
  let insertionLocation = new Range(start.line, start.character, start.line, start.character);

  if (extension === "py" || extension === "py3") {
    insertionLocation = new Range(start.line + 1, 0, start.line + 1, 0);
  }

  let snippet = new SnippetString(docString + "\n");
  editor.insertSnippet(snippet, insertionLocation);
}

export { addDocString };
