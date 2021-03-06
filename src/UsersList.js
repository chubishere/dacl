import React, { Component } from 'react';
import _ from 'lodash';
import './UsersList.css';

class UsersList extends Component {

	getHavingRoles(){
		let users = this.props.users.filter( (u) => {
			let hasRole = false;
			_.each( u.clients, (c) => {
				if( (c.roles || []).length ) {
					hasRole = true; 
				}
				_.each( c.projects, (p) => {
					if( (p.roles || []).length )
						hasRole = true; 
					_.each( p.studies, (s) => {
						if( s.roles.length )
							hasRole = true;
					});
				});
			});
			return hasRole;
		});
		return users;
	}

  render() {
    return (
			<div className="users-list">
				<h1>Users:</h1>
				<ul>
				{this.getHavingRoles.bind(this)().map( (u) => 
					<li key={u.email}>{u.email}</li>
				)}
				</ul>
			</div>
		);
	}
}

export default UsersList;
