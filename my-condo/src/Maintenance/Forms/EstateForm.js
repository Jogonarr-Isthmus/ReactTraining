import React from 'react';
import './Form.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function EstateForm(props) {
    let entity = props.entity;
    if (!entity.Id) {
        entity = {
            Code: '',
            Area: '',
            OwnerName: '',
            OwnerPhone: '',
            OwnerEmail: ''
        }
    }
    return (
        <Formik
            initialValues={{ ...entity }}
            validate={values => {
                let errors = {};

                if (!values.Code) {
                    errors.Code = 'Required';
                }

                if (!values.Area) {
                    errors.Area = 'Required';
                } else if (isNaN(values.Area)) {
                    errors.Area = 'Invalid Area. Must be a number.';
                }

                if (!values.OwnerName) {
                    errors.OwnerName = 'Required';
                }

                if (!values.OwnerPhone) {
                    errors.OwnerPhone = 'Required';
                } else if (isNaN(values.OwnerPhone)) {
                    errors.OwnerPhone = 'Invalid Phone. Must be a number.';
                }

                if (!values.OwnerEmail) {
                    errors.OwnerEmail = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.OwnerEmail)
                ) {
                    errors.OwnerEmail = 'Invalid email address';
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
                        <label className="col-sm-2 control-label" htmlFor="Code">Code:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="Code" placeholder="Code" />
                            <ErrorMessage name="Code" component="div" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="Area">Area (m2):</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="Area" placeholder="Area" />
                            <ErrorMessage name="Area" component="div" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="OwnerName">OwnerName:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" type="OwnerName" name="OwnerName" placeholder="OwnerName" />
                            <ErrorMessage name="OwnerName" component="div" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="OwnerPhone">OwnerPhone:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="OwnerPhone" placeholder="OwnerPhone" />
                            <ErrorMessage name="OwnerPhone" component="div" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="OwnerEmail">OwnerEmail:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" type="Email" name="OwnerEmail" placeholder="OwnerEmail" />
                            <ErrorMessage name="OwnerEmail" component="div" />
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

export default EstateForm;