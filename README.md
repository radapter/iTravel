# iTravel
iTravel: Personal and Adaptive Tour Guide

CMPE 295 project for Jennifer Wu, Xiaoli Jiang, Yulin Ye, Tuo Lei

## Team Member
Jennifer Wu: jenn.j.wu@gmail.com

Xiaoli Jiang: jiangxiaoli1104@gmail.com

Yulin Ye: yulinye.yy@gmail.com

Tuo Lei: leituo56@gmail.com

## Install and Run Server
First, make sure you have node and npm installed
```
node --version
npm -- version
```
Install dependencies
```
cd server
npm install
```
Run the server
```
node bin/www
```

## Run Tests
Need to install mocha globally to run unit test
```
sudo npm install -g mocha
```

Run test
```
mocha
```

Run a specific test, e.g. run utils_spec.js under test/ folder
```
mocha test/utils_spec.js
```
