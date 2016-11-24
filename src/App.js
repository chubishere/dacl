import React, { Component } from 'react';
import Graph from './Graph.js';
import {ObjectEach} from './Helpers.js';
import './App.css';

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			projects: {
				'p1': {
					studies: {
						'A': { roles: {} },
						'B': { roles: {} },
					}
				},
				'p2': {
					studies: {
						'C': { roles: {} },
						'D': { roles: {} },
					}
				}
			}
		}
	}

	onBlock(project){
		this.state.projects[project].blocked = !this.state.projects[project].blocked;
		this.setState(this.state);
	}

	onDelete(project){
		this.state.projects[project].deleted = !this.state.projects[project].deleted;
		this.setState(this.state);
	}

	onRoleChange(project, study, role){
		this.state.projects[project].studies[study].roles[role] = !this.state.projects[project].studies[study].roles[role];
		this.setState(this.state);
	}

	lookup(project, study, role){
		return this.state.projects[project].studies[study].roles[role];
	}

	trHash(obj, callback){
		let items = [];
		Object.keys( obj ).map((item)=>{
			items.push( callback( {title: item, studies: obj[item]['studies'] } ) );
		})
		return items
	}

  render() {
    return (
      <div className="app">
				<table>
					<tr>
						<td colSpan="5">User: Fred</td>
					</tr>
					<tr>
						<td rowSpan="2">Project</td>
						<td rowSpan="2" className="eq-width header-study">Study</td>
						<td colSpan="3" className="text-center">Roles</td>
					</tr>
					<tr>
						<td className="eq-width header-admin">Admin</td>
						<td className="eq-width header-researcher">Researcher</td>
						<td className="eq-width header-observer">Observer</td>
					</tr>

					{ObjectEach(this.state.projects, (p)=>
					<tr>
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
							{ObjectEach(p.studies, (s)=>
								<tr>
									<td className="eq-width">{s.title}</td>
									{['admin', 'researcher', 'observer'].map((r)=>
										<td className="eq-width">
											<input 
												type="checkbox" 
												onClick={this.onRoleChange.bind(this, p.title, s.title, r)} 
												checked={this.lookup(p.title, s.title, r)}
											/>
										</td>
									)}
								</tr>
							)}
							</table>
						</td>
					</tr>
					)}

				</table>
      </div>
    );
  }
}

export default App;
