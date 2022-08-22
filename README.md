# Servicex-labextension

## Overview
Servicex-labextension is a Jupyterlab extension containing the servicex-dashboard plug-in. The servicex-dashboard gives users the ability to monitor transformation requests 
within Jupyterlab.

## Install

To install servicex-dashboard, execute:

```bash
pip install servicex-dashboard
```

## Uninstall

To uninstall servicex-dashboard, execute:

```bash
pip uninstall servicex-dashboard
```

## Usage

Servicex-dashboard is activated through the command palette (view->Activate Command Palette->ServiceX Dashboard). When the plug-in is activated, a dashboard will pop up
on the left sidebar with the ServiceX logo. Inside this dashboard, there will be a prompt to select the desired ServiceX instance url from a dropdown menu. Once one of the options
is selected, the table portion of the dashboard will appear. The dropdown menu can be accessed at all times and users can freely change the current ServiceX instance on the dashboard.
The table contains all the parameters that would be seen on the ServiceX website. Below the table, there is a pagination bar to navigate through all transformation requests.  Depending on the current page, 
‘<<’ and ‘>>’ buttons will appear, with the former, when clicked, will set the page to the first page, and the latter, when clicked, will set the page to the last possible page. 
There is also a red exit button that will close the current table.











