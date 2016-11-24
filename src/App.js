import React, { Component } from 'react';
import _ from 'lodash';
import Graph from './Graph.js';
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
				<table className="acl">
				<tbody>
					<tr>
						<td rowSpan="2">Client</td>
						<td rowSpan="2">Project</td>
						<td rowSpan="2" className="eq-width header-study">Study</td>
						<td colSpan="3" className="text-center">Roles</td>
					</tr>
					<tr>
						<td className="eq-width header-admin">Admin</td>
						<td className="eq-width header-researcher">Researcher</td>
						<td className="eq-width header-observer">Observer</td>
					</tr>

					<tr>
						<td className="eq-width client" rowSpan="3">C1</td>
					</tr>

					{this.state.user.clients[0].projects.map( (p) =>
					<tr key={p.title}>
						<td>
							{p.title} 
							<br/>

							<label>
							<input type="checkbox" onClick={this.onBlock.bind(this, p)} value={p.blocked}/>
							Block
							</label>
							<br/>

							<label>
							<input type="checkbox" onClick={this.onDelete.bind(this, p)} value={p.blocked}/>
							Delete
							</label>
						</td>
						<td colSpan="4" className="table-inside">
							<table>
							<tbody>
							{p.studies.map( (s) =>
								<tr key={s.title}>
									<td className="eq-width">{s.title}</td>
									{['admin', 'researcher', 'observer'].map((r)=>
										<td className="eq-width" key={r}>
											<input 
												type="checkbox" 
												onClick={this.onRoleChange.bind(this, p.title, s.title, r)} 
												checked={this.lookup(p.title, s.title, r)}
											/>
										</td>
									)}
								</tr>
							)}
							</tbody>
							</table>
						</td>
					</tr>
					)}

				</tbody>
				</table>
      </div>
    );
  }
}

export default App;
