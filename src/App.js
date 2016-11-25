import React, { Component } from 'react';
import _ from 'lodash';
import Graph from './Graph.js';
import Acl from './Acl.js';
import './App.css';

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			user: {
				email: 'fred@dad.com',
				clients: [
					{
						id: 1,
						name: 'C1',
						password: 'fredpass',
						projects: [
							{
								id: 1,
								title: 'P1',
								studies: [
									{ id: 1, title: 'A', roles: [] },
									{ id: 2, title: 'B', roles: [] },
								]
							},
							{
								id: 2,
								title: 'P2',
								studies: [
									{ id: 1, title: 'C', roles: []},
									{ id: 2, title: 'D', roles: []},
								]
							}
						]
					}
				]
			}
		}
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
		let target = state.user.clients[0];
		let p = _.findIndex( target.projects, (o) => o.title === project );
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
		var p = _.find( this.state.user.clients[0].projects, (o) => o.title === project );
		var s = _.find( p.studies, (o) => o.title === study );
		return s.roles.indexOf(role) !== -1;
	}

  render() {
    return (
      <div className="app">

				<Graph className="graph" user={this.state.user}/>

				<Acl user={this.state.user}
					onRoleChange={this.onRoleChange.bind(this)}
					lookup={this.lookup.bind(this)}
				/>

      </div>
    );
  }
}

export default App;
