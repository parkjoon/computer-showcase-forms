import React, { Component } from 'react';

export const SABFormMetaData = {
	name: "Student Account Billing",
	shortName: "sabForm",
	description: "a form for student account billing purchases",
	paths: [
		{
			ID: 1,
			name: "Forms"
		}
	],
    icon: "icon-docs"
};

export default class SABForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            agreed: false
        }

        this.onAgree = this.onAgree.bind(this);
    }

    onChange(event, fieldName) {
        let newFormData = {
            ...this.props.formData
        };
        newFormData[fieldName] = event.target.value;

        this.props.handleFormInputChange({
            sabForm: newFormData
        });
    }

    onFormReset() {
        this.props.handleFormInputChange({
            sabForm: {
                ...SABFormMetaData,
				uniqname: this.props.profile.nickname,
                isMedicalStudent: "",
                medicalSchoolCode: "M1",
                phoneNumber: "",
                subtotal: "",
                tax: "",
                total: "",
                rmsTransaction: "",
                register: "Central - 1"
            }
        });
    }

    onSubmit(event) {
        event.preventDefault();

        if(this.props.formData.isMedicalStudent == ""
            || this.props.formData.phoneNumber == ""
            || this.props.formData.subtotal == ""
            || this.props.formData.tax == ""
            || this.props.formData.total == ""
            || this.props.formData.rmsTransaction == "") {
            alert("Please fill out all the fields!");
            return;
        }
        else if(!this.state.agreed) {
            alert("You must agree to the terms to submit this form!");
            return;
        }

		// TODO: Need to ensure that the "I Agree" checkbox has been checked.
		this.props.handleFormSubmit(SABFormMetaData.shortName);
    }

    onAgree() {
        this.setState({
            agreed: !this.state.agreed
        });
    }

    getCustomerAgreementText() {
        return "By choosing \"I Agree\" below, I understand that there are no returns or exchanges on products purchased via student account billing unless a product is defective, I certify that I am a currently enrolled U-M student, I authorize Computer Showcase to bill my U-M student account for this purchase, I agree that the computer(s) and/or software you buy are for personal use only I may not resell software, any computer I buy may not be sold within two years from the date of purchase, and I understand that violators may be subject to disciplinary action by U-M.";
    }

    getMedicalStudent() {
        if(this.props.formData.isMedicalStudent == '1') {
            return (
                <div id="field1" className="mt-radio-inline">
                    <label className="mt-radio">
                        <input type="radio" id="isMedicalStudentOption" required value="1" checked onChange={(event) => this.onChange(event, 'isMedicalStudent')} /> Yes
                        <span></span>
                    </label>
                    <label className="mt-radio">
                        <input type="radio" id="isNotMedicalStudentOption" required value="0" onChange={(event) => this.onChange(event, 'isMedicalStudent')} /> No
                        <span></span>
                    </label>
                </div>
            );
        }

        if(this.props.formData.isMedicalStudent == '0') {
            return (
                <div id="field1" className="mt-radio-inline" onChange={(event) => this.onChange(event, 'isMedicalStudent')}>
                    <label className="mt-radio">
                        <input type="radio" id="isMedicalStudentOption" value="1" onChange={(event) => this.onChange(event, 'isMedicalStudent')} /> Yes
                        <span></span>
                    </label>
                    <label className="mt-radio">
                        <input type="radio" id="isNotMedicalStudentOption" value="0" checked onChange={(event) => this.onChange(event, 'isMedicalStudent')} /> No
                        <span></span>
                    </label>
                </div>
            );
        }

        return (
            <div id="field1" className="mt-radio-inline" onChange={(event) => this.onChange(event, 'isMedicalStudent')}>
                <label className="mt-radio">
                    <input type="radio" id="isMedicalStudentOption" value="1" /> Yes
                    <span></span>
                </label>
                <label className="mt-radio">
                    <input type="radio" id="isNotMedicalStudentOption" value="0" /> No
                    <span></span>
                </label>
            </div>
        );
    }

    getMedicalSchoolClassCodeField() {
        return (
            <div className="form-group">
                <label className="col-md-3 control-label">Medical School class code:</label>
                <div className="col-md-4">
                    <select id="field2" className="form-control" value={this.props.formData.medicalSchoolCode} onChange={(event) => this.onChange(event, 'medicalSchoolCode')}>
                        <option>M1</option>
                        <option>M2</option>
                        <option>M3</option>
                        <option>M4</option>
                    </select>
                </div>
            </div>
        );
    }

    getRegisterField() {
        return (
            <select id="field8" className="form-control" value={this.props.formData.register} onChange={(event) => this.onChange(event, 'register')}>
                <option>Central - 1</option>
                <option>Central - 2</option>
                <option>Central - 3</option>
                <option>Central - 4 (Repair)</option>
                <option>Central - 6 (Shipping)</option>
                <option>North - 5</option>
                <option>North - 6 (Manager's Desk)</option>
                <option>North - 7 (Repair)</option>
            </select>                
        );
    }
	
	render() {
        const formData = this.props.formData;
		return (
			<div className="portlet box blue-hoki">
                <div className="portlet-title">
                    <div className="tools">
                        <button type="button" className="btn red" onClick={() => this.onFormReset()}>Reset</button>
                    </div>
                </div>
                <div className="portlet-body form">
                    <form action="javascript:;" className="form-horizontal" role="form">
                        <div className="form-body">
                            <div className="form-group">
                                <label className="col-md-3 control-label">Uniqname:</label>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" disabled placeholder={this.props.profile.nickname} />
                                    <span className="help-block"> I confirm that the above Uniqname is correct. </span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label">Are you a Medical School student?</label>
                                <div className="col-md-4">
                                    {this.getMedicalStudent()}
                                </div>
                            </div>

                            {this.props.formData.isMedicalStudent == "1" && this.getMedicalSchoolClassCodeField()}
                            
                            <div className="form-group">
                                <label className="col-md-3 control-label">Phone number:</label>
                                <div className="col-md-4">
                                    <input id="field3" type="text" className="form-control" value={formData.phoneNumber} onChange={(event) => this.onChange(event, 'phoneNumber')} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label">Subtotal:</label>
                                <div className="col-md-4">
                                    <input id="field4" type="text" className="form-control" value={formData.subtotal} onChange={(event) => this.onChange(event, 'subtotal')} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label">Tax:</label>
                                <div className="col-md-4">
                                    <input id="field5" type="text" className="form-control" value={formData.tax} onChange={(event) => this.onChange(event, 'tax')} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label">Total:</label>
                                <div className="col-md-4">
                                    <input id="field6" type="text" className="form-control" value={formData.total} onChange={(event) => this.onChange(event, 'total')} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label">RMS Transaction #:</label>
                                <div className="col-md-4">
                                    <input id="field7" type="text" className="form-control" value={formData.rmsTransaction} onChange={(event) => this.onChange(event, 'rmsTransaction')} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label">Register #:</label>
                                <div className="col-md-4">
                                    {this.getRegisterField()}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label">Customer Agreements:</label>
                                <div className="col-md-4">
                                    <div className="portlet">
                                        <div className="portlet-body">{this.getCustomerAgreementText()}</div>
                                    </div>
                                    <label id="field9" className="mt-checkbox">
                                        <input type="checkbox" value="yes" onChange={this.onAgree} /> I Agree
                                        <span></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <div className="row">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={(event) => this.onSubmit(event)}>Submit</button>
                                    <button type="button" className="btn default">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
		);
	}
};
