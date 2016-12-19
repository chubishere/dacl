import React, { Component } from 'react';
import _ from 'lodash';
import classname from 'classname';
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
						className={classname('acl-vertical__'+i.type, {'no-view-rights': !this.isViewable(i.name, i.type)})}
						>
						<td>{_.upperFirst(i.type)}&nbsp;{_.upperFirst(i.name).replace('-','_')}</td>
						{this.props.roles.map( (r) => {
							let roleState = this.props.getRoleState(this.props.user.email, i.name, i.type, r);
							let disabled = roleState.match(/^no-membership-(inherited|empty)|^inherited/m);
							return (<td key={r}
								className={roleState}
								onClick={disabled? null : this.props.onRoleChange.bind(this, this.props.user.email, i.name, i.type, r)}
							>
								<input type="checkbox" 
									checked={!roleState.match(/empty/)} 
									disabled={disabled}
								/>
							</td>
							)}
						)}
					</tr>
				)}
			</tbody>
		)
	}

	isViewable(cpsName, cpsType){
		if( !this.props.viewer ) return true;

		let viewerHasAdmin = !this.props.getRoleState( this.props.viewer.email, cpsName, cpsType, 'admin' ).match(/empty/);
		let viewerHasMembership = !this.props.getRoleState( this.props.viewer.email, cpsName, cpsType, 'membership' ).match(/empty/);
		let iHaveMembership = !this.props.getRoleState( this.props.user.email, 	cpsName, cpsType, 'member' ).match(/empty/);
		return viewerHasAdmin && iHaveMembership;
	}

	isDisabled(cpsName, cpsType, role){
		let roleState = this.props.getRoleState(this.props.user.email, cpsName, cpsType, role);
		if(  roleState === 'inherited' 
			|| roleState === 'no-membership'
		) {
			return true;
		}
		return false;
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
