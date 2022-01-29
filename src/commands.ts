import { Range, window, SnippetString } from "vscode";
import * as vscode from 'vscode';
import * as api from './api';
import { Console } from "console";
const editor = vscode.window.activeTextEditor;




async function addDocString(context: vscode.ExtensionContext) {
  if (!editor) {
    return; // No open text editor
}

  // const loadingMessage = vscode.window.showInformationMessage('Generating...');

  // hide the loading message


  const text = editor.document.getText(editor.selection);

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
      }, 5000);
    }
   }
  )


  let url = "http://localhost:5000/api/v1/completions";
  let fastapiEndpoint = "docstring-generator";

 
  console.log("STARTING POST");
  console.log(vscode.env.machineId);

  const res = await api.postCompletion({url: url, textInput: "", codeInput: text, fastapiEndpoint: fastapiEndpoint, user: "Tfptsoj5ftjDh7W4UCSH5npH", machineId: vscode.env.machineId});

  console.log("RESPONSE:");
  console.log(res);
  const json = await res.json();
  console.log("AI Output:");
  console.log(json);

  // // display an input box
  // let inputBox = await window.showInputBox({
  //   prompt: "Free limit reached, please enter your API Key:",
  //   value: "visit https://www.codecat.ai/",
  //   });

  //   console.log("RESULT:");
  //   console.log(inputBox);


  
  
  let selection = editor.selection;
  let start = selection.start;
  let insertionLocation = new Range(start.line, start.character, start.line, start.character);
  let snippet = new SnippetString(json + "");
  editor.insertSnippet(snippet, insertionLocation);


}


export { addDocString };



// export const removeSpace = (content: string): string => {
//   return content.replace(/\n\s*/gm, ' ');
// };