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

				<Graph className="graph app__left" user={this.state.users[0]}/>

				<div className="app__right">
					<UsersList users={this.state.users} />
					<AclVertical 
						user={this.state.users[0]}
						roles={this.state.roles}
						onRoleChange={this.onRoleChange.bind(this)}
						lookup={this.lookup.bind(this)}
					/>
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

	//onRoleChange(project, target, role){
	onRoleChange(userEmail, cpsName, cpsType, role){
		// copy state
		let state = JSON.parse( JSON.stringify( this.state ) );

		// find user
		let user = _.find( state.users, (u) => u.email === userEmail );
		if( !user ) return false;

		let hasRole = (x) => ((x || {}).roles || []).indexOf( role ) > -1;
		var target;

		// find client
		if( cpsType === 'client' ){
			target = user.clients.filter( (c) => c.name === cpsName )[0] || target;
		}

		// find project
		if( cpsType === 'project' ){
			let clientMatched;
			let projectMatched;
			user.clients.forEach( (c) => {
				target = c.projects.filter( (p) => p.name === cpsName )[0] || target;
			});
		}

		// find study
		if( cpsType === 'study' ){
			let clientMatched;
			let projectMatched;
			user.clients.forEach( (c) => {
				c.projects.forEach( (p) => {
					target = p.studies.filter( (s) => s.name === cpsName )[0] || target;
				})
			});
		}

		if( !target ) return;
		if( hasRole(target) ){
			target.roles.splice( target.roles.indexOf(role), 1 );
		}else{
			target.roles = target.roles || [];
			target.roles.splice( target.roles.push(role) );
		}

		this.setState(state);
	}

	lookup(userEmail, cpsName, cpsType, role) {

		let user = _.find( this.state.users, (u) => u.email === userEmail );
		if( !user ) return false;

		let client, project, study;
		console.log( client );

		let hasRole = (x) => ((x || {}).roles || []).indexOf( role ) > -1;

		if( cpsType === 'client' ) {
			client = user.clients.filter( (x) => x.name === cpsName )[0] || client;
			return hasRole(client);
		}

		if( cpsType === 'project' ) {
			user.clients.forEach( (c) => {
				if( project ) return;
				project = c.projects.filter( (x) => x.name === cpsName )[0] || project;
				client = project? c : null;
			});
			return hasRole(project) || hasRole(client);
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
			return hasRole(study) || hasRole(project) || hasRole(client);
		}
	}

	getRolesText(){
		return this.state.roles.join(', ');
	}

	onRoleDefinitionChange(a, b, c){
		this.setState( {'roles': a.target.value.replace(/[^-_a-z,]*/m, '').split(',') } );
	}
}

export default App;
