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

async function activate(app: JupyterFrontEnd, palette: ICommandPalette) {
  console.log('JupyterLab extension servicex-dashboard is activated!');
  /*
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
  const data = await response.json();
  console.log(data);*/

  let arr = [
    {
      request_id: 'c5ae836c-5e76-451f-82b4-0a0f09a76f5a',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/c5ae836c-5e76-451f-82b4-0a0f09a76f5a',
      start_time: '2022-06-26 09:57:26',
      finish_time: '2022-06-26 09:58:08',
      files_completed: '1 of 1',
      needs_action: false,
      workers: ''
    },
    {
      request_id: '352b555b-33fc-4533-953f-34cc6390a3ae',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/352b555b-33fc-4533-953f-34cc6390a3ae',
      start_time: '2022-06-25 17:13:58',
      finish_time: '2022-06-25 17:14:35',
      files_completed: '1 of 1',
      needs_action: false,
      workers: ''
    },
    {
      request_id: 'd8f0e21f-7301-4bf8-b56e-13dbf391c7fd',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/d8f0e21f-7301-4bf8-b56e-13dbf391c7fd',
      start_time: '2022-06-25 17:13:58',
      finish_time: '2022-06-25 17:14:33',
      files_completed: '4 of 4',
      needs_action: false,
      workers: ''
    }
  ];
  
 
  /*
  const response = await fetch('https://opendataaf-servicex.servicex.coffea-opendata.casa/servicex/transformation');
  const data = await response.json();
  let arr = [];

  for(var i = data.requests.length - 1; i > data.requests.length - 4; i--){
      const obj = {
        request_id:  '',
        status: '',
        title_link: '',
        start_time: '',
        finish_time: '',
        files_completed: '',
        needs_action: false,
        workers: ''
      };

      let request_id = data.requests[i]['request_id'];
      obj['request_id'] = request_id;
      let status = data.requests[i]['status'];
      obj['status'] = status;
      obj['title_link'] = 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/' + request_id;

      const response1 = await fetch('https://opendataaf-servicex.servicex.coffea-opendata.casa/servicex/transformation/' + request_id + '/status');
      const data1 = await response1.json();

      let start_time = data1['submit-time'];
      start_time = start_time.replace("T", " ");
      start_time = start_time.slice(0,19);
      let finish_time = data1['finish-time'];
      finish_time = finish_time.replace("T", " ");
      finish_time = finish_time.slice(0, 19);
      obj['start_time'] = start_time;
      obj['finish_time'] = finish_time;

      let files_processed = data1["files-processed"];
      let files_remaining = data1["files-remaining"];
      let files_skipped = data1["files-skipped"];
      let files_done = files_skipped + files_processed;
      let total_files = files_done + files_remaining;
      let files_completed = files_done.toString() + ' of ' + total_files.toString();
      obj['files_completed'] = files_completed;

      let workers = data.requests[i]['workers'];
      if(status == 'Complete' || status == 'Canceled' || status == 'Fatal'){
          obj['needs_action'] = false;
          obj['workers'] = '';
      }else{
          obj['needs_action'] = true;
          obj['workers'] = workers;
      }

      arr.push(obj);
  }*/
  

  const content = new Widget();
  content.addClass('my-apodWidget');
  const widget = new MainAreaWidget({ content });
  widget.id = 'servicex-dashboard';
  widget.title.label = 'Basic Dashboard';
  widget.title.closable = true;
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let caption = document.createElement('caption');
  caption.innerHTML = "Transformation Requests";
  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(caption);
  /*
  let div = document.createElement('div');
  div.appendChild(table);
  content.node.appendChild(div);*/
  content.node.appendChild(table);


  let row_1 = document.createElement('tr');
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = "Title";
  let heading_2 = document.createElement('th');
  heading_2.innerHTML = "Start Time";
  let heading_3 = document.createElement('th');
  heading_3.innerHTML = "Finish Time";
  let heading_4 = document.createElement('th');
  heading_4.innerHTML = "Status";
  let heading_5 = document.createElement('th');
  heading_5.innerHTML = "Files Completed";
  let heading_6 = document.createElement('th');
  heading_6.innerHTML = "Workers";
  let heading_7 = document.createElement('th');
  heading_7.innerHTML = "Actions";

  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);
  row_1.appendChild(heading_6);
  row_1.appendChild(heading_7);
  thead.appendChild(row_1);

  let row_2 = document.createElement('tr');
  let data_1 = document.createElement('td');
  var link = document.createElement("a");
  link.setAttribute("href", arr[0].title_link);
  var linkText = document.createTextNode("Untitled");
  link.appendChild(linkText);
  data_1.appendChild(link);
  let data_2 = document.createElement('td');
  data_2.innerHTML = arr[0].start_time;
  let data_3 = document.createElement('td');
  data_3.innerHTML = arr[0].finish_time;
  let data_4 = document.createElement('td');
  data_4.innerHTML = arr[0].status;

  /*
  let progress_bar = document.createElement('progress');
  progress_bar.setAttribute("max", "100");
  progress_bar.setAttribute("value", "0");
  let id = setInterval(frame, 500);
  let i = 0;
  function frame() {
      if (i >= 100) {
        clearInterval(id);
      } else {
        i++; 
        progress_bar.value = i; 
      }
    data_4.appendChild(progress_bar);

  }*/
  

  let data_5 = document.createElement('td');
  data_5.innerHTML = arr[0].files_completed;
  let data_6 = document.createElement('td');
  data_6.innerHTML = arr[0].workers;
  let data_7 = document.createElement('td');
  if(arr[0].needs_action)
    data_7.innerHTML = "Cancel";
  
  /*  
  let btn = document.createElement('button');
  btn.innerHTML = 'Cancel';
  btn.type = 'button';
  data_7.append(btn);*/
  

  row_2.appendChild(data_1);
  row_2.appendChild(data_2);
  row_2.appendChild(data_3);
  row_2.appendChild(data_4);
  row_2.appendChild(data_5);
  row_2.appendChild(data_6);
  row_2.appendChild(data_7);
  tbody.appendChild(row_2);

  let row_3 = document.createElement('tr');
  let data_11 = document.createElement('td');
  var link1 = document.createElement("a");
  link1.setAttribute("href", arr[1].title_link);
  var linkText1 = document.createTextNode("Untitled");
  link1.appendChild(linkText1);
  data_11.appendChild(link1);
  let data_21 = document.createElement('td');
  data_21.innerHTML = arr[1].start_time;
  let data_31 = document.createElement('td');
  data_31.innerHTML = arr[1].finish_time;
  let data_41 = document.createElement('td');
  data_41.innerHTML = arr[1].status;
  let data_51 = document.createElement('td');
  data_51.innerHTML = arr[1].files_completed;
  let data_61 = document.createElement('td');
  data_61.innerHTML = arr[1].workers;
  let data_71 = document.createElement('td');
  if(arr[1].needs_action)
    data_71.innerHTML = "Cancel";

  row_3.appendChild(data_11);
  row_3.appendChild(data_21);
  row_3.appendChild(data_31);
  row_3.appendChild(data_41);
  row_3.appendChild(data_51);
  row_3.appendChild(data_61);
  row_3.appendChild(data_71);
  tbody.appendChild(row_3);

  let row_4 = document.createElement('tr');
  let data_12 = document.createElement('td');
  var link2 = document.createElement("a");
  link2.setAttribute("href", arr[2].title_link);
  var linkText2 = document.createTextNode("Untitled");
  link2.appendChild(linkText2);
  data_12.appendChild(link2);
  let data_22 = document.createElement('td');
  data_22.innerHTML = arr[2].start_time;
  let data_32 = document.createElement('td');
  data_32.innerHTML = arr[2].finish_time;
  let data_42 = document.createElement('td');
  data_42.innerHTML = arr[2].status;
  let data_52 = document.createElement('td');
  data_52.innerHTML = arr[2].files_completed;
  let data_62 = document.createElement('td');
  data_62.innerHTML = arr[2].workers;
  let data_72 = document.createElement('td');
  if(arr[2].needs_action)
    data_72.innerHTML = "Cancel";

  row_4.appendChild(data_12);
  row_4.appendChild(data_22);
  row_4.appendChild(data_32);
  row_4.appendChild(data_42);
  row_4.appendChild(data_52);
  row_4.appendChild(data_62);
  row_4.appendChild(data_72);
  tbody.appendChild(row_4);
  
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
