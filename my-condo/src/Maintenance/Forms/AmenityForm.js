import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import FormActions from './FormActions';
import './Form.css';

function AmenityForm(props) {
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
                    <FormActions isNew={!entity.Id} isSubmitting={isSubmitting} onClose={props.onClose} />
                </Form>
            )}
        </Formik>
    );
}

export default AmenityForm;