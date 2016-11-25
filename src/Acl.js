import React, { Component } from 'react';
import _ from 'lodash';
import './Acl.css';

class Acl extends Component {
  render() {
    return (
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
						<td className="eq-width text-top-cell" rowSpan="3">C1</td>
					</tr>

					{this.props.user.clients[0].projects.map( (p) =>
					<tr key={p.title}>
						<td className="text-top-cell">
							{p.title} 
							<br/>

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
												onClick={this.props.onRoleChange.bind(this, p.title, s.title, r)} 
												checked={this.props.lookup(p.title, s.title, r)}
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
		);
	}
}

export default Acl;
