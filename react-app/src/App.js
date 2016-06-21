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
		this.handleProfileLoad = this.handleProfileLoad.bind(this);
	}

	componentWillMount() {
		this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
		this.profile = null;

		this.pusher = new Pusher('ff391f34967f5ad6ba1c', {
			encrypted: true
		});
		this.channel = this.pusher.subscribe('reports_channel');
		
		this.setState({
			idToken: this.getIdToken(),
			currentView: ReportsMetaData,
			formData: {
				sabForm: {
					...SABFormMetaData,
		            isMedicalStudent: "",
		            medicalSchoolCode: "M1",
		            phoneNumber: "",
		            subtotal: "",
		            tax: "",
		            total: "",
		            rmsTransaction: "",
		            register: "Central - 1"
				}
			},
			// TODO: do a get request to get the current totals
			reportsData: {
				central1: 0.00,
				central2: 0.00,
				central3: 0.00,
				central4: 0.00,
				central6: 0.00,
				north5: 0.00,
				north6: 0.00,
				north7: 0.00,
				updatedTime: null
			}
		});
	}
	
	componentDidMount() {
		this.channel.bind('sab-form-submitted', (data) => {
			let newReportsData = {
				...this.state.reportsData
			}
			newReportsData.updatedTime = new Date();
			newReportsData[data.register] = newReportsData[data.register] + parseFloat(data.total);

			this.setState({
				reportsData: newReportsData
			});
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
		submitForm({
			...this.state.formData[formShortName],
			uniqname: this.profile.nickname
		});
	}

	handleProfileLoad(profile) {
		this.profile = profile;
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
				handleProfileLoad={this.handleProfileLoad}
				formData={this.state.formData}
				reportsData={this.state.reportsData}
			/>
		);
	}

	render() {
		// If the client has logged in, show the logged in view.
		// Otherwise, show them the login view ('Home' component).
		return this.state.idToken ? this.getLoggedInComponent() : this.getLoggedOutComponent();
	}
}
