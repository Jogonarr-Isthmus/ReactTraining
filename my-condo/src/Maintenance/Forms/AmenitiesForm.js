import React from 'react';
import './Form.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function AmenitiesForm(props) {
    let entity = props.entity;
    if (!entity.Id) {
        entity = {
            Name: '',
            Description: ''
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

                if (!values.Description) {
                    errors.Description = 'Required';
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                if (!values.Id) {
                    props.onInsert(values);
                } else {
                    props.onEdit(values);
                }

                setSubmitting(false);
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
                        <label className="col-sm-2 control-label" htmlFor="Description">Description:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="Description" placeholder="Description" />
                            <ErrorMessage name="Description" component="div" />
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

export default AmenitiesForm;