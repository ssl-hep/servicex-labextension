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

  let state = { //indicates current page, number of rows, and numbers of buttons on bar for table
    'page': 1,
    'rows': 10,
    'window': 5
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
      first.innerHTML = '<<';
      first.style.borderRadius = '0px';
      first.style.backgroundColor = 'white';
      first.style.color = 'rgb(0,89,255)';
      first.style.border = '0.5px solid gray';
      first.style.width = '20px';
      first.onclick = function(){
        state.page = 1;
        //createTable();
      }
      pagination_div.appendChild(first);
    }
    for(var page = maxLeft; page <= maxRight; page++){ //Adding buttons to pagination bar
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
      button.style.height = '22.5px';
      button.style.borderRadius = '0px';
      button.style.fontSize = '12px';
      button.style.textAlign = 'center';
      button.onclick = function(){ //Widget "reloads" when one of pagination buttons is clicked
        state.page = parseInt(button.innerHTML, 10);
        //createTable();
      }
      pagination_div.appendChild(button);
    }
    
    if(maxRight != pageData.pages){ //Add last button if rightmost button is not the number of total pages
      let last = document.createElement('button');
      last.innerHTML = '>>';
      last.style.borderRadius = '0px';
      last.style.backgroundColor = 'white';
      last.style.color = 'rgb(0,89,255)';
      last.style.border = '0.5px solid gray';
      last.style.width = '20px';
      last.onclick = function(){
        state.page = pageData.pages;
        //createTable();
      }
      pagination_div.appendChild(last);
    }
  }

  async function createTable(){ //Function that creates instance of dashboard
    //Code for retrieving live json result
    const start = Date.now();
    const response = await fetch('https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/servicex/transformation');
    const data = await response.json(); //Getting json response for all requests
    let arr_1 = [];
    const urls = [];

    for(var i = data.requests.length - 1; i > -1; i--){ //creating array containing objects for all of requests
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
      obj['title_link'] = 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/' + request_id;

      let workers = data.requests[i]['workers'];
      if(status == 'Complete' || status == 'Canceled' || status == 'Fatal'){ //Depending on status, the number of workers/cancel button may show
          obj['needs_action'] = false;
          obj['workers'] = '-';
      }else{
          obj['needs_action'] = true;
          obj['workers'] = workers.toString();
      }

      urls.push('https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/servicex/transformation/' + request_id + '/status'); //pushing urls of requests for later use

      arr_1.push(obj); //pushing object for a single request into main array
    }

    const promises = urls.map(url => fetch(url))
    const getRequests = await Promise.all(promises);
    const morePromises = getRequests.map(res => res.json());
    const getResults = await Promise.all(morePromises); //Getting json responses from all requests' status API

    for(let i = 0; i < arr_1.length; i++){ //Adding onto request objects with newly recieved json responses
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

    let arr = quickSort(arr_1, 0, arr_1.length - 1); //Sorting array to be from latest to earliest
    console.log(arr);
    const duration = (Date.now() - start) / 1000;
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
    }

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
    div.style.width = '540px';
    let h4 = document.createElement('h4'); //Creating header for page
    h4.textContent = 'Transformation Requests';
    div.appendChild(h4);

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
          if(total_files != null){ //Null check to make sure code doesn't break. If pass, create progress bar
            let loading_bar = document.createElement('div'); //Creating outer element of progress bar
            loading_bar.style.width = '60px';
            loading_bar.style.height = '15px';
            loading_bar.style.backgroundColor = 'rgb(200, 200, 200)';
            loading_bar.style.marginTop = '4px';
            loading_bar.style.borderRadius = '6px';

            let progress_bar = document.createElement('span'); //Creating inner element of progress bar
            progress_bar.style.backgroundImage = 'linear-gradient(to bottom, #31a8ec, #0067f6 50%)';
            //progress_bar.style.backgroundColor = 'rgb(0, 89, 255)';
            progress_bar.style.display = 'block';
            progress_bar.style.width = ((completed_files/total_files)*60).toString() + 'px';
            progress_bar.style.height = '15px';
            progress_bar.style.borderRadius = '6px';
            progress_bar.style.textAlign = 'center';
            progress_bar.style.color = 'white';
            progress_bar.style.fontSize = '12.5px';
            let progress = (completed_files/total_files)*100;
            progress_bar.innerHTML = progress.toString() + '%';
            loading_bar.appendChild(progress_bar);
            elem_4.appendChild(loading_bar);
          } 
        }
        row.appendChild(elem_4);
        elem_5 = document.createElement('td');
        let link_1 = document.createElement('a'); //Adding link to log of successful files
        link_1.style.fontWeight = 'normal';
        link_1.setAttribute("href", 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/' + pageData.querySet[i].request_id + '/results?status=success');
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
          link_2.setAttribute("href", 'https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/transformation-request/' + pageData.querySet[i].request_id + '/results?status=failure');
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
          btn.style.backgroundColor =  'rgb(226, 28, 28)';
          btn.style.border = 'none';
          btn.style.color = 'white';
          btn.style.borderRadius =  '0.25rem';
          btn.style.fontSize = '12px';
          btn.style.width = '45px';
          btn.style.height=  '24.75px';
          btn.style.textAlign = 'center';
          btn.onclick = async function(){
            fetch('https://opendataaf-servicex-aod.servicex.coffea-opendata-dev.casa/servicex/transformation/'+ pageData.querySet[i].request_id + '/cancel');
            createTable();
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

    createButtons(pageData, pagination_div);
    div.appendChild(pagination_div);
    
    //setTimeout(createTable, 5000); //Call for polling inside createTable()
  }

  const content = new Widget(); //Creating widget and adding scrolling capabilites to it
  content.addClass('my-apodWidget');
  const widget = new MainAreaWidget({ content });
  widget.id = 'servicex-dashboard';
  widget.title.icon = 'servicex-logo';
  widget.title.closable = true;
 
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
