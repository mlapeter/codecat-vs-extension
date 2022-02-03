import { Range, window, SnippetString } from "vscode";
import * as vscode from 'vscode';
import * as api from './api';



async function getData( ) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return; // No open text editor
  } 

  const text = editor.document.getText(editor.selection);
  const fileName = editor.document.fileName;
  const url = "/api/v1/completions";

  return {editor: editor, text: text, fileName: fileName, url: url};  
}

async function addDocString(context: vscode.ExtensionContext) {
  
  const data = await getData();
  const { editor, text, fileName, url } = { ...data };

  if (!editor) {
    return; // No open text editor
  } 


  const fastapiEndpoint = "docstring-generator";
  const extension = fileName ? fileName.split('.').pop() : "js";

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


async function generateSql(context: vscode.ExtensionContext) {
  generateSqlMain("js");
}

async function generateActiveRecordQuery(context: vscode.ExtensionContext) {
  generateSqlMain("rb");
}


async function generateSqlMain(extension: string) {
  const data = await getData();
  const { editor, text, fileName, url } = { ...data };
  const fastapiEndpoint = "sql-query-generator";
  // const extension = fileName.split('.').pop();
  let sql = null;
  let schema = "";
  let schemaCheck = "No";

  if (!editor) {
    return; // No open text editor
  } 

  // check if the workspace has a file named "schema.rb"
  const schemaFile = await vscode.workspace.findFiles('**/schema.rb');

  if (schemaFile.length > 0) {
    schemaCheck = await vscode.window.showInformationMessage(
      "Can we check your schema.rb to generate a better query?",
      { modal: true },
      "Yes",
      "No"
    ) || "No";
  }

  if (schemaCheck === "Yes" && schemaFile.length > 0) {
    const schemaFilePath = schemaFile[0].fsPath;
    const schemaFileContent = await vscode.workspace.openTextDocument(schemaFilePath);
    schema = schemaFileContent.getText();

    schema = schema.replace(/^\s*#.*$/gm, '');
    schema = schema.replace(/^\s*\n/gm, '');
  }

  try {
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

    const res = await api.postCompletion({url: url, textInput: text, codeInput: schema, fastapiEndpoint: fastapiEndpoint, user: "",  machineId: vscode.env.machineId, extension: extension});
    sql = await res.json();
  } catch (err) {
    vscode.window.showErrorMessage('Error, please [let us know](https://discord.gg/PR2N3KesyV)');
  }

  if (sql === null) {
    return;
  }

  sql = sql.split('=>')[0];
  sql = sql.replace('=>', '');

  let selection = editor.selection;
  let start = selection.start;
  let insertionLocation = new Range(start.line, start.character, start.line, start.character);

  let snippet = new SnippetString(sql + "\n");
  editor.insertSnippet(snippet, insertionLocation);
}


export { addDocString };
export { generateSql };
export { generateActiveRecordQuery };
