import React, { Component } from 'react';
import _ from 'lodash';
import './Graph.css';

class Graph extends Component {

	buildUser(user){
		return (
			<div className="graph-block">
				<h1>User</h1>
				<ul>
					<li>Email: {user.email}</li>
					<li>
						{this.buildAccounts(user)}
					</li>
				</ul>
			</div>
		);
	}

	buildAccounts(user){
		return (
			<div className="graph-block">
				<h1>Accounts</h1>
				<ol>
					{user.clients.map( (c) =>
					<li key={c.id}>
						Client: {c.name}<br/>
						Password: "{c.password}"<br/>
						{this.buildProfiles(user, c)}
					</li>
					)}
				</ol>
			</div>
		);
	}

	buildProfiles(user, client){
		return (
			<div className="graph-block">
				<h1>Profiles</h1>
				<ol>
				{this.getPidRoles(client).map( (i) =>
					<li className="graph-block" key={i.pid}>
						Pid:{i.pid} <br/>
						Roles: {i.roles.join(', ')}
					</li>
				)}
				</ol>
			</div>
		);
	}

	/**
	 * @return {Object} a project object containing studies with at least one role allocated
	 */
	getPidRoles(client){
		let pids = [];

		// client
		if( client.roles.length ){
			pids.push( {
				pid: [client.id, 0, 0].join('-'),
				roles: client.roles
			} );
		}

		// projects
		let projects = _.cloneDeep( client.projects );
		_.each( projects, (p) =>{

			if( (p.roles || [] ).length ){
				pids.push( {
					pid: [client.id, p.id, 0].join('-'),
					roles: p.roles
				} );
			}

			// studies
			// remove studies without role allocations
			p.studies = p.studies.filter( (s) => s.roles.length );
			// create a pid for studies with role allocations
			_.each( p.studies, (s) => {
				let pid = [client.id, p.id, s.id].join('-');
				pids.push( {pid: pid, roles: s.roles} );
			})

		});
		return pids;
	}

  render() {
    return (
			<div className="graph">
				{this.buildUser(this.props.user)}
			</div>
		);
	}
}

export default Graph;
