
import * as vscode from 'vscode';
import { Menu } from './menu';
import { addDocString } from "./commands";
import { generateSql } from "./commands";
import { generateActiveRecordQuery } from "./commands";



export function activate(context: vscode.ExtensionContext) {
  
  vscode.window.createTreeView('codecat', {
    treeDataProvider: new Menu()
  });

  let addDocStringDisposable = vscode.commands.registerCommand(
    'codecat.addDocString',
    addDocString
  );

  let generateSqlDisposable = vscode.commands.registerCommand(
    'codecat.generateSql',
    generateSql
  );

  let generateActiveRecordQueryDisposable = vscode.commands.registerCommand(
    'codecat.generateActiveRecordQuery',
    generateActiveRecordQuery
  );

  context.subscriptions.push(addDocStringDisposable );
  context.subscriptions.push(generateSqlDisposable );
  context.subscriptions.push(generateActiveRecordQueryDisposable );

}

export function deactivate() {}

