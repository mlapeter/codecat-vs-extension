
import * as vscode from 'vscode';
import { Menu } from './menu';
import { addDocString } from "./commands";

export function activate(context: vscode.ExtensionContext) {
  
  vscode.window.createTreeView('codecat', {
    treeDataProvider: new Menu()
  });

  let addDocStringDisposable = vscode.commands.registerCommand(
    'codecat.addDocString',
    addDocString
  );

  context.subscriptions.push(addDocStringDisposable );
}

export function deactivate() {}

