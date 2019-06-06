import React from 'react';
import './Form.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function ReservationForm(props) {
    let entity = props.entity;
    if (!entity.Id) {
        entity = {
            Estate: '',
            Amenitie: '',
            Reservation: '',
            Date: ''
        }
    }
    return (
        <Formik
            initialValues={{ ...entity }}
            validate={values => {
                let errors = {};

                if (!values.Estate) {
                    errors.Estate = 'Required';
                }

                if (!values.Amenitie) {
                    errors.Amenitie = 'Required';
                }

                if (!values.Reservation) {
                    errors.Reservation = 'Required';
                }

                if (!values.Date) {
                    errors.Date = 'Required';
                } else {
                    let regEx = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
                    if (!values.Date.match(regEx)) {
                        errors.Date = 'Invalid format.';
                    } else {
                        let d = new Date(values.Date);
                        let dNum = d.getTime();
                        if (!dNum && dNum !== 0) {
                            errors.Date = 'Invalid value.';
                        }
                    }
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
                        <label className="col-sm-2 control-label" htmlFor="Estate">Estate:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="Estate" placeholder="Estate" />
                            <ErrorMessage name="Estate" component="div" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="Amenitie">Amenitie:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="Amenitie" placeholder="Amenitie" />
                            <ErrorMessage name="Amenitie" component="div" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="Reservation">Reservation:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="Reservation" placeholder="Reservation" />
                            <ErrorMessage name="Reservation" component="div" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label" htmlFor="Date">Date:</label>
                        <div className="col-sm-10 input-group">
                            <Field className="form-control" name="Date" placeholder="Date" />
                            <ErrorMessage name="Date" component="div" />
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

export default ReservationForm;