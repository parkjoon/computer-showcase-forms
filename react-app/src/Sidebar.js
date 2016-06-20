import React, { Component } from 'react';
import { ReportsMetaData } from './Reports';
import { SABFormMetaData } from './SABForm';

export default class Sidebar extends Component {
	getNavItemClassName(viewName) {
		if(viewName === this.props.currentView.name) {
			return "nav-item start active open";
		}
		return "nav-item";
	}

	getClassNames(viewName) {
		let classNames = {
			navItem: "nav-item",
			arrow: "arrow"
		};
		if(viewName === this.props.currentView.name) {
			classNames.navItem = classNames.navItem + " active open";
			classNames.arrow = classNames.navItem + " open";
		}
		return classNames;
	}

	render() {
		const ReportsClassNames = this.getClassNames(ReportsMetaData.name);
		const SABFormClassNames = this.getClassNames(SABFormMetaData.name);

		return (
			<div className="page-sidebar-wrapper">
			    <div className="page-sidebar navbar-collapse collapse">
			        <ul className="page-sidebar-menu page-header-fixed page-sidebar-menu-hover-submenu" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
			            <li className={ReportsClassNames.navItem}>
			                <a href="javascript:;" className="nav-link nav-toggle" onClick={() => this.props.handleViewChange(ReportsMetaData)}>
			                    <i className={ReportsMetaData.icon}></i>
			                    <span className="title">{ReportsMetaData.name}</span>
			                    <span className="selected"></span>
			                    <span className={ReportsClassNames.arrow}></span>
			                </a>
			            </li>
			            <li className={this.getNavItemClassName(SABFormMetaData.name)}>
			                <a href="javascript:;" className="nav-link nav-toggle">
			                    <i className={SABFormMetaData.icon}></i>
			                    <span className="title">Forms</span>
			                    <span className={SABFormClassNames.arrow}></span>
			                </a>
			                <ul className="sub-menu">
			                    <li className="nav-item">
			                        <a href="javascript:;" className="nav-link" onClick={() => this.props.handleViewChange(SABFormMetaData)}>
			                            <span className="title">{SABFormMetaData.name}</span>
			                        </a>
			                    </li>
			                </ul>
			            </li>
			        </ul>
			    </div>
			</div>
		);
	}
};
