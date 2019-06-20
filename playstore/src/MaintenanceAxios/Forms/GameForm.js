import React from 'react';
import './Form.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { connect } from 'react-redux';

class GameForm extends React.Component {
    render() {
        let entity = this.props.entity;
        if (!entity._id) {
            entity = {
                studentID: this.props.loggedUser.studentID,
                _id: undefined,
                name: '',
                rating: '',
                genre: '',
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

                    if (!values.rating) {
                        errors.rating = 'Required';
                    } else if (isNaN(values.rating)) {
                        errors.rating = 'Invalid rating. Must be a number.';
                    }

                    if (!values.genre) {
                        errors.genre = 'Required';
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
                                <Field className="form-control" name="name" placeholder="Name" />
                                <ErrorMessage name="name" component="div" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label" htmlFor="rating">Rating:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="rating" placeholder="Rating" />
                                <ErrorMessage name="rating" component="div" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 control-label" htmlFor="genre">Genre:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" name="genre" placeholder="Genre" />
                                <ErrorMessage name="genre" component="div" />
                            </div>
                        </div>
                        <div className="form-actions">
                            {!entity._id ? <button type="submit" className="btn btn-sm btn-primary" disabled={isSubmitting}>Insert</button> : null}
                            {entity._id ? <button type="submit" className="btn btn-sm btn-primary" disabled={isSubmitting}>Edit</button> : null}
                            <button type="button" className="btn btn-sm btn-danger" onClick={() => this.props.onClose()}>Cancel</button>
                        </div>
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
)(GameForm);