import React, { Component } from 'react';
import Reports, { ReportsMetaData } from './Reports';
import SABForm, { SABFormMetaData } from './SABForm';
import Header from './Header';
import Sidebar from './Sidebar';

export default class LoggedIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: null
		};
	}

	componentDidMount() {
		this.props.lock.getProfile(this.props.idToken, (err, profile) => {
			if(err) {
				console.log("Error loading the Profile", err);
			}
			if(!profile.email.endsWith("@umich.edu") || profile.email_verified == "false") {
				console.log("Your login credentials are not allowed access.", err);
				window.location.href = "http://localhost:3000";
			}
			this.setState({
				profile: profile
			});
		});
	}

	getHeaderComponent() {
		return <Header profile={this.state.profile} currentView={this.props.currentView} />
	}

	getSidebarComponent() {
		return <Sidebar currentView={this.props.currentView} handleViewChange={this.props.handleViewChange} />
	}

	getReportsComponent() {
		return <Reports profile={this.state.profile} />
	}

	getSABFormComponent() {
		return (
			<SABForm
				profile={this.state.profile}
				handleFormInputChange={this.props.handleFormInputChange}
				handleFormSubmit={this.props.handleFormSubmit}
				formData={this.props.formData.sabForm}
			/>
		);
	}

	getPaths(paths) {
		return paths.map((path) => {
			return (
				<li key={path.ID}>
					{(path.ID == 1) && <i className="icon-home"></i>}
					<span> {path.name}</span>
					<i className="fa fa-angle-right"></i>
				</li>
			);
		});
	}

	// The so called 'details' panel.
	getPageContent() {
		let view = this.props.currentView;

		return (
			<div className="page-content-wrapper">
			    <div className="page-content">
			        <h3 className="page-title"> {view.name}<small> - {view.description}</small></h3>
			        <div className="page-bar">
			            <ul className="page-breadcrumb">
			            	{this.getPaths(view.paths)}
			                <li>
			                	{(!view.paths.length) && <i className="icon-home"></i>}
			                    <span> {view.name}</span>
			                </li>
			            </ul>
			        </div>
			        {(view.name === ReportsMetaData.name) && this.getReportsComponent()}
			        {(view.name === SABFormMetaData.name) && this.getSABFormComponent()}
			    </div>
			</div>
		);
	}

	render() {
		// If the profile has not been loaded yet, notify the user.
		if(!this.state.profile) {
			return <h3>Logging in...</h3>
		}

		return (
			<div>
				{this.getHeaderComponent()}
				<div className="clearfix"></div>
				<div className="page-container">
					{this.getSidebarComponent()}
					{this.getPageContent()}
				</div>
			</div>
		);
	}
};
