import React, { Component } from 'react';

export default class Header extends Component {
	// When the user clicks the logout button, remove the userToken from the
	// session and let the calling 'a' tag redirect to 'index.html'.
	onLogout() {
		localStorage.removeItem('userToken');
	}

	render() {
		return (
			<div className="page-header navbar navbar-fixed-top">
				<div className="page-header-inner ">
					<div className="page-logo">
						<a href="index.html"><img src="src/assets/layouts/layout2/img/sidebar-logo.png" alt="logo" className="logo-default" /></a>
						<div className="menu-toggler sidebar-toggler"></div>
					</div>
					<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
					<div className="page-top">
						<div className="top-menu">
							<ul className="nav navbar-nav pull-right">
								<li className="dropdown dropdown-user dropdown-dark">
									<a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
										<img alt="" className="img-circle" src="src/assets/layouts/layout2/img/avatar.png" />
										<span className="username username-hide-on-mobile"> {this.props.profile.nickname} </span>
										<i className="fa fa-angle-down"></i>
									</a>
									<ul className="dropdown-menu dropdown-menu-default">
										<li>
											<a href="index.html" onClick={this.onLogout}><i className="icon-key"></i> Log Out </a>
										</li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
