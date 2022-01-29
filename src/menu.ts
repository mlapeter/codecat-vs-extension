import * as vscode from 'vscode';

export class Menu implements vscode.TreeDataProvider<any> {
 
  constructor() {}
  

  getTreeItem(element: any): vscode.TreeItem {
    return element;
  }

  getChildren(): any {
    return null;
  }
}
