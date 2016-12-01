import React, { Component } from 'react';
import _ from 'lodash';
import Graph from './Graph.js';
import Acl from './Acl.js';
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
					<Acl user={this.state.users[0]}
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

	onRoleChange(project, target, role){
		// copy state
		let state = JSON.parse( JSON.stringify( this.state ) );

		// update state
		let client = state.users[0].clients[0];

		if( target === 'client' ){
			client.roles = (client.roles || []);
			let index = client.roles.indexOf( role );
			if( index === -1 ) {
				client.roles.push( role );
			}else{
				client.roles.splice( index, 1 );
			}
			this.setState(state);
			return;
		}

		let p = _.findIndex( client.projects, (o) => o.title === project );

		if( target === 'project' ){
			client.projects[p].roles = (client.projects[p].roles || []);
			let index = client.projects[p].roles.indexOf( role );
			if( index === -1 ) {
				client.projects[p].roles.push( role );
			}else{
				client.projects[p].roles.splice( index, 1 );
			}
			this.setState(state);
			return;
		}

		let s = _.findIndex( client.projects[p].studies, (o) => o.title === target )
		let r = client.projects[p].studies[s].roles;
		let rIndex = r.indexOf( role );
		if( rIndex >= 0 ) { 			//if role exists, remove it
			r.splice( rIndex, 1 );
		}else{ 										//otherwise add it
			r.push( role );
		}

		this.setState(state);
	}

	lookup(project, target, role){
		var c = this.state.users[0].clients[0];
		if( target === 'client' ){
			return (c.roles || [] ).indexOf( role ) > -1;
		}

		if( project ) {
			var p = _.find( c.projects, (o) => o.title === project );

			if( target === 'project' ){
				return (p.roles || []).indexOf( role ) > -1;
			} else {
				var s = _.find( p.studies, (o) => o.title === target );
				return s.roles.indexOf(role) !== -1;
			}
		}
		return;
	}

	getRolesText(){
		return this.state.roles.join(', ');
	}

	onRoleDefinitionChange(a, b, c){
		this.setState( {'roles': a.target.value.replace(/[^-_a-z,]*/m, '').split(',') } );
	}
}

export default App;
