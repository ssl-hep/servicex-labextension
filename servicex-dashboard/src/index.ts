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
  let arr = [
    {
      request_id: '3f0bd291-d2b1-4b32-baea-255f1b8791dc',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/3f0bd291-d2b1-4b32-baea-255f1b8791dc',
      start_time: '2022-07-11 09:49:04',
      finish_time: '2022-07-11 09:56:27',
      files_completed: 443,
      total_files: 443,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'a77639bd-f1e7-418e-b705-716a0a1d1119',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/a77639bd-f1e7-418e-b705-716a0a1d1119',
      start_time: '2022-07-11 09:49:07',
      finish_time: '2022-07-11 09:50:38',
      files_completed: 50,
      total_files: 50,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'a0ceeeef-81e2-4f06-95e0-b78c9a58aabc',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/a0ceeeef-81e2-4f06-95e0-b78c9a58aabc',
      start_time: '2022-07-11 09:49:04',
      finish_time: '2022-07-11 10:01:40',
      files_completed: 902,
      total_files: 902,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '74ce44e7-aefb-47fd-b176-786086a9d0d2',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/74ce44e7-aefb-47fd-b176-786086a9d0d2',
      start_time: '2022-07-11 09:49:06',
      finish_time: '2022-07-11 12:28:10',
      files_completed: 9599,
      total_files: 10199,
      files_skipped: 600,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '6c842358-90e1-4650-a701-4adeef931f44',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/6c842358-90e1-4650-a701-4adeef931f44',
      start_time: '2022-07-11 09:49:04',
      finish_time: '2022-07-11 09:58:16',
      files_completed: 438,
      total_files: 438,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '93bb533d-6d20-4359-80bb-3f093432cbc4',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/93bb533d-6d20-4359-80bb-3f093432cbc4',
      start_time: '2022-07-01 11:38:20',
      finish_time: '2022-07-01 11:39:15',
      files_completed: 4,
      total_files: 4,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'e4c7a619-1109-4b67-8d2e-4aafb9f3b0d9',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/e4c7a619-1109-4b67-8d2e-4aafb9f3b0d9',
      start_time: '2022-07-11 09:49:06',
      finish_time: '2022-07-11 10:31:51',
      files_completed: 7066,
      total_files: 7066,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '01435723-dcbe-4e82-a650-6619a6a90164',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/01435723-dcbe-4e82-a650-6619a6a90164',
      start_time: '2022-06-30 16:31:19',
      finish_time: '2022-06-30 16:32:19',
      files_completed: 4,
      total_files: 4,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'c67f9d17-2531-410c-a1af-ed248244211a',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/c67f9d17-2531-410c-a1af-ed248244211a',
      start_time: '2022-07-01 11:38:20',
      finish_time: '2022-07-01 11:39:18',
      files_completed: 3,
      total_files: 3,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'd1cf08b9-5498-4027-85b2-f6e643125130',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/d1cf08b9-5498-4027-85b2-f6e643125130',
      start_time: '2022-06-30 16:31:19',
      finish_time: '2022-06-30 16:32:37',
      files_completed: 3,
      total_files: 3,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '74b6bb7a-677f-457c-8d51-d9645ab0ce85',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/74b6bb7a-677f-457c-8d51-d9645ab0ce85',
      start_time: '2022-06-30 16:31:19',
      finish_time: '2022-06-30 16:31:57',
      files_completed: 1,
      total_files: 1,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '9b7a9734-0dda-4f02-a8bb-581065e25ef2',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/9b7a9734-0dda-4f02-a8bb-581065e25ef2',
      start_time: '2022-07-01 11:38:20',
      finish_time: '2022-07-01 11:39:10',
      files_completed: 4,
      total_files: 4,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'dafb48c4-bd84-4212-a86a-70177698709e',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/dafb48c4-bd84-4212-a86a-70177698709e',
      start_time: '2022-06-30 16:31:19',
      finish_time: '2022-06-30 16:32:09',
      files_completed: 4,
      total_files: 4,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '4e3f6278-698e-4811-a7ae-17f76c78fad5',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/4e3f6278-698e-4811-a7ae-17f76c78fad5',
      start_time: '2022-06-30 16:28:45',
      finish_time: '2022-06-30 16:29:07',
      files_completed: 10,
      total_files: 10,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'c5ae836c-5e76-451f-82b4-0a0f09a76f5a',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/c5ae836c-5e76-451f-82b4-0a0f09a76f5a',
      start_time: '2022-06-26 09:57:26',
      finish_time: '2022-06-26 09:58:08',
      files_completed: 1,
      total_files: 1,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    }
  ];
  /*
  const response = await fetch('https://opendataaf-servicex.servicex.coffea-opendata.casa/servicex/transformation');
  const data = await response.json();
  let arr = [];

  for(let i = data.requests.length - 1; i > data.requests.length - 16; i--){
      const obj = {
        request_id: '',
        status: '',
        title_link: '',
        start_time: '',
        finish_time: '',
        files_completed: 0,
        total_files: 0,
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
      if(finish_time != null){
          finish_time = finish_time.replace("T", " ");
          finish_time = finish_time.slice(0, 19);
      }else{
          finish_time = '-';
      }
      obj['start_time'] = start_time;
      obj['finish_time'] = finish_time;

      let files_processed = data1["files-processed"];
      let files_remaining = data1["files-remaining"];
      let files_skipped = data1["files-skipped"];
      let total_files;
      if (files_remaining == null) {
          total_files = null;
      }else{
          total_files = files_processed + files_skipped + files_remaining;
      }
      obj['files_completed'] = files_processed;
      obj['total_files'] = total_files;
      obj['files_skipped'] = files_skipped; 

      let workers = data.requests[i]['workers'];
      if(status == 'Complete' || status == 'Canceled' || status == 'Fatal'){
          obj['needs_action'] = false;
          obj['workers'] = '-';
      }else{
          obj['needs_action'] = true;
          obj['workers'] = workers.toString();
      }

      arr.push(obj);
  }*/
  const content = new Widget();
  content.addClass('my-apodWidget');
  const widget = new MainAreaWidget({ content });
  widget.id = 'servicex-dashboard';
  widget.title.label = 'ServiceX Dashboard';
  widget.title.closable = true;
  
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let caption = document.createElement('caption');
  caption.innerHTML = "Transformation Requests";
  table.appendChild(thead);
  table.appendChild(tbody);
  table.appendChild(caption);
  content.node.appendChild(table);

  for(let i = -1; i < arr.length; i++){
    let row = document.createElement('tr');
    let elem_1, elem_2, elem_3, elem_4, elem_5, elem_6, elem_7;
    if(i == -1){
      elem_1 = document.createElement('th');
      elem_1.innerHTML = "Title";
      row.appendChild(elem_1);
      elem_2 = document.createElement('th');
      elem_2.innerHTML = "Start Time";
      row.appendChild(elem_2);
      elem_3 = document.createElement('th');
      elem_3.innerHTML = "Finish Time";
      row.appendChild(elem_3);
      elem_4 = document.createElement('th');
      elem_4.innerHTML = "Status";
      row.appendChild(elem_4);
      elem_5 = document.createElement('th');
      elem_5.innerHTML = "Files Completed";
      row.appendChild(elem_5);
      elem_6 = document.createElement('th');
      elem_6.innerHTML = "Workers";
      row.appendChild(elem_6);
      elem_7 = document.createElement('th');
      elem_7.innerHTML = "Actions";
      row.appendChild(elem_7);
      thead.appendChild(row);
    }else{
      elem_1 = document.createElement('td');
      let link = document.createElement('a');
      link.setAttribute("href", arr[i].title_link);
      let linkText = document.createTextNode("Untitled");
      link.appendChild(linkText);
      elem_1.appendChild(link);
      row.appendChild(elem_1);
      elem_2 = document.createElement('td');
      elem_2.innerHTML = arr[i].start_time;
      row.appendChild(elem_2);
      elem_3 = document.createElement('td');
      elem_3.innerHTML = arr[i].finish_time;
      row.appendChild(elem_3);
      elem_4 = document.createElement('td');
      elem_4.innerHTML = arr[i].status;
      if(arr[i].status == 'Submitted' || arr[i].status == 'Running'){
        let total_files = arr[i].total_files;
        let completed_files = arr[i].files_completed;
        if(total_files != null){
          let progress_bar = document.createElement('progress');
          progress_bar.setAttribute("max", "100");
          let percentage = (completed_files/total_files) * 100;
          progress_bar.setAttribute("value", percentage.toString());
          elem_4.appendChild(progress_bar);
        } 
      }
      row.appendChild(elem_4);
      elem_5 = document.createElement('td');
      let link_1 = document.createElement('a');
      link_1.style.fontWeight = 'normal';
      link_1.setAttribute("href", 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/' + arr[i].request_id + '/results?status=success');
      let linkText1 = document.createTextNode(arr[i].files_completed.toString());
      link_1.appendChild(linkText1);
      elem_5.appendChild(link_1);
      let text = document.createTextNode(' of ' + arr[i].total_files.toString());
      elem_5.appendChild(text);
      if(arr[i].files_skipped != 0){
        let text_1 = document.createTextNode('\n  (');
        elem_5.appendChild(text_1);
        let link_2 = document.createElement('a');
        link_2.style.fontWeight = 'normal';
        link_2.setAttribute("href", 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/' + arr[i].request_id + '/results?status=failure');
        let linkText2 = document.createTextNode(arr[i].files_skipped.toString());
        link_2.appendChild(linkText2);
        elem_5.appendChild(link_2);
        let text_2 = document.createTextNode(' failed)');
        elem_5.appendChild(text_2);
      }
      row.appendChild(elem_5);
      elem_6 = document.createElement('td');
      elem_6.innerHTML = arr[i].workers;
      row.appendChild(elem_6);
      elem_7 = document.createElement('td');
      if(arr[i].needs_action){
        let btn = document.createElement('button');
        btn.innerHTML = 'Cancel';
        btn.type = 'button';
        elem_7.append(btn);
      }
      row.appendChild(elem_7);
      tbody.append(row);
    }
  }

  const command = 'dashboard: open';
  app.commands.addCommand(command, {
    label: 'ServiceX Dashboard',
    execute: () => {
      if (!widget.isAttached) {
        app.shell.add(widget, 'left');
      }
      app.shell.activateById(widget.id);
    }
  });

  palette.addItem({ command, category: 'Dashboard' });
}
