import React from 'react';
import './Form.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { insert, edit } from '../../Reducers/entities';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

function GameForm(props) {
    let entity = props.entity;
    if (!entity.Name) {
        entity = {
            Name: '',
            Rating: '',
            Type: '',
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

                if (!values.Rating) {
                    errors.Rating = 'Required';
                } else if (isNaN(values.Rating)) {
                    errors.Rating = 'Invalid rating. Must be a number.';
                }

                if (!values.Type) {
                    errors.Type = 'Required';
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);

                if (!values.Id) {
                    props.insert(props.entityName, values);
                } else {
                    props.edit(props.entityName, values);
                }

                props.onClose();
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
                        <label className="col-sm-2 control-label" htmlFor="Rating">Rating:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" type="Rating" name="Rating" placeholder="Rating" />
                            <ErrorMessage name="Rating" component="div" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="Type">Type:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="Type" placeholder="Type" />
                            <ErrorMessage name="Type" component="div" />
                        </div>
                    </div>
                    <div className="form-actions">
                        {!entity.Id ? <button type="submit" className="btn btn-sm btn-primary" disabled={isSubmitting}>Insert</button> : null}
                        {entity.Id ? <button type="submit" className="btn btn-sm btn-primary" disabled={isSubmitting}>Edit</button> : null}
                        <button type="button" className="btn btn-sm btn-danger" onClick={() => props.onClose()}>Cancel</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
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
)(GameForm);