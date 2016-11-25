import React, { Component } from 'react';
import _ from 'lodash';
import Graph from './Graph.js';
import Acl from './Acl.js';
import UsersList from './UsersList.js';
import DataUsers from './DataUsers.js';
import './App.css';

class App extends Component {

	constructor(props){
		super(props);
		this.state = DataUsers;
	}

	onBlock(project){
		//this.state.projects[project].blocked = !this.state.projects[project].blocked;
		//this.setState(this.state);
	}

	onDelete(project){
		//this.state.projects[project].deleted = !this.state.projects[project].deleted;
		//this.setState(this.state);
	}

	onRoleChange(project, study, role){
		// copy state
		let state = JSON.parse( JSON.stringify( this.state ) );

		// update state
		let target = state.users[0].clients[0];
		let p = _.findIndex( target.projects, (o) => o.title === project );

		if( study === 'project' ){
			target.projects[p].access_any_study = !target.projects[p].access_any_study;
			this.setState(state);
			return;
		}

		let s = _.findIndex( target.projects[p].studies, (o) => o.title === study )
		let r = target.projects[p].studies[s].roles;
		let rIndex = r.indexOf( role );
		if( rIndex >= 0 ) { 			//if role exists, remove it
			r.splice( rIndex, 1 );
		}else{ 										//otherwise add it
			r.push( role );
		}

		this.setState(state);
	}

	lookup(project, study, role){
		if( project ) {
			var p = _.find( this.state.users[0].clients[0].projects, (o) => o.title === project );

			if( study === 'project' ){
				return p.access_any_study;
			} else {
				var s = _.find( p.studies, (o) => o.title === study );
				return s.roles.indexOf(role) !== -1;
			}
		}
		return;
	}

  render() {
    return (
      <div className="app">

				<Graph className="graph" user={this.state.users[0]}/>

				<div>
				<UsersList users={this.state.users} />
				<Acl user={this.state.users[0]}
					onRoleChange={this.onRoleChange.bind(this)}
					lookup={this.lookup.bind(this)}
				/>
				</div>

      </div>
    );
  }
}

export default App;
