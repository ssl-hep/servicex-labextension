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

  let arr = [ //Temporary Data Array while wating for CORS fix to be approved
    {
      request_id: '1163c6ce-dd9e-49d1-a99a-05335b5ee539',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/1163c6ce-dd9e-49d1-a99a-05335b5ee539',
      start_time: '2022-07-13 09:25:53',
      start_time_seconds: 1657722353,
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
      start_time_seconds: 1657722353,
      finish_time: '2022-07-13 09:28:51',
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
      start_time_seconds: 1657722353,
      finish_time: '2022-07-13 09:28:52',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '4701180a-b0ff-4af9-a9b5-a8397be7d222',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/4701180a-b0ff-4af9-a9b5-a8397be7d222',
      start_time: '2022-07-13 09:25:53',
      start_time_seconds: 1657722353,
      finish_time: '2022-07-13 09:28:41',
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
      start_time_seconds: 1657722353,
      finish_time: '2022-07-13 09:28:42',
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
      start_time_seconds: 1657722353,
      finish_time: '2022-07-13 09:29:08',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '829aa02d-f162-4971-ae2a-11a4321616ec',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/829aa02d-f162-4971-ae2a-11a4321616ec',
      start_time: '2022-07-13 09:25:53',
      start_time_seconds: 1657722353,
      finish_time: '2022-07-13 09:28:57',
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
      start_time_seconds: 1657722353,
      finish_time: '2022-07-13 09:29:09',
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
      start_time_seconds: 1657722353,
      finish_time: '2022-07-13 09:29:08',
      files_completed: 0,
      total_files: 10,
      files_skipped: 10,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'a77639bd-f1e7-418e-b705-716a0a1d1119',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/a77639bd-f1e7-418e-b705-716a0a1d1119',
      start_time: '2022-07-11 09:49:07',
      start_time_seconds: 1657550947,
      finish_time: '2022-07-11 09:50:38',
      files_completed: 50,
      total_files: 50,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'e4c7a619-1109-4b67-8d2e-4aafb9f3b0d9',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/e4c7a619-1109-4b67-8d2e-4aafb9f3b0d9',
      start_time: '2022-07-11 09:49:06',
      start_time_seconds: 1657550946,
      finish_time: '2022-07-11 10:31:51',
      files_completed: 7066,
      total_files: 7066,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '74ce44e7-aefb-47fd-b176-786086a9d0d2',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/74ce44e7-aefb-47fd-b176-786086a9d0d2',
      start_time: '2022-07-11 09:49:06',
      start_time_seconds: 1657550946,
      finish_time: '2022-07-11 12:28:10',
      files_completed: 9599,
      total_files: 10199,
      files_skipped: 600,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'bd290cdb-141e-4ce0-ba3c-6f6920377cc3',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/bd290cdb-141e-4ce0-ba3c-6f6920377cc3',
      start_time: '2022-07-11 09:49:05',
      start_time_seconds: 1657550945,
      finish_time: '2022-07-11 10:11:08',
      files_completed: 2506,
      total_files: 2506,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: '51ab35da-33aa-46ef-9f1e-188b473d7d3e',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/51ab35da-33aa-46ef-9f1e-188b473d7d3e',
      start_time: '2022-07-11 09:49:04',
      start_time_seconds: 1657550944,
      finish_time: '2022-07-11 09:51:15',
      files_completed: 114,
      total_files: 114,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    },
    {
      request_id: 'a0ceeeef-81e2-4f06-95e0-b78c9a58aabc',
      status: 'Complete',
      title_link: 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/a0ceeeef-81e2-4f06-95e0-b78c9a58aabc',
      start_time: '2022-07-11 09:49:04',
      start_time_seconds: 1657550944,
      finish_time: '2022-07-11 10:01:40',
      files_completed: 902,
      total_files: 902,
      files_skipped: 0,
      needs_action: false,
      workers: '-'
    }
  ];

  let state = { //indicates data set, current page, and number of rows for table
    'querySet': arr,
    'page': 1,
    'rows': 10
  }

  function pagination(querySet: any[], page: number, rows: number){ //returns page specific data for table and the total number of pages
    let trimStart = (page-1) * rows;
    let trimEnd = trimStart + rows;
    var trimmedData = querySet.slice(trimStart, trimEnd);
    var pages = Math.ceil(querySet.length / rows);
    return {
      'querySet': trimmedData,
      'pages': pages
    }
  }

  async function createTable(){ //Function that creates instance of dashboard
    // 1st part of code in testing polling
    /*
    const response = await fetch('./files/src/transformation.json');
    if(response.status >= 200 && response.status <= 299){
      const data = await response.json();
      console.log(data);
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
    }else{
      console.log(response.status, response.statusText);
    }*/

    if(content.node.hasChildNodes()){   //Checking if there is already an exisiting table
      content.node.innerHTML = '';   //If it exists, it is removed
    }

    let table = document.createElement('table');  //Creating table and various table elements
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);

    let div = document.createElement('div'); //Creating div that wraps around all other elements
    div.style.backgroundColor = 'white';
    div.style.padding = '7.5px 15px';
    div.style.margin = '0px';
    div.style.width = '700px';
    let h4 = document.createElement('h4'); //Creating header for page
    h4.textContent = 'Transformation Requests';
    div.appendChild(h4);

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

    let pageData = pagination(state.querySet, state.page, state.rows); //Getting data set for specific page
    
    for(let i = -1; i < pageData.querySet.length; i++){    //for loop for creating table
      let row = document.createElement('tr'); //creating an individual row and the elements within it
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
        link.setAttribute("href", pageData.querySet[i]['title_link']);
        let linkText = document.createTextNode("Untitled");
        link.appendChild(linkText);
        elem_1.appendChild(link);
        row.appendChild(elem_1);
        elem_2 = document.createElement('td');
        elem_2.innerHTML = pageData.querySet[i].start_time;
        row.appendChild(elem_2);
        elem_3 = document.createElement('td');
        elem_3.innerHTML = pageData.querySet[i].finish_time;
        row.appendChild(elem_3);
        elem_4 = document.createElement('td');
        elem_4.innerHTML = pageData.querySet[i].status;
        if(pageData.querySet[i].status == 'Submitted' || pageData.querySet[i].status == 'Running'){ //If status is 'submitted' or 'running', progres bar is displayed
          let total_files = pageData.querySet[i].total_files;
          let completed_files = pageData.querySet[i].files_completed;
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
        link_1.setAttribute("href", 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/' + pageData.querySet[i].request_id + '/results?status=success');
        let linkText1 = document.createTextNode(pageData.querySet[i].files_completed.toString());
        link_1.appendChild(linkText1);
        elem_5.appendChild(link_1);
        let text;
        if(pageData.querySet[i].total_files !=  null){ //Null check to make sure code doesn't break
          text = document.createTextNode(' of ' + pageData.querySet[i].total_files);
        }else{
          text = document.createTextNode(' of Unknown');
        }
        elem_5.appendChild(text);
        if(pageData.querySet[i].files_skipped != 0){  //Adding link to log of failed files (if there are skipped files)
          let text_1 = document.createTextNode('\n  (');
          elem_5.appendChild(text_1);
          let link_2 = document.createElement('a');
          link_2.style.fontWeight = 'normal';
          link_2.setAttribute("href", 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/' + pageData.querySet[i].request_id + '/results?status=failure');
          let linkText2 = document.createTextNode(pageData.querySet[i].files_skipped.toString());
          link_2.appendChild(linkText2);
          elem_5.appendChild(link_2);
          let text_2 = document.createTextNode(' failed)');
          elem_5.appendChild(text_2);
        }
        row.appendChild(elem_5);
        elem_6 = document.createElement('td');
        elem_6.innerHTML = pageData.querySet[i].workers;
        row.appendChild(elem_6);
        elem_7 = document.createElement('td');;
        if(pageData.querySet[i].needs_action){ //If status is 'submitted' or 'running', button is displayed to cancel the request (Work In Progress)
          let btn = document.createElement('button');
          btn.innerHTML = 'Cancel';
          btn.type = 'button';
          btn.onclick = async function(){
            fetch('https://opendataaf-servicex.servicex.coffea-opendata.casa/servicex/transformation/'+ pageData.querySet[i].request_id + '/cancel');
          }
          elem_7.append(btn);
        }
        row.appendChild(elem_7);
        tbody.append(row);
      }
    }

    let pagination_div = document.createElement('div'); //Creating pagination bar
    pagination_div.style.color = 'white';
    pagination_div.style.justifyContent = 'center';
    pagination_div.style.padding = '10px';

    for(var page = 1; page <= pageData.pages; page++){ //Adding buttons to pagination bar
      let button = document.createElement('button');
      button.innerHTML = page.toString();
      button.style.borderRadius = '0px';
      if(page == state.page){ //Highlighting button of current page
        button.style.backgroundColor = 'rgb(0, 89, 255)';
        button.style.color = 'white';
        button.style.border = '0.5px solid rgb(0,89,255)';
      }else{
        button.style.backgroundColor = 'white';
        button.style.color = 'rgb(0, 89, 255)';
        button.style.border = '0.5px solid gray';
      }
      button.style.width = '20px';
      button.onclick = function(){ //Widget "reloads" when one of pagination buttons is clicked
        state.page = parseInt(button.innerHTML, 10);
        createTable();
      }
      pagination_div.appendChild(button);
    }

    div.appendChild(pagination_div);
    
    setTimeout(createTable, 5000); //Call for polling inside createTable()
 
    /* Code for retrieving live json result (Not operational while CORS issue still exists)
    const response = await fetch('https://opendataaf-servicex.servicex.coffea-opendata.casa/servicex/transformation');
    const data = await response.json();
    let arr_1 = [];
    const urls = [];

    for(var i = data.requests.length - 1; i > data.requests.length - 121; i--){
        const obj = {
            request_id: '',
            status: '',
            title_link: '',
            start_time: '',
            start_time_seconds: 0,
            finish_time: '',
            files_completed: 0,
            total_files: 0,
            files_skipped: -1,
            needs_action: false,
            workers: '' 
        };

        let request_id = data.requests[i]['request_id'];
        obj['request_id'] = request_id;
        let status = data.requests[i]['status'];
        obj['status'] = status;
        obj['title_link'] = 'https://opendataaf-servicex.servicex.coffea-opendata.casa/transformation-request/' + request_id;

        let workers = data.requests[i]['workers'];
        if(status == 'Complete' || status == 'Canceled' || status == 'Fatal'){
            obj['needs_action'] = false;
            obj['workers'] = '-';
        }else{
            obj['needs_action'] = true;
            obj['workers'] = workers.toString();
        }

        urls.push('https://opendataaf-servicex.servicex.coffea-opendata.casa/servicex/transformation/' + request_id + '/status');

        arr_1.push(obj);
    }

    const promises = urls.map(url => fetch(url));
    const getRequests = await Promise.all(promises);
    const morePromises = getRequests.map(res => res.json());
    const getResults = await Promise.all(morePromises);

    for(let i = 0; i < arr_1.length; i++){
        let start_time = getResults[i]['submit-time'];
        start_time = start_time.slice(0,19);
        const date = new Date(start_time);
        const seconds = Math.floor(date.getTime() / 1000);
        arr_1[i]['start_time_seconds'] = seconds;
        start_time = start_time.replace("T", " ");
        let finish_time = getResults[i]['finish-time'];
        if(finish_time != null){
            finish_time = finish_time.replace("T", " ");
            finish_time = finish_time.slice(0, 19);
        }else{
            finish_time = '-';
        }
        arr_1[i]['start_time'] = start_time;
        arr_1[i]['finish_time'] = finish_time;

        let files_processed = getResults[i]["files-processed"];
        let files_remaining = getResults[i]["files-remaining"];
        let files_skipped = getResults[i]["files-skipped"];
        let total_files;
        if (files_remaining == null) {
            total_files = null;
        }else{
            total_files = files_processed + files_skipped + files_remaining;
        }
        arr_1[i]['files_completed'] = files_processed;
        arr_1[i]['total_files'] = total_files;
        arr_1[i]['files_skipped'] = files_skipped;
    }

    let sortedArr = quickSort(arr_1, 0, arr_1.length - 1);
    console.log(sortedArr);
    const duration = (Date.now() - start) / 1000;
    console.log('Total run time: ' + duration);
    function swap(arr: any[], left: number, right: number){
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
    }
  
    function partition(arr: any[], left: number, right: number){
        let pivot = arr[Math.floor((right + left)/2)].start_time_seconds;
        let i = left;
        let j = right;
        while(i <= j){
            while(arr[i].start_time_seconds > pivot){
                i++;
            }
            while(arr[j].start_time_seconds < pivot){
                j--;
            }
            if(i <= j){
                swap(arr, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
    
    function quickSort(arr: any[], left: number, right: number){
        let index;
        if(arr.length > 1){
            index = partition(arr, left, right);
            if(left < index - 1){
                quickSort(arr, left, index - 1);
            }
            if(index < right){
                quickSort(arr, index, right);
            }
        }
        return arr;
    }*/

  }

  const content = new Widget(); //Creating widget and adding scrolling capabilites to it
  content.addClass('my-apodWidget');
  const widget = new MainAreaWidget({ content });
  widget.id = 'servicex-dashboard';
  widget.title.label = 'ServiceX Dashboard';
  widget.title.closable = true;

  setTimeout(createTable, 5000); //Calling of setTimeout to start polling loop. 
  //createTable();

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
