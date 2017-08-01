import { Component } from '@angular/core';
const { remote } = window.require('electron');
const { BrowserWindow } = remote;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass']
})

export class ToolbarComponent {
  minimize() {
    BrowserWindow.getFocusedWindow().minimize();
  }

  maximize() {
    if (BrowserWindow.getFocusedWindow().isMaximized()) {
      BrowserWindow.getFocusedWindow().restore();
    } else {
      BrowserWindow.getFocusedWindow().maximize();
    }
  }

  close() {
    BrowserWindow.getFocusedWindow().close();
  }
}
