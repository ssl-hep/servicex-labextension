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

  let loop: any = null; //variable to set/reset polling (this was a bit of a rushed change, probably should get reworked in the future)

  let state = { //indicates current page, number of rows, order, and number of buttons on bar for table
    'page': 1,
    'rows': 2,
    'window': 3,
    'desc': true,
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

  function createButtons(pageData: any, pagination_div: HTMLDivElement){ //creates buttons for pagination bar
    let maxLeft = (state.page - Math.floor(state.window / 2)); //Get leftmost and rightmost buttons for bar
    let maxRight = (state.page + Math.floor(state.window / 2));

    if(maxLeft < 1){
      maxLeft = 1;
      maxRight = state.window;
    }
    if(maxRight > pageData.pages){
      maxLeft = pageData.pages - (state.window - 1);
      if(maxLeft < 1){
        maxLeft = 1;
      }
      maxRight = pageData.pages;
    }
    if(maxLeft != 1){ //Add first button to bar if leftmost button is not 1
      let first = document.createElement('button');
      first.setAttribute('id', 'firstLastButton');
      first.innerHTML = '<<';
      first.onclick = function(){ //Current page is set to 1 if button is clicked
        state.page = 1;
      }
      pagination_div.appendChild(first);
    }

    for(var page = maxLeft; page <= maxRight; page++){ //Adding buttons to pagination bar
      let button = document.createElement('button');
      button.setAttribute('id', 'paginationButton');
      button.innerHTML = page.toString();
      if(page == state.page){ //Highlighting button of current page
        button.style.backgroundColor = '#007bff';
        button.style.color = 'white';
        button.style.border = '0.5px solid #007bff';
      }else{
        button.style.backgroundColor = 'white';
        button.style.color = '#007bff';
        button.style.border = '0.5px solid gray';
      }
      button.onclick = function(){ //Widget "reloads" when one of pagination buttons is clicked
        state.page = parseInt(button.innerHTML, 10);
      }
      pagination_div.appendChild(button);
    }
    
    if(maxRight != pageData.pages){ //Add last button if rightmost button is not the number of total pages
      let last = document.createElement('button');
      last.setAttribute('id', 'firstLastButton');
      last.innerHTML = '>>';
      last.onclick = function(){ //Current button is set to the last possible button when clicked
        state.page = pageData.pages;
        //createTable();
      }
      pagination_div.appendChild(last);
    }
  }

  async function createTable(SERVICEX_URL: string){ //Function that creates instance of dashboard
    //Code for retrieving live json result
    /*
    const start = Date.now(); //For run time testing purposes
    let response;
    try{ //Testing to see if fetch request to current instance works
      response = await fetch(SERVICEX_URL + 'servicex/transformation');
    } catch(error){ //If not alert an error
      alert('An error has occured: ' + error + '. This is most likely a CORS header issue with ' + SERVICEX_URL + '. Do cltr+shift+j to view the developer console for error specifics.');
      return;
    }
    let arr_1 = []; //Overall array for unsorted data
    if(response != null){ //If response is not null, proceed with the filling of arr_1. Else, exit.
      const data = await response.json(); //Getting json response for all requests
      let requests = data.requests;

      for(var i = requests.length - 1; i > -1; i--){ //creating array containing objects for all of requests
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
        let request_id = requests[i]['request_id']; //setting request_id, status, and titile link parameters 
        obj['request_id'] = request_id;
        let status = requests[i]['status'];
        obj['status'] = status;
        obj['title_link'] = SERVICEX_URL + 'transformation-request/' + request_id;

        let workers = requests[i]['workers'];
        if(status == 'Complete' || status == 'Canceled' || status == 'Fatal'){ //Depending on status, the number of workers/cancel button may show
            obj['needs_action'] = false;
            obj['workers'] = '-';
        }else{
            obj['needs_action'] = true;
            obj['workers'] = workers.toString();
        }

        let start_time = requests[i]['submit-time']; //Setting start time and finish time
        start_time = start_time.slice(0,19);
        const date = new Date(start_time);
        const seconds = Math.floor(date.getTime() / 1000);
        obj['start_time_seconds'] = seconds;
        start_time = start_time.replace("T", " ");
        let finish_time = requests[i]['finish-time'];
        if(finish_time != null){
            finish_time = finish_time.replace("T", " ");
            finish_time = finish_time.slice(0, 19);
        }else{
            finish_time = '-';
        }
        obj['start_time'] = start_time;
        obj['finish_time'] = finish_time;

        let files_processed = requests[i]["files-processed"]; //setting parameters regarding files
        let files_remaining = requests[i]["files-remaining"];
        let files_skipped = requests[i]["files-skipped"];
        let total_files;
        if (files_remaining == null) {
            total_files = null;
        }else{
            total_files = files_processed + files_skipped + files_remaining;
        }
        obj['files_completed'] = files_processed;
        obj['total_files'] = total_files;
        obj['files_skipped'] = files_skipped;

        arr_1.push(obj); //pushing object for a single request into main array
      }
    }else{
      return;
    }

    let arr = quickSort(arr_1, 0, arr_1.length - 1); //Sorting array to be from latest to earliest
    console.log(arr);
    const duration = (Date.now() - start) / 1000; //For run time testing purposes
    console.log('API Call Runtime: ' + duration);

    function swap(arr: any[], left: number, right: number){ //Swap function for sorting
      let temp = arr[left];
      arr[left] = arr[right];
      arr[right] = temp;
    }

    function partition(arr: any[], left: number, right: number){ //Partition function for sorting
      let pivot = arr[Math.floor((right + left)/2)].start_time_seconds;
      let i = left;
      let j = right;
      while(i <= j){
        if(state.desc){
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
        }else{
          while(arr[i].start_time_seconds < pivot){
            i++;
          }
          while(arr[j].start_time_seconds > pivot){
            j--;
          }
          if(i <= j){
            swap(arr, i, j);
            i++;
            j--;
          }
        }
      }
      return i;
    }
    
    function quickSort(arr: any[], left: number, right: number){ //Recursive function for sorting
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
    
    let arr = [  //For testing table functionality (until ServiceX issues are resolved)
      {
        request_id: 'e772add9-8163-45c0-ae8e-81fd5a2edb30',
        status: 'Complete',
        title_link: 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/e772add9-8163-45c0-ae8e-81fd5a2edb30',
        start_time: '2022-08-04 18:28:49',
        start_time_seconds: 1659655729,
        finish_time: '2022-08-04 19:14:48',
        files_completed: 1697,
        total_files: 1697,
        files_skipped: 0,
        needs_action: false,
        workers: '-'
      },
      {
        request_id: 'ef57e235-ada0-4151-b82a-78d6851da431',
        status: 'Complete',
        title_link: 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/ef57e235-ada0-4151-b82a-78d6851da431',
        start_time: '2022-07-26 09:24:50',
        start_time_seconds: 1658845490,
        finish_time: '2022-07-26 10:10:53',
        files_completed: 1697,
        total_files: 1697,
        files_skipped: 0,
        needs_action: false,
        workers: '-'
      },
      {
        request_id: '05cb9bf6-6fd8-477c-b9f6-d1352160cba9',
        status: 'Complete',
        title_link: 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/05cb9bf6-6fd8-477c-b9f6-d1352160cba9',
        start_time: '2022-06-16 15:39:24',
        start_time_seconds: 1655411964,
        finish_time: '2022-06-16 16:35:54',
        files_completed: 1697,
        total_files: 1697,
        files_skipped: 0,
        needs_action: false,
        workers: '-'
      },
      {
        request_id: '6d7fb6c9-c64c-4614-98bd-fe62fde5fdcc',
        status: 'Complete',
        title_link: 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/6d7fb6c9-c64c-4614-98bd-fe62fde5fdcc',
        start_time: '2022-04-23 13:28:49',
        start_time_seconds: 1650738529,
        finish_time: '2022-04-23 14:15:38',
        files_completed: 1697,
        total_files: 1697,
        files_skipped: 0,
        needs_action: false,
        workers: '-'
      },
      {
        request_id: '232ecf8a-b440-4002-a58f-1f28cd72ccca',
        status: 'Complete',
        title_link: 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/232ecf8a-b440-4002-a58f-1f28cd72ccca',
        start_time: '2022-04-20 17:17:47',
        start_time_seconds: 1650493067,
        finish_time: '2022-04-20 18:03:27',
        files_completed: 1697,
        total_files: 1697,
        files_skipped: 0,
        needs_action: false,
        workers: '-'
      },
      {
        request_id: '3ad75289-7ef2-4ec4-95d3-c931aee41e45',
        status: 'Complete',
        title_link: 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/3ad75289-7ef2-4ec4-95d3-c931aee41e45',
        start_time: '2022-04-20 10:28:58',
        start_time_seconds: 1650468538,
        finish_time: '2022-04-20 11:14:05',
        files_completed: 1697,
        total_files: 1697,
        files_skipped: 0,
        needs_action: false,
        workers: '-'
      },
      {
        request_id: 'aeef0b4f-4b15-4df9-af64-ec1f8449412d',
        status: 'Complete',
        title_link: 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/aeef0b4f-4b15-4df9-af64-ec1f8449412d',
        start_time: '2022-04-19 16:52:01',
        start_time_seconds: 1650405121,
        finish_time: '2022-04-19 17:35:56',
        files_completed: 1697,
        total_files: 1697,
        files_skipped: 0,
        needs_action: false,
        workers: '-'
      },
      {
        request_id: '119201ab-f613-4363-bad3-1406af9f8daf',
        status: 'Complete',
        title_link: 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/119201ab-f613-4363-bad3-1406af9f8daf',
        start_time: '2022-04-19 16:01:20',
        start_time_seconds: 1650402080,
        finish_time: '2022-04-19 16:56:06',
        files_completed: 1697,
        total_files: 1697,
        files_skipped: 0,
        needs_action: false,
        workers: '-'
      }
    ];
    
    if(content.node.hasChildNodes() && content.node.childElementCount >= 2){   //Checking if there is already an exisiting table
      let table_div = content.node.lastElementChild;
      if(table_div != null){
        content.node.removeChild(table_div);   //If it exists, it is removed
      }
    }

    let table = document.createElement('table');  //Creating table and various table elements
    table.setAttribute('id', 'requestTable');
    let caption = document.createElement('caption');
    caption.innerHTML = 'Current instance: ' + SERVICEX_URL;
    caption.style.marginBottom = '5px';
    table.appendChild(caption);
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);

    let div = document.createElement('div'); //Creating div that wraps around all other elements
    div.style.backgroundColor = 'white';
    div.style.padding = '7.5px 15px';
    div.style.margin = '0px';
    div.style.width = '535px';

    let h4 = document.createElement('h4'); //Creating header for page
    h4.setAttribute('id', 'header');
    h4.textContent = 'Transformation Requests';

    let exit = document.createElement('button'); //Creating exit button for dashboard
    exit.setAttribute('id', 'exit');
    exit.innerHTML = 'X';
    exit.onclick = function(){
      clearTimeout(loop);
      content.node.removeChild(div);
      return;
    }

    let div_row = document.createElement('div'); //Creating div that contains page header
    div_row.appendChild(h4);
    div_row.appendChild(exit);
    div.appendChild(div_row);
    div.appendChild(table);
    content.node.appendChild(div); //Appends newly created table to widget
    let pageData = pagination(arr, state.page, state.rows); //Getting data set for specific page
    
    for(let i = -1; i < pageData.querySet.length; i++){    //for loop for creating table
      let row = document.createElement('tr'); //creating an individual row and the elements within it
      let elem_1, elem_2, elem_3, elem_4, elem_5, elem_6, elem_7;
      if(i == -1){  //For header of table (creating elements and attaching them)
        elem_1 = document.createElement('th');
        elem_1.innerHTML = "Request";
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
        link.style.fontWeight = 'bold';
        link.setAttribute("href", pageData.querySet[i]['title_link']);
        let linkText = document.createTextNode('Link');
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
        let statusText = document.createTextNode(pageData.querySet[i].status);
        elem_4.appendChild(statusText);
        if(pageData.querySet[i].status == 'Submitted' || pageData.querySet[i].status == 'Running'){ //If status is 'submitted' or 'running', progres bar is displayed
          let total_files = pageData.querySet[i].total_files;
          let completed_files = pageData.querySet[i].files_completed;
          let loading_bar = document.createElement('div'); //Creating outer element of progress bar
          loading_bar.style.width = '60px';
          loading_bar.style.height = '15px';
          loading_bar.style.backgroundColor = 'rgb(200, 200, 200)';
          loading_bar.style.marginTop = '4px';
          loading_bar.style.borderRadius = '6px';
          let progress_bar = document.createElement('span'); //Creating inner element of progress bar
          progress_bar.classList.add('progressBar');
          progress_bar.classList.add('progressBarStripes');
          if(total_files != null){ //Null check to make sure code doesn't break
            progress_bar.style.width = ((completed_files/total_files)*60).toString() + 'px';
            let progress = (completed_files/total_files)*100;
            progress_bar.innerHTML = progress.toFixed(0) + '%';
          }else{
            progress_bar.style.width = '40px';
            progress_bar.innerHTML = 'NaN%';
          }
          loading_bar.appendChild(progress_bar);
          elem_4.appendChild(loading_bar); 
        }
        row.appendChild(elem_4);
        elem_5 = document.createElement('td');
        let link_1 = document.createElement('a'); //Adding link to log of successful files
        link_1.style.fontWeight = 'normal';
        link_1.setAttribute("href", SERVICEX_URL + 'transformation-request/' + pageData.querySet[i].request_id + '/results?status=success');
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
          link_2.setAttribute("href", SERVICEX_URL + 'transformation-request/' + pageData.querySet[i].request_id + '/results?status=failure');
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
        if(pageData.querySet[i].needs_action){ //If status is 'submitted' or 'running', button is displayed to cancel the request
          let btn = document.createElement('button');
          btn.setAttribute('id', 'cancelButton');
          btn.innerHTML = 'Cancel';
          btn.type = 'button';
          btn.onclick = async function(){
            fetch(SERVICEX_URL + 'servicex/transformation/'+ pageData.querySet[i].request_id + '/cancel');
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

    createButtons(pageData, pagination_div); //call to create pagination buttons for widget
    div.appendChild(pagination_div);
    console.log(SERVICEX_URL);
    loop = setTimeout(createTable, 2500, SERVICEX_URL); //Call for polling inside createTable()
  }

  const content = new Widget(); //Creating widget and adding scrolling capabilites to it
  content.addClass('my-apodWidget');
  const widget = new MainAreaWidget({ content });
  widget.id = 'servicex-dashboard';
  widget.title.icon = 'servicex-logo';
  widget.title.closable = true;

  /* //code for alternate user input bar (might use if dropdown menu runs into issues)
  let input_div = document.createElement('div');
  input_div.style.backgroundColor = 'white';
  input_div.style.padding = '7.5px 15px';
  input_div.style.margin = '0px';
  input_div.style.width = '535px';
  let header = document.createElement('h3');
  header.innerHTML = 'Enter ServiceX Instance URL';
  header.style.fontWeight = '500';
  let input = document.createElement('input');
  input.setAttribute('id', 'input');
  input.setAttribute('value', 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/');
  input.style.width = '400px';
  let input_button = document.createElement('button');
  input_button.setAttribute('id', 'inputButton');
  input_button.innerHTML = 'Go';
  input_div.appendChild(header);
  input_div.appendChild(input);
  input_div.appendChild(input_button);
  content.node.appendChild(input_div);
  console.log('appended child');
  input_button.onclick = function(){ //Initial call to create table for widget
    createTable(input.value);
  }*/

  let instance_arr = [ //list of all possible ServiceX instance urls
    'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/',
    'https://uproot-atlas.servicex.af.uchicago.edu/',
    'https://xaod.servicex.af.uchicago.edu/',
    'https://opendataaf-servicex.servicex.coffea-opendata-dev.casa/'
  ];
  let dropdown_container_div = document.createElement('div'); //creating container div for the entire dropdown section
  dropdown_container_div.style.backgroundColor = 'white';
  dropdown_container_div.style.padding = '7.5px 15px';
  dropdown_container_div.style.margin = '0px';
  dropdown_container_div.style.width = '535px';
  dropdown_container_div.style.borderBottom = '0.5px solid gray';
  let header = document.createElement('h3'); //Creating header above dropdown menu
  header.innerHTML = 'Select ServiceX Instance URL';
  header.style.fontWeight = '500';
  dropdown_container_div.appendChild(header);
  let dropdown = document.createElement('div'); //Creating div for the contents of the dropdown menu (initially hidden)
  dropdown.classList.add('dropdown');
  dropdown_container_div.appendChild(dropdown);
  let dropdown_button = document.createElement('button'); //Creating button for dropdown menu
  dropdown_button.classList.add('dropdownButton');
  dropdown_button.innerHTML = '▼     Select an instance';
  let dropdown_div = document.createElement('div'); //Creating div that houses the dropdown menu 
  dropdown_div.setAttribute('id', 'dropdownDiv');
  dropdown_div.classList.add('dropdownDiv');
  for(let i = 0; i < 4; i++){ //Adding links to dropdown menu
    let link = document.createElement('a');
    link.innerHTML = instance_arr[i]; //Set the current link text to the a ServiceX instance url
    link.onclick = function(){
      clearTimeout(loop); //When a link is clicked, reset the polling loop and start a new loop with the current ServiceX instance url
      createTable(instance_arr[i]);
    }
    dropdown_div.appendChild(link);
  }
  dropdown.appendChild(dropdown_button);
  dropdown.appendChild(dropdown_div);
  dropdown_button.onclick = function(){ //When dropdown button is clicked, toggle the dropdown's appearence
    dropdown_div.classList.toggle('show');
  }
  window.onclick = function(event: any){ //If anywhere besides the dropdown button is clicked, remove the contents of the dropdown menu from the screen
    if(!event.target.matches('.dropdownButton')){
      dropdown_div.classList.remove('show');
    }
  }
  content.node.appendChild(dropdown_container_div);

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