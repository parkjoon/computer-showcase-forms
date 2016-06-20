import React, { Component } from 'react';
import Home from './Home';
import LoggedIn from './LoggedIn';
import { ReportsMetaData } from './Reports';
import { SABFormMetaData } from './SABForm';
import { submitForm } from './api';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.handleViewChange = this.handleViewChange.bind(this);
		this.handleFormInputChange = this.handleFormInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	componentWillMount() {
		this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
		
		this.pusher = new Pusher('ff391f34967f5ad6ba1c', {
			encrypted: true
		});
		this.channel = this.pusher.subscribe('main_channel');
		
		this.setState({
			idToken: this.getIdToken(),
			currentView: ReportsMetaData,
			formData: {
				sabForm: {
					...SABFormMetaData,
					uniqname: "",
		            isMedicalStudent: "",
		            medicalSchoolCode: "",
		            phoneNumber: "",
		            subtotal: "",
		            tax: "",
		            total: "",
		            rmsTransaction: "",
		            register: ""
				}
			}
		});
	}
	
	componentDidMount() {
		this.channel.bind('my-event', (data) => {
			console.log('An event was triggered with data:');
			console.log(data);
		});
	}

	handleViewChange(newViewMetaData) {
		this.setState({
			currentView: newViewMetaData
		});
	}

	handleFormInputChange(formData) {
		this.setState({
			formData: formData
		});
	}
	
	handleFormSubmit(formShortName) {
		console.log('Entered handleFormSubmit function.');
		submitForm(this.state.formData[formShortName]);
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
				handleFormSubmit={this.handleFormSubmit}
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
