import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import uiRouter from 'angular-ui-router';
import 'angular-ui-bootstrap';
import angularPassword from '../modules/angular-password.js';

import Filters from '../filters';
import Login from './login';
import Navigation from './navigation';
import Dashboard from './dashboard';
import Users from './users';

import templateUrl from './template.html';

const name = 'app';

export default name;

angular.module(name, [
	angularMeteor
	, angularMeteorAuth
	, uiRouter
	, 'ui.bootstrap'
	, angularPassword
	, Filters
	, Login
	, Navigation
	, Dashboard
	, Users
])
.config(['$locationProvider', '$urlRouterProvider', '$stateProvider', ($locationProvider, $urlRouterProvider, $stateProvider) => {
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);

	$stateProvider.state('app', {
		abstract: true,
		url: '',
		templateUrl,
		resolve: {
			currentUser: ['$auth', $auth => {
				return $auth.awaitUser();
			}]
		}
	});
}])
.run(['$rootScope', '$state', ($rootScope, $state) => {
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		switch(error) {
			case 'AUTH_REQUIRED':
				return $state.go('login.login');
			case 'FORBIDDEN':
				return $state.go('error.403');
			case 'NOT_FOUND':
				return $state.go('error.404');
		}

		$state.go('error.500');
	});
}]);
