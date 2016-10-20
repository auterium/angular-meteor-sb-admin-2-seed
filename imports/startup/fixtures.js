import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';

Meteor.startup(() => {
	if(Meteor.users.find().count()===0) {
		const _id = Accounts.createUser({
			username: 'admin',
			password: 'admin'
		});

		Roles.addUsersToRoles(_id, ['admin']);

		Meteor.users.update(_id, {$set: {active: true, profile: {name: 'Administrator'}}});
	}
});
