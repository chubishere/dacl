import React, { Component } from 'react';
import _ from 'lodash';
import Graph from './Graph.js';
import AclVertical from './AclVertical.js';
import UsersList from './UsersList.js';
import DataUsers from './DataUsers.js';
import DataRoles from './DataRoles.js';
import './App.css';

class App extends Component {

	constructor(props){
		super(props);
		this.state = { 
			users: DataUsers,
			roles: DataRoles,
		}
	}

  render() {
    return (
      <div className="app">

				<div className="settings">
					<label>Roles:</label><input type="text" defaultValue={this.getRolesText()} onKeyUp={this.onRoleDefinitionChange.bind(this)}/>
				</div>

				<div className="app__left">
					<h2>Me:</h2>
					<AclVertical 
						user={this.state.users[0]}
						roles={this.state.roles}
						onRoleChange={this.onRoleChange.bind(this)}
						getRoleState={this.getRoleState.bind(this)}
					/>
				</div>

				<div className="app__right">
					<h2>Another user:</h2>
					<AclVertical 
						user={this.state.users[1]}
						roles={this.state.roles}
						onRoleChange={this.onRoleChange.bind(this)}
						getRoleState={this.getRoleState.bind(this)}
					/>
					<div className="hidden">
						<Graph className="graph app__left" user={this.state.users[0]}/>
					</div>
					<div className="hidden">
						<UsersList users={this.state.users} />
					</div>
				</div>

      </div>
    );
  }

	onBlock(project){
		//this.state.projects[project].blocked = !this.state.projects[project].blocked;
		//this.setState(this.state);
	}

	onDelete(project){
		//this.state.projects[project].deleted = !this.state.projects[project].deleted;
		//this.setState(this.state);
	}

	onRoleChange(userEmail, cpsName, cpsType, role){
		// copy state
		let state = JSON.parse( JSON.stringify( this.state ) );

		// find user
		let user = _.find( state.users, (u) => u.email === userEmail );
		if( !user ) return false;

		// logic we'll be reusing
		let hasRole = (x) => ((x || {}).roles || []).indexOf( role ) > -1;
		var target;

		// find client and set as target
		if( cpsType === 'client' ){
			target = user.clients.filter( (c) => c.name === cpsName )[0] || target;
		}

		// find project and set as target
		if( cpsType === 'project' ){
			let clientMatched;
			let projectMatched;
			user.clients.forEach( (c) => {
				target = c.projects.filter( (p) => p.name === cpsName )[0] || target;
			});
		}

		// find study and set as target
		if( cpsType === 'study' ){
			let clientMatched;
			let projectMatched;
			user.clients.forEach( (c) => {
				c.projects.forEach( (p) => {
					target = p.studies.filter( (s) => s.name === cpsName )[0] || target;
				})
			});
		}

		// update the target
		if( !target ) return;
		if( hasRole(target) ){
			target.roles.splice( target.roles.indexOf(role), 1 );
		}else{
			target.roles = target.roles || [];
			target.roles.splice( target.roles.push(role) );
		}

		// if membership reduced, clear out roles no longer in scope
		if( false && role === 'member' && target.roles.indexOf(role) === -1 ) {

				target.roles = [];

				switch( cpsType ){
					case 'client':
						target.roles = [];
						target.projects.forEach( (p) => {
							p.roles = [];
							p.studies.forEach( (s) => {
								s.roles = [];
							});
						});
						break;
					case 'project':
						if( target.roles.indexOf(role) !== -1) break;
						target.roles = [];
						target.studies.forEach( (s) => {
							s.roles = [];
						});
						break;
					case 'study':
						// no further action
					default:
				}
		}

		// update state
		this.setState(state);
	}

	getRoleState(userEmail, cpsName, cpsType, role) {

		let user = _.find( this.state.users, (u) => u.email === userEmail );
		if( !user ) return 'empty';

		let client, project, study;
		let out;

		let hasRole = (x, roleName) => ((x || {}).roles || []).indexOf( roleName || role ) > -1;

		if( cpsType === 'client' ) {
			client = user.clients.filter( (x) => x.name === cpsName )[0] || client;
			if( role !== 'member' && !hasRole(client, 'member') ){
				return hasRole(client)? 'no-membership-manual': 'no-membership-empty';
			}
			if( hasRole(client) ) {
				return 'manual';
			}
		}

		if( cpsType === 'project' ) {
			user.clients.forEach( (c) => {
				if( project ) return;
				project = c.projects.filter( (x) => x.name === cpsName )[0] || project;
				client = project? c : null;
			});
			if( role !== 'member' && !hasRole(project, 'member') && !hasRole(client, 'member') ){
				if( hasRole(project) ) return 'no-membership-manual';
				if( hasRole(client) )  return 'no-membership-inherited';
				return 'no-membership-empty';
			}
			if( hasRole(client) ){
				return 'inherited';
			}
			if( hasRole(project) ){
				return 'manual';
			}
		}

		if( cpsType === 'study' ) {
			user.clients.forEach( (c) => {
				if( study ) return;
				c.projects.forEach( (p) => {
					if( study ) return;
					study = p.studies.filter( (x) => x.name === cpsName )[0] || study;
					project = study? p: null;
					client = study? c: null;
				});
			});
			if( role !== 'member' && !hasRole(study, 'member') && !hasRole(project, 'member') && !hasRole(client, 'member') ){
				if( hasRole(study) ) 	 return 'no-membership-manual';
				if( hasRole(project) ) return 'no-membership-inherited';
				if( hasRole(client) )  return 'no-membership-inherited';
				return 'no-membership-empty';
			}
			if( hasRole(project) || hasRole(client) ) {
				return 'inherited';
			}
			if( hasRole(study) ){
				return 'manual';
			}
		}

		return 'empty';
	}

	getRolesText(){
		return this.state.roles.join(', ');
	}

	onRoleDefinitionChange(a, b, c){
		this.setState( {'roles': a.target.value.replace(/[^-_a-z,]*/m, '').split(',') } );
	}
}

export default App;
