import React, { Component } from 'react';

export default class Home extends Component {
	componentDidMount() {
		this.props.lock.show();
	}

	render() {
		return null;
	}
};
