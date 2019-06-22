import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';

import FormActions from './FormActions';
import './Form.css';

class HouseForm extends React.Component {
    render() {
        let entity = this.props.entity;
        if (!entity._id) {
            entity = {
                studentID: this.props.loggedUser.studentID,
                _id: undefined,
                owner: '',
                price: '',
                location: '',
            }
        }
        return (
            <Formik
                initialValues={{ ...entity }}
                validate={values => {
                    let errors = {};

                    if (!values.owner) {
                        errors.owner = 'Required';
                    }

                    if (!values.price) {
                        errors.price = 'Required';
                    } else if (isNaN(values.price)) {
                        errors.price = 'Invalid price. Must be a number.';
                    }

                    if (!values.location) {
                        errors.location = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);

                    if (this.props.loggedUser.studentID) {
                        if (!values._id) {
                            this.props.onInsert(values);
                        } else {
                            this.props.onEdit(values);
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form form-horizontal form-compact">
                        <div className="form-group row">
                            <label className="col-sm-2 control-label" htmlFor="_id">Id:</label>
                            <div className="col-sm-10 input-group">
                                <Field readOnly className="form-control" name="_id" placeholder="Id" />
                                <ErrorMessage name="_id" component="div" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label pull-right" htmlFor="studentID">Student Id:</label>
                            <div className="col-sm-10 input-group">
                                <Field readOnly className="form-control" name="studentID" placeholder="Student Id" />
                                <ErrorMessage name="studentID" component="div" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label" htmlFor="owner">Owner:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="owner" placeholder="Owner" />
                                <ErrorMessage name="owner" component="div" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label" htmlFor="price">Price:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="price" placeholder="Price" />
                                <ErrorMessage name="price" component="div" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label" htmlFor="location">Location:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="location" placeholder="Location" />
                                <ErrorMessage name="location" component="div" />
                            </div>
                        </div>
                        <FormActions isNew={!entity._id} isSubmitting={isSubmitting} onClose={this.props.onClose} />
                    </Form>
                )}
            </Formik>
        );
    }
}

function mapStateToProps(state) {
    return {
        loggedUser: state.auth.loggedUser
    };
}

export default connect(
    mapStateToProps,
    null
)(HouseForm);