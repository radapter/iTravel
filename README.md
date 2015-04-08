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
Install node.js dependencies
```
cd server
npm install
```
Run the server
```
node bin/www
```

## Run Tests Manually
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

## Front-end package management and assest build system
### Bower
[Bower](http://bower.io/) is a node module for package management; bower to front-end packages is like what npm for the node.js packages. Most popular open source projects on GitHub offer an option to be installed with Bower, for example, install JQuery with Bower using command line:

```
bower install jquery
```

If you need to add a 3rd party library to this project, consider use bower instead of manually download it from GitHub because it works hand in hand with the build system.

### Gulp - the build system for workflow automation
[Gulp](http://gulpjs.com/) automate the build process of the project - it runs tasks such as compile scss to css, combine and minify css/js files, automatically inject js/css files installed with Bower into html/ejs pages etc. There are gulp plugins on npm that virtually cover all types of tasks.
There are might be an overhead to learn Gulp in the beginning, but a build tool really simplifies a developer's everyday workflow and brings benefits to project.
You can browse the gulp tasks in the file `gulpfile.js`. We will add more Gulp tasks(auto-testing, minification etc) to the project later.  

After running `npm install` as listed in above section, just run 
```
gulp
```
in the command line and all magic will happen - front-end packages will be installed and injected to index.ejs. 