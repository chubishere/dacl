import React, { Component } from 'react';
import _ from 'lodash';
import './Acl.css';

class Acl extends Component {

  render() {
    return (
			<div className="acl">
				<div className="acl__clients">
					<div className="acl__client">
						<div className="acl__client__details">
							<h1>Client A</h1>
							{['admin', 'researcher', 'observer'].map( (r) =>
							<label key={r}>
								<input type="checkbox" 
									onClick={this.props.onRoleChange.bind(this, 'A', 'client', r)}
									checked={this.props.lookup('A', 'client', r)} 
								/>&nbsp;{r}</label>
							)}
						</div>
					</div>
				</div>

				{this.renderProjects(this.props.user.clients[0])}

			</div>
		);
	}

	renderProjects(client){
		return (
			<div className="acl__projects">
				{client.projects.map( (p) =>
				<div className="acl__project" key={p.title}>
					<div className="acl__project__details">
					<h1>Project {p.title}</h1>
					{['admin', 'researcher', 'observer'].map( (r) =>
					<label key={r}>
						<input type="checkbox" 
							onClick={this.props.onRoleChange.bind(this, p.title, 'project', r)}
							checked={this.props.lookup(p.title, 'project', r)} 
						/>&nbsp;{r}</label>
					)}
					</div>

					{this.renderStudies(p)}

				</div>
				)}
			</div>
		)
	}

	renderStudies(project){
		return (
			<div className="acl__studies">
				{project.studies.map( (s) =>
				<div className="acl__study">
					<div className="acl__study__details" key={s.title}>
						<h1>Study {s.title}</h1>
							{['admin', 'researcher', 'observer'].map((r)=>
								<label key={r.title}>
								<input 
									type="checkbox" 
									onClick={this.props.onRoleChange.bind(this, project.title, s.title, r)} 
									checked={this.props.lookup(project.title, s.title, r)}
								/>
								{r}
								</label>
							)}
					</div>
				</div>
				)}
			</div>
		)
	}
}

export default Acl;
