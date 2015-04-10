# iTravel
iTravel: Personal and Adaptive Tour Guide

CMPE 295 project for Jennifer Wu, Xiaoli Jiang, Yulin Ye, Tuo Lei

## Team Member
Jennifer Wu: jenn.j.wu@gmail.com

Xiaoli Jiang: jiangxiaoli1104@gmail.com

Yulin Ye: yulinye.yy@gmail.com

Tuo Lei: leituo56@gmail.com

# Quick Start Guide

## Install node and npm
Before start, make sure you have [node](https://nodejs.org/) and [npm](https://github.com/npm/npm) installed. 
Run following commands to check if they are properly installed on your computer if you are not sure:
```
node --version
npm --version
```

## Install global node packages with npm
```
npm install -g bower gulp mocha
```

## Clone project repo to your computer
```
git clone https://github.com/radapter/iTravel.git
cd iTravel
```

## Install project dependencies and run server
Install node.js dependencies
```
cd server
npm install
```
Manually run the server
```
node bin/www
```

## Install dependencies for front-end, build project and run development server
All in one command:
```
gulp
```
A development server will be up and running; any time any file changes it will auto restart.


## Run Tests
Run test
```
mocha
```

Run a specific test, e.g. run utils_spec.js under test/ folder
```
mocha test/utils_spec.js
```

# Workflow
## Version control and branching
This project will follow the Git braching model describe in this [post](http://nvie.com/posts/a-successful-git-branching-model/). Here is a brief description of the key points in this branching workflow:

- The `master` branch is always in a production-ready state, and it is not meant to be updated frenquenly. Avoid committing any code to this branch except when new releases are ready.
- Use `develop` as the main line of development and the code base that everyone shares. The `develop` branch should represent a edging version of the code with new features that are added since last release and are under active development.
- Create a feature branch named `feature/x` for each feature or topic you are working on. For example, if you are implementing user login UI, create a branch called `feature/login-ui` from `develop`. When the feature is finished, merge it back to `develop` so other developers can see the changes and resolve conflicts as needed.
- Sync the `feature/x` branches with `develop` branch frequently (by merging or rebasing the feature branch to `develop`) to avoid potential hard-to-resolve conflicts in future.
- Delete the feature branch that are no longer needed, for example when the feature is completed and already merged back to `develop`, to keep the project branche structure clean and reflect the current progress.
- When the code in `develop` branch is ready for the next release, merge it back to `master`. Optionally create a `release` branch and run tests thoroughly on a staging server before merging it to `master`.
- To fix urgent bugs on deployed code, create a `hotfix/x` branch directly from `master` branch; fix the bug, carefully test the code then merge the `hotfix` back to `master`.

## Steps to update your working branch with new changes made by others
1. checkout the latest develop branch from remote repo(GitHub)
```
git checkout develop
git pull origin
```
2. merge the latest develop to your working branch
```
git checkout feature/xxx
git merge develop
```
Alternatively, use rebase instead of merge for cleaner commit history. Unlike merge, rebase can rewrites commit history, so be very careful and follow the [golden rules of rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/workflow-walkthrough)
In case of code conflicts, resolve them carefully because when you merge your changes back to `develop`, other people's work may be corrupted and things will break. A good practice is to always discuss with the author of the code that causes conflicts before you resolve them. Again, sync feature branches with remote `develop` frenquently because the longer a branch is isolated the more likely it will have hard-to-resolve conflicts.
3. install npm packages
your teammates may have added new dependencies to package.json, make sure you run
```
npm install
```
before you move on.
4. install front-end depedencies and build the project
```
gulp
```

# Introduction to front-end package management and assest build system
## Bower
[Bower](http://bower.io/) is a node module for package management; bower to front-end packages is like what npm for the node.js packages. Most popular open source projects on GitHub offer an option to be installed with Bower, for example, install JQuery with Bower using command line:

```
bower install jquery --save
```

If you need to add a 3rd party library to this project, consider use bower instead of manually download it from GitHub because it works hand in hand with the build system.

## Gulp - the build system for workflow automation
[Gulp](http://gulpjs.com/) automate the build process of the project - it runs tasks such as compile scss to css, combine and minify css/js files, automatically inject js/css files installed with Bower into html/ejs pages etc. There are gulp plugins on npm that virtually cover all types of tasks.
There are might be an overhead to learn Gulp in the beginning, but a build tool really simplifies a developer's workflow and brings benefits to project.
You can browse the gulp tasks of this project in the file `gulpfile.js`. More Gulp tasks(auto-testing, minification etc) will be add to the project later.

# IMPORTANT NOTES
- never commit any confidentials (for example, AWS username/password, DB connection username/password) whether it is in documentations or IN THE CODE. GitHub is public and people are scanning these confidentials. Someone I knew committed his AWS confidentials as part of the API call code to GitHub and got a bill of hundreds of dollars from AWS in a month. Solution: put all confidential infomation in a configuration file and export it as a node module. Make sure to add it to .gitignore. When you need username/password in your code, for example for DB connection, just do `require('your_confidentials.js')`
- never make changes to the files under `server/build` folder; these files are temporary and will be cleaned in each build. Instead, edit the files under `/server/public` and run `gulp` to rebuild the `build` directory.