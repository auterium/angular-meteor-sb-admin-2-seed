import angular from 'angular';

import {Meteor} from 'meteor/meteor';

import templateUrl from './template.html';

class NavigationController {
	constructor($scope, $reactive, $state) {
		$reactive(this).attach($scope);

		this.$state = $state;
	}

	logout() {
		Meteor.logout(() => {
			this.$state.go('login.login');
		});
	}
}

const name = 'app.navigation';

export default name;

angular.module(name, [])
.component('navigation', {
	templateUrl,
	controllerAs: 'nav',
	controller: ['$scope', '$reactive', '$state', NavigationController]
});
