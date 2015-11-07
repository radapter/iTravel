// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('iTravelApp', ['ionic', 'ngMap', 'underscore', 'ion-autocomplete', 'ionic-datepicker',
    'iTravelApp.controller.account',
    'iTravelApp.controller.home',
    'iTravelApp.controller.plans',
    'iTravelApp.controller.planDetail',
    'iTravelApp.controller.login',
    'iTravelApp.controller.signup',
    'iTravelApp.controller.help',
    'iTravelApp.controller.venue',
    'iTravelApp.service.activity',
    'iTravelApp.service.plan',
    'iTravelApp.service.user',
    'iTravelApp.service.venue',
    'iTravelApp.service.httpInterceptor',
    'iTravelApp.filter.getDestNameInitial'
]).constant('host', 'https://radapter-itravel.herokuapp.com/')

.constant('ApiEndpoint', {
        //url: 'http://localhost:8100/api/google-map' //not working on device
        url: 'https://maps.googleapis.com/maps/api' //not working on chrome, working on device, can't use get current location
    })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('help', {
    url: '/help',
    templateUrl: 'templates/help.html',
    controller: 'HelpCtrl'
  })

  // Each tab has its own nav history stack:
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.plans', {
    url: '/plans',
    views: {
      'tab-plans': {
        templateUrl: 'templates/tab-plans.html',
        controller: 'PlansCtrl'
      }
    }
  })

  .state('tab.plan-detail', {
    url: '/plans/:id',
    views: {
      'tab-plans': {
        templateUrl: 'templates/plan-detail.html',
        controller: 'PlanDetailCtrl'
      }
    }
  })

  .state('tab.venue', {
    url: '/plans/:id/venue/:v_id',
    views: {
      'tab-plans': {
        templateUrl: 'templates/venue.html',
        controller: 'VenueCtrl'
      }
    }
  })

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'SignupCtrl'
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

  $httpProvider.interceptors.push('httpInterceptor');

  $ionicConfigProvider.backButton.previousTitleText(false).text('');

})

.run(['User', function(User) {
    // detect if there is valid user token upon app start, and load user data if there is one
    User.restore(true);
}]);
