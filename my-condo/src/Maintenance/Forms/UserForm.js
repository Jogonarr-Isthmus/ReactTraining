import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';

import FormActions from './FormActions';
import './Form.css';

class UserForm extends React.Component {
    render() {
        let entity = this.props.entity;
        if (!entity._id) {
            entity = {
                studentID: this.props.loggedUser.studentID,
                _id: undefined,
                name: '',
                email: '',
                password: '',
            }
        }
        return (
            <Formik
                initialValues={{ ...entity }}
                validate={values => {
                    let errors = {};

                    if (!values.name) {
                        errors.name = 'Required';
                    }

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
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
                            <label className="col-sm-2 control-label" htmlFor="name">Name:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="name" placeholder="name" />
                                <ErrorMessage name="name" component="div" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label" htmlFor="email">Email:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" type="email" name="email" placeholder="email" />
                                <ErrorMessage name="email" component="div" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label" htmlFor="password">Password:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" type="password" name="password" placeholder="password" />
                                <ErrorMessage name="password" component="div" />
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
)(UserForm);