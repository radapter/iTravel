# iTravel
iTravel: Personal and Adaptive Tour Guide

CMPE 295 Master's project at SJSU for Jennifer Wu, Xiaoli Jiang, Tuo Lei, and Yulin Ye

## Team Members
Jennifer Wu: jenn.j.wu@gmail.com

Xiaoli Jiang: jiangxiaoli1104@gmail.com

Yulin Ye: yulinye.yy@gmail.com

Tuo Lei: leituo56@gmail.com

## Quick Start Guide

### 1. Install node and npm
- Make sure you have [node](https://nodejs.org/) and [npm](https://github.com/npm/npm) installed. 
- Run following commands to check if they are properly installed on your computer if you are not sure:

 - ```node --version```
 - ```npm --version```

### 2. Install global node packages with npm
- ```npm install -g bower gulp mocha```

### 3. Clone project repo to your computer
- ```git clone https://github.com/radapter/iTravel.git```

- ```cd iTravel```

### 3. Install project dependencies

- Install node.js dependencies
 - ```cd server```
 - ```npm install```


### 4a. Run server
- Manually run the server:
 - `node bin/www`

### 4b. Or, install dependencies for front-end, build project and run development server all in one command:
- `gulp`

 - A development server will be started automatically and restarted automatically any there are file changes.


## Testing
- Run tests using:
 - `mocha`

- Run a specific test (e.g. run utils_spec.js under test/ folder)
 - `mocha test/utils_spec.js`

## Workflow
### Version control and branching
This project will follow the Git braching model describe in this [post](http://nvie.com/posts/a-successful-git-branching-model/). Here is a brief description of the key points in this branching workflow:

- The `master` branch is always in a production-ready state, and it is not meant to be updated frequently. Avoid committing any code to this branch except when new releases are ready.
- Use `develop` as the main line of development and the code base that everyone shares. The `develop` branch should represent a edging version of the code with new features that are added since last release and are under active development.
- Create a feature branch named `feature/x` for each feature or topic you are working on. For example, if you are implementing user login UI, create a branch called `feature/login-ui` from `develop`. When the feature is finished, merge it back to `develop` so other developers can see the changes and resolve conflicts as needed.
- Sync the `feature/x` branches with `develop` branch frequently (by merging or rebasing the feature branch to `develop`) to avoid potential hard-to-resolve conflicts in the future.
- Delete the feature branches that are no longer needed, such as when the feature is completed and already merged back to `develop`, to keep the project branch structure clean and reflect the current progress.
- When the code in `develop` branch is ready for the next release, merge it back to `master`. Optionally, create a `release` branch and run tests thoroughly on a staging server before merging it to `master`.
- To fix urgent bugs for deployed code, create a `hotfix/x` branch directly from `master` branch, fix the bug, carefully test the code, then merge the `hotfix` back to `master`.

## Git Steps
1. Checkout the latest develop branch from remote repo(GitHub)
 - ```git checkout develop```
 - ```git pull origin```

2. Merge the latest develop branch into your working branch
 - ```git checkout feature/xxx```
 - ```git merge develop```

 - Alternatively, use rebase instead of merge for cleaner commit history. Unlike merge, rebase can rewrites commit history, so be very careful and follow the [golden rules of rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/workflow-walkthrough)
In case of code conflicts, resolve them carefully because when you merge your changes back to `develop`, other people's work may be corrupted and things will break. A good practice is to always discuss with the author of the code that causes conflicts before you resolve them. Again, sync feature branches with remote `develop` frenquently because the longer a branch is isolated the more likely it will have hard-to-resolve conflicts.


3. Install any new npm packages
 - New dependencies may have been added to package.json, so make sure to run
`npm install` first.

4. Install front-end dependencies and build the project using: ```gulp```

## Bower and Gulp
### Bower
[Bower](http://bower.io/) is a node module for package management; bower to front-end packages as npm is to node.js packages. Most popular open source projects on GitHub offer an option to be installed via Bower. For example, jQuery can be installed with Bower using the command:

```bower install jquery --save```

Note: the `--save` adds the dependency to the `bower.json` file and allows others to pick up the new dependencies when running `gulp`.

If adding a 3rd party library to this project, consider use `bower` instead of manually downloading it to work better with the build system.

### Gulp
[Gulp](http://gulpjs.com/) is the build system for workflow automation.

It automates the build process of the project - it runs tasks such as compiling scss to css, combining and minifying css and js files, automatically injecting js and css files installed via Bower into html or ejs pages, etc. 

There are gulp plugins on `npm` that virtually cover all types of tasks. There are might be an overhead to learn Gulp in the beginning, but a build tool really simplifies a developer's workflow and brings benefits to project.

The gulp tasks of this project can be found in the file `gulpfile.js`. More Gulp tasks (auto-testing, minification, etc.) will be added to the project at a later time.


## Flat UI Kit Free
[Flat UI Kit Free](http://designmodo.github.io/Flat-UI/#) is a Twitter Bootstrap Framework design and Theme, this responsive framework includes a PSD and HTML version.

Please refer the [elements and color swatches] (http://designmodo.github.io/Flat-UI/docs/components.html#fui-progress) when you design pages. 

# IMPORTANT NOTES
- Never commit any confidential credentials (for example, AWS username/password, DB connection username/password) be it in the documentation or IN THE CODE. 
- GitHub is public and people scan for these confidential credentials to abuse them. Someone I knew committed his AWS confidentials as part of the API call code to GitHub and got a bill for hundreds of dollars from AWS within a month. 
- Solution: put all confidential infomation in a configuration file and export it as a node module. Make sure to add it to .gitignore. When you need to use username/password in your code (such as for DB connection), just use `require('your_confidentials.js')`
- Never make changes to the files under `server/build` folder. These files are temporary and will be cleaned after each build. Instead, edit the files under `/server/public` and run `gulp` to rebuild the `build` directory.

