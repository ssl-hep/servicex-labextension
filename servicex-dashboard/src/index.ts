import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the servicex-dashboard extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'servicex-dashboard:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: activate
};

export default plugin;

function activate(app: JupyterFrontEnd, palette: ICommandPalette): void {
  console.log('JupyterLab extension servicex-dashboard is activated!');
  const content = new Widget();
  const widget = new MainAreaWidget({ content });
  widget.id = 'servicex-dashboard';
  widget.title.label = 'Basic Dashboard';
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  content.node.appendChild(table);

  let row_1 = document.createElement('tr');
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = "Title";
  let heading_2 = document.createElement('th');
  heading_2.innerHTML = "Start Time";
  let heading_3 = document.createElement('th');
  heading_3.innerHTML = "Finish Time";

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  thead.appendChild(row_1);
  
  const command = 'dashboard: open';
  app.commands.addCommand(command, {
    label: 'Basic Dashboard',
    execute: () => {
      if (!widget.isAttached) {
        app.shell.add(widget, 'left');
      }
      app.shell.activateById(widget.id);
    }
  });

  palette.addItem({ command, category: 'Dashboard' });
}
