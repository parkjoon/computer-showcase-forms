import React, { Component } from 'react';
import Home from './Home';
import LoggedIn from './LoggedIn';
import { ReportsMetaData } from './Reports';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.handleViewChange = this.handleViewChange.bind(this);
		this.handleFormInputChange = this.handleFormInputChange.bind(this);
	}

	componentWillMount() {
		this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
		
		this.setState({
			idToken: this.getIdToken(),
			currentView: ReportsMetaData,
			formData: {
				sabForm: {
		            isMedicalStudent: "",
		            medicalSchoolCode: "",
		            phoneNumber: "",
		            subtotal: "",
		            tax: "",
		            total: "",
		            rmsTransaction: "",
		            register: "",
		            agreed: ""
				}
			}
		});
	}

	handleViewChange(newViewMetaData) {
		this.setState({
			currentView: newViewMetaData
		});
	}

	handleFormInputChange(formData) {
		console.log('Handling form input change in App.js');
		console.log(formData);
		this.setState({
			formData: formData
		});
	}

	getIdToken() {
		let idToken = localStorage.getItem('userToken');
		let authHash = this.lock.parseHash(window.location.hash);

		if(!idToken && authHash) {
			if(authHash.id_token) {
				idToken = authHash.id_token
				localStorage.setItem('userToken', authHash.id_token);
			}
			if(authHash.error) {
				console.log("Error signing in", authHash);
				return null;
			}
		}

		return idToken;
	}

	getLoggedOutComponent() {
		return (
			<Home
				lock={this.lock}
			/>
		);
	}

	getLoggedInComponent() {
		return (
			<LoggedIn
				lock={this.lock}
				idToken={this.state.idToken}
				currentView={this.state.currentView}
				handleViewChange={this.handleViewChange}
				handleFormInputChange={this.handleFormInputChange}
				formData={this.state.formData}
			/>
		);
	}

	render() {
		// If the client has logged in, show the logged in view.
		// Otherwise, show them the login view ('Home' component).
		return this.state.idToken ? this.getLoggedInComponent() : this.getLoggedOutComponent();
	}
}
