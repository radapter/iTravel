# iTravel
iTravel: Personal and Adaptive Tour Guide

CMPE 295 Master's project at SJSU for Jennifer Wu, Xiaoli Jiang, Tuo Lei, and Yulin Ye

## Team Members
- Jennifer Wu: jenn.j.wu@gmail.com
- Xiaoli Jiang: jiangxiaoli1104@gmail.com
- Yulin Ye: yulinye.yy@gmail.com
- Tuo Lei: leituo56@gmail.com

## General Setup
- Install [node](https://nodejs.org/) and [npm](https://github.com/npm/npm) 
 - Run `node --version` and `npm --version` to check if you are not sure
- Install global node packages: ```npm install -g bower gulp mocha```
- Clone project: `git clone https://github.com/radapter/iTravel.git`
- `cd iTravel` if necessary for project base directory

### Run Server (manual)
- Install node.js dependencies
 - `cd server`
 - `npm install`
- Run the server:  `node bin/www`

### Run Server (using gulp) 
- Run `gulp` (installs dependencies, builds project and runs server)
 - A development server will be started automatically and restarted automatically any there are file changes.


## Setup Mobile App
- Run all steps above in general setup
- Install ionic: `npm install -g cordova ionic`
- `cd itravel` from base directory (not from server)
- Install frontend dependencies: ```bower install```
- ```ionic serve``` starts the app in the browser
 - If prompted to select address, enter 2 for localhost
 - If not automatically redirected, navigate to [http://localhost:8100](http://localhost:8100)
- **NOTE: The ionic app uses the same node server as the web version. Make sure to run `gulp` under `/server` folder first**
- Build and emulate the app locally
 - ```ionic platform add ios```
 - ```ionic build ios```
 - ```ionic emulate ios```

## Development
For devflow instructions, please see [DEVFLOW.md](https://github.com/radapter/iTravel/blob/develop/DEVFLOW.md)

## Testing
- Run tests using: `mocha`

- Run a specific test (e.g. run utils_spec.js under test/ folder)
 - `mocha test/utils_spec.js`
