# Scanner
## Step 1:
Move to Current Downloaded Location using cmd or terminal, if you see the Project in your current directory <br>
Check if, req.txt file exists<br>

Here, I'm using **dact** package, it will create the django project and react app directly.<br>Once created, it will webpack the frontend using **dact-watch**.<br> Every change it will generate the webpack app.bundle.js

If you want to edit frontend, instruction will be given below

## Step 2:
If you want install in seperate location using virtaulenv or else continue step 3

In windows,

` pip install virtualenvwrapper-win`


Others,

` pip install virtualenvwrapper`

Configuration for others, 

Add this to .bashrc

```
  export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
  export WORKON_HOME=$HOME/.virtualenvs 
  export VIRTUALENVWRAPPER_VIRTUALENV=/home/root/.local/bin/virtualenv
  source ~/.local/bin/virtualenvwrapper.sh 

```

Once Completed, create virtual environment using

` mkvirtualenv env_name `

If want Use it again use,

` workon env_name `

## Step 3:
Installing Python Packages using *req.txt* file

  ` pip install -r req.txt `
  
## step 4:
Collects static files from each of your applications into single locations

  ` python manage.py collectstatic`
  
## setp 5:
Migration is a way of applying changes that we have made to a model, into the database schema

  `python manage.py migrate`
  
 Here using Default database **SQLite**.
 
In this application two models(Tables) are required, so this application is required lightweight database.<br> Also SQLite can't support a high level of concurrency.

If any concurrency occur shift to mysql or postgres or else nosql.<br>
Django providing MongoDB package called djongo
 
## Step 6:
Run django server <br>
 `python manage.py runserver`

# React:
### Step 1:
Move to Current Downloaded Location using cmd or terminal, <br>
` cd ./Design/static/`

### step 2:
Install npm packages using 
` npm install `

### step 3:
Webpack for each changes<br>
Move toward virtualenvironment or installed python dact package<br>
` workon env_name `

Listen server for React<br>
` dact-watch`

changes will update in the server


# API Endpoint:
### 1. Image Process
> #### a. For base64 returns
> ##### &emsp;URL: /api/image/base64/ 
> ##### &emsp;METHOD: POST
> ##### &emsp;INPUT:
```
        {
            "image": "Image Object .jpg, .jpeg, .png, etc",
            "xml"  : "XML File only"
        }
```
> ##### &emsp;OUTPUT:

```
    CASE1: process successfully
        {
            "success":True,
            "base64data":"aWFCXCsSD.........cddbjs1323/cfsd"
        }
    CASE2: Any error
        {
            "success":False,
            "errors":"error data will returns"
        }
        
```
 

> #### b. For URL returns
> Storing the data into server at **media/process/** and return the image url
> ##### &emsp;URL: /api/image/url/ 
> ##### &emsp;METHOD: POST
> ##### &emsp;INPUT:
```
        {
            "image": "Image Object .jpg, .jpeg, .png, etc",
            "xml"  : "XML File only"
        }
```
> ##### &emsp;OUTPUT:

```
    CASE1: process successfully
        {
            "success":True,
            "url":"media/process/P00X000-2019092701425.jpg"
        }
    CASE2: Any error
        {
            "success":False,
            "errors":"error data will returns"
        }
        
```
  
### 2. Report
> #### Return CSV report
> ##### &emsp;URL: /api/report/ 
> ##### &emsp;METHOD: GET
> ##### &emsp;INPUT:
```
        {
            "start_date": "date format yyyy-MM-dd",
            "end_date": "date format yyyy-MM-dd"
        }
        or
        IN URL:
            /api/report/?start_date=yyyy-MM-dd&end_date=yyyy-MM-dd
```
> ##### &emsp;OUTPUT:

> Process successfully, file will be return


# Result:

### Design for Image Process UI
![Image](/Design/static/output/index_before.png)

### After Upload and submit UI
![Image](/Design/static/output/index_after.png)

### Report UI
![Image](/Design/static/output/report.png)

