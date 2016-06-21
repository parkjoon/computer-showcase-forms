import React, { Component } from 'react';

export const ReportsMetaData = {
	name: "Reports",
	description: "daily transaction reports",
	paths: [],
	icon: "icon-bar-chart"
};

export default class Reports extends Component {
	render() {
		let updatedTimeText = (this.props.updatedTime) ? ` The reports were updated on ${this.props.updatedTime}` : " The reports are not accurate and will need updating." ;

		return (
			<div>
				<div className="row">
					<div className="col-md-12">
						<div className="alert alert-info">
							<strong>Info!</strong>{updatedTimeText}
						</div>
					</div>
				</div>
				<div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat dashboard-stat-v2 blue">
                            <div className="visual">
                                <i className="fa fa-bar-chart-o"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span data-counter="counterup">$ {this.props.reportsData.central1}</span>
                                </div>
                                <div className="desc"> Central - 1 </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat dashboard-stat-v2 blue">
                            <div className="visual">
                                <i className="fa fa-bar-chart-o"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span data-counter="counterup">$ {this.props.reportsData.central2}</span>
                                </div>
                                <div className="desc"> Central - 2 </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat dashboard-stat-v2 blue">
                            <div className="visual">
                                <i className="fa fa-bar-chart-o"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span data-counter="counterup">$ {this.props.reportsData.central3}</span>
                                </div>
                                <div className="desc"> Central - 3 </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat dashboard-stat-v2 blue">
                            <div className="visual">
                                <i className="fa fa-bar-chart-o"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span data-counter="counterup">$ {this.props.reportsData.central4}</span>
                                </div>
                                <div className="desc"> Central - 4 (Repair) </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat dashboard-stat-v2 blue">
                            <div className="visual">
                                <i className="fa fa-bar-chart-o"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span data-counter="counterup">$ {this.props.reportsData.central6}</span>
                                </div>
                                <div className="desc"> Central - 6 (Shipping) </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat dashboard-stat-v2 blue">
                            <div className="visual">
                                <i className="fa fa-bar-chart-o"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span data-counter="counterup">$ {this.props.reportsData.north5}</span>
                                </div>
                                <div className="desc"> North - 5 </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat dashboard-stat-v2 blue">
                            <div className="visual">
                                <i className="fa fa-bar-chart-o"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span data-counter="counterup">$ {this.props.reportsData.north6}</span>
                                </div>
                                <div className="desc"> North - 6 (Manager's Desk) </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="dashboard-stat dashboard-stat-v2 blue">
                            <div className="visual">
                                <i className="fa fa-bar-chart-o"></i>
                            </div>
                            <div className="details">
                                <div className="number">
                                    <span data-counter="counterup">$ {this.props.reportsData.north7}</span>
                                </div>
                                <div className="desc"> North - 7 (Repair) </div>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		);
	}
};

