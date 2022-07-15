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

async function activate(app: JupyterFrontEnd, palette: ICommandPalette) { //Activate function for plugin
  console.log('JupyterLab extension servicex-dashboard is activated!');

  let arr = [   //Array being used for data while wating on CORS issue to be fixed
    {
      request_id: 'fb9e2120-d86c-4ab0-a9f4-de3d56adedcc',
      status: 'Canceled',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/fb9e2120-d86c-4ab0-a9f4-de3d56adedcc',
      start_time: '2022-04-18 10:30:41',
      finish_time: '2022-07-14 15:04:19',
      files_completed: 0,
      total_files: null,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '829aa02d-f162-4971-ae2a-11a4321616ec',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/829aa02d-f162-4971-ae2a-11a4321616ec',
      start_time: '2022-07-13 09:25:53',
      finish_time: '2022-07-13 09:28:57',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'a7278a25-7214-4e8f-8d67-781cca58db8d',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/a7278a25-7214-4e8f-8d67-781cca58db8d',
      start_time: '2022-07-13 09:25:53',
      finish_time: '2022-07-13 09:29:08',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'f6b58f98-4921-4bc6-b612-a5a454a6ec3d',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/f6b58f98-4921-4bc6-b612-a5a454a6ec3d',
      start_time: '2022-07-13 09:25:53',
      finish_time: '2022-07-13 09:29:08',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '709df92c-cb39-4dbd-9a7c-117456d28e62',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/709df92c-cb39-4dbd-9a7c-117456d28e62',
      start_time: '2022-07-13 09:25:53',
      finish_time: '2022-07-13 09:29:09',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'd14ac4e1-3bd7-4c47-9afb-aeb11024227b',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/d14ac4e1-3bd7-4c47-9afb-aeb11024227b',
      start_time: '2022-07-13 09:25:53',
      finish_time: '2022-07-13 09:28:52',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '1163c6ce-dd9e-49d1-a99a-05335b5ee539',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/1163c6ce-dd9e-49d1-a99a-05335b5ee539',
      start_time: '2022-07-13 09:25:53',
      finish_time: '2022-07-13 09:29:40',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '89c57639-6b4b-469d-b0e7-31f35c3982cd',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/89c57639-6b4b-469d-b0e7-31f35c3982cd',
      start_time: '2022-07-13 09:25:53',
      finish_time: '2022-07-13 09:28:51',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '6affcc02-2b45-476f-a7ba-0fc80464ecb2',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/6affcc02-2b45-476f-a7ba-0fc80464ecb2',
      start_time: '2022-07-13 09:25:53',
      finish_time: '2022-07-13 09:28:42',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
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
    }
  ];

  async function createTable(){ //Function that creates instance of dashboard
    /* 1st part of code in testing polling
    const response = await fetch('./files/src/transformation.json');
    const data = await response.json();

    let arr = [];
    for(let i = 0; i < 16; i++){
      const obj = {
        request_id: '',
        status: '',
        workers: 0
      }
      obj.request_id = data.requests[i].request_id;
      obj.status = data.requests[i].status;
      obj.workers = data.requests[i].workers;

      arr.push(obj);
    }*/

    /*
    if(content.node.hasChildNodes()){   //Checking if there is already an exisiting table
      content.node.innerHTML = '';   //If it exists, it is removed
    }*/

    let table = document.createElement('table');  //Creating table and various table elements
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let div = document.createElement('div');
    let h4 = document.createElement('h4');
    h4.textContent = 'Transformation Requests';
    div.appendChild(h4);

    div.style.backgroundColor = 'white';
    div.style.padding = '7.5px 15px';
    div.style.margin = '0px';
    div.style.width = '700px'

    //let caption = document.createElement('caption');
    //caption.innerHTML = "Transformation Requests";
    //let footer = document.createElement('footer');
    //footer.innerHTML = "All times in UTC.";
    table.appendChild(thead);
    table.appendChild(tbody);
    //table.appendChild(caption);
    //table.appendChild(footer);

    div.appendChild(table);
    content.node.appendChild(div); //Appends newly created table to widget

    /* 2nd part of code in testing polling
    for(let i = -1; i < 15; i++){
      let row = document.createElement('tr');
      let elem_1, elem_2, elem_3;
      if(i == -1){
        elem_1 = document.createElement('th');
        elem_1.innerHTML = "Request ID";
        row.appendChild(elem_1);
        elem_2 = document.createElement('th');
        elem_2.innerHTML = "Status";
        row.appendChild(elem_2);
        elem_3 = document.createElement('th');
        elem_3.innerHTML = "Workers";
        row.appendChild(elem_3);
        thead.appendChild(row);
      }else{
        elem_1 = document.createElement('td');
        elem_1.innerHTML = arr[i].request_id;
        row.appendChild(elem_1);
        elem_2 = document.createElement('td');
        elem_2.innerHTML = arr[i].status;
        row.appendChild(elem_2);
        elem_3 = document.createElement('td');
        elem_3.innerHTML = arr[i].workers.toString();
        row.appendChild(elem_3);
        tbody.appendChild(row);
      }

    }*/
    
    for(let i = -1; i < 15; i++){    //for loop for creating table
      let row = document.createElement('tr');
      let elem_1, elem_2, elem_3, elem_4, elem_5, elem_6, elem_7;
      if(i == -1){  //For header of table (creating elements and attaching them)
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
      }else{  //For the data section of the table (creating elements and attaching them)
        elem_1 = document.createElement('td');
        let link = document.createElement('a'); //Creating link to transform request page
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
        if(arr[i].status == 'Submitted' || arr[i].status == 'Running'){ //If status is 'submitted' or 'running', progres bar is displayed
          let total_files = arr[i].total_files;
          let completed_files = arr[i].files_completed;
          if(total_files != null){ //Null check to make sure code doesn't break
            let progress_bar = document.createElement('progress');
            progress_bar.setAttribute("max", "100");
            let percentage = (completed_files/total_files) * 100;
            progress_bar.setAttribute("value", percentage.toString());
            elem_4.appendChild(progress_bar);
          } 
        }
        row.appendChild(elem_4);
        elem_5 = document.createElement('td');
        let link_1 = document.createElement('a'); //Adding link to log of successful files
        link_1.style.fontWeight = 'normal';
        link_1.setAttribute("href", 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/' + arr[i].request_id + '/results?status=success');
        let linkText1 = document.createTextNode(arr[i].files_completed.toString());
        link_1.appendChild(linkText1);
        elem_5.appendChild(link_1);
        let text;
        if(arr[i].total_files !=  null){ //Null check to make sure code doesn't break
          text = document.createTextNode(' of ' + arr[i].total_files);
        }else{
          text = document.createTextNode(' of Unknown');
        }
        elem_5.appendChild(text);
        if(arr[i].files_skipped != 0){  //Adding link to log of failed files (if there are skipped files)
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
        if(arr[i].needs_action){ //If status is 'submitted' or 'running', button is displayed to cancel the request (Work In Progress)
          let btn = document.createElement('button');
          btn.innerHTML = 'Cancel';
          btn.type = 'button';
          elem_7.append(btn);
        }
        row.appendChild(elem_7);
        tbody.append(row);
      }
    }
      

    //setTimeout(createTable, 5000); //Call for polling inside createTable()
 
    /* Code for retrieving live json result (Not operational while CORS issue still exists)
    const response = await fetch('https://opendataaf-servicex.servicex.coffea-opendata.casa/servicex/transformation');
    const data = await response.json();
    let arr = [];

    for(let i = data.requests.length - 1; i > -1; i--){
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

  }

  const content = new Widget(); //Creating widget and adding scrolling capabilites to it
  content.addClass('my-apodWidget');
  const widget = new MainAreaWidget({ content });
  widget.id = 'servicex-dashboard';
  widget.title.label = 'ServiceX Dashboard';
  widget.title.closable = true;

  //setTimeout(createTable, 5000); //Calling of setTimeout to start polling loop. 
  createTable();

  const command = 'dashboard: open'; //Command for opening dashboard through Command Line
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
