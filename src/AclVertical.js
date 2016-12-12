import React, { Component } from 'react';
import _ from 'lodash';
import './AclVertical.css';

class AclVertical extends Component {

  render() {
    return (
			<div className="acl-vertical">
				<table>

					{this.renderRoles(this.props.roles)}

					{this.renderClients(this.props.user.clients)}

				</table>
			</div>
		);
	}

	renderRoles(roles){
		return (
			<thead>
				<tr className="acl-vertical__roles">
					<td></td>
					{roles.map( (r) =>
					<td>{_.upperFirst(r)}</td>
					)}
				</tr>
			</thead>
		)
	}

	renderClients(clients){
		return (
			<tbody>
				{this.flattenAcl(clients).map( (i) =>
					<tr 
						key={i.type+'-'+i.name}
						className={'acl-vertical__'+i.type}
						>
						<td>{_.upperFirst(i.type)} {_.upperFirst(i.name)}</td>
						{this.props.roles.map( (r) =>
						<td key={r}>
							<input type="checkbox" 
								onClick={this.props.onRoleChange.bind(this, this.props.user.email, i.name, i.type, r)}
								checked={this.props.lookup(this.props.user.email, i.name, i.type, r)} 
							/>
						</td>
						)}
					</tr>
				)}
			</tbody>
		)
	}

	flattenAcl(clients){
		let acl = [];
		clients.forEach( (c) => {
			acl.push({ 
				name:  c.name,
				type:  'client',
			});
			c.projects.forEach( (p) => {
				acl.push({ 
					name:  p.name,
					type:  'project',
				});
				p.studies.forEach( (s) =>
					acl.push({ 
						name:  s.name,
						type:  'study',
					})
				)
			})
		});
		return acl
	}

}

export default AclVertical;
