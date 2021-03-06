import React from 'react';
import './Form.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { insert, edit } from '../../Reducers/entities';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UserForm extends React.Component {
    render() {
        let entity = this.props.entity;
        if (!entity.Id) {
            entity = {
                Name: '',
                LastName: '',
                Email: '',
                Phone: '',
                Username: '',
                Password: '',
            }
        }
        return (
            <Formik
                initialValues={{ ...entity }}
                validate={values => {
                    let errors = {};

                    if (!values.Name) {
                        errors.Name = 'Required';
                    }

                    if (!values.LastName) {
                        errors.LastName = 'Required';
                    }

                    if (!values.Email) {
                        errors.Email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.Email)
                    ) {
                        errors.Email = 'Invalid email address';
                    }

                    if (!values.Phone) {
                        errors.Phone = 'Required';
                    } else if (isNaN(values.Phone)) {
                        errors.Phone = 'Invalid Phone. Must be a number.';
                    }

                    if (!values.Username) {
                        errors.Username = 'Required';
                    }

                    if (!values.Password) {
                        errors.Password = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);

                    if (!values.Id) {
                        this.props.insert(this.props.entityName, values);
                    } else {
                        this.props.edit(this.props.entityName, values);
                    }

                    this.props.onClose();
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="form form-horizontal form-compact">
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="Name">Name:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="Name" placeholder="Name" />
                                <ErrorMessage name="Name" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="LastName">Last Name:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="LastName" placeholder="LastName" />
                                <ErrorMessage name="LastName" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="Email">Email:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" type="Email" name="Email" placeholder="Email" />
                                <ErrorMessage name="Email" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="Phone">Phone:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="Phone" placeholder="Phone" />
                                <ErrorMessage name="Phone" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="Username">Username:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="Username" placeholder="Username" />
                                <ErrorMessage name="Username" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="Password">Password:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" type="Password" name="Password" placeholder="Password" />
                                <ErrorMessage name="Password" component="div" />
                            </div>
                        </div>
                        <div className="form-actions">
                            {!entity.Id ? <button type="submit" className="btn btn-sm btn-primary" disabled={isSubmitting}>Insert</button> : null}
                            {entity.Id ? <button type="submit" className="btn btn-sm btn-primary" disabled={isSubmitting}>Edit</button> : null}
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.onClose()}>Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}

function mapStateToProps(state) {
    return null;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        insert,
        edit
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserForm);