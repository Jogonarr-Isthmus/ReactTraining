import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Axios from 'axios';
import { connect } from 'react-redux';

import FormActions from './FormActions';
import './Form.css';

function ReservationForm(props) {
    const [optionsLoaded, setOptionsLoaded] = useState(false);

    let entity = props.entity;
    if (!entity.Id) {
        entity = {
            House: '',
            Amenity: '',
            Reservation: '',
            Date: ''
        }
    }

    let houseOptions = [];
    if (props.loggedUser.studentID) {
        const url = props.baseApiUrl + 'houses?studentID=' + props.loggedUser.studentID;

        Axios.get(url)
            .then(response => {
                console.log('Axios.get - url: ', url);
                console.log('Axios.get - response: ', response);

                houseOptions = response.data.house.map(house => <option key={house._id} value={house.location}>{house.location}</option>);
                setOptionsLoaded(true);
            })
            .catch(error => {
                console.error('Axios.get - url: ', url);
                console.error('Axios.get - error: ', error);
            });
    }

    const amenityOptions = props.amenities.map(amenity => <option key={amenity.Id} value={amenity.Name}>{amenity.Name}</option>);

    return !optionsLoaded
        ? <div>Loading form...</div>
        : (
            <Formik
                initialValues={{ ...entity }}
                validate={values => {
                    console.log('values: ', values);
                    let errors = {};

                    if (!values.House) {
                        errors.House = 'Required';
                    }

                    if (!values.Amenity) {
                        errors.Amenity = 'Required';
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
                            <label className="col-sm-2 control-label" htmlFor="House">House:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" component="select" name="House" placeholder="House">
                                    <option disabled value="">Please select a House</option>
                                    {houseOptions}
                                </Field>
                                {/* <Field className="form-control" name="House" placeholder="House" /> */}
                                <ErrorMessage name="House" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="Amenity">Amenity:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" component="select" name="Amenity" placeholder="Amenity">
                                    <option disabled value="">Please select an Amenity</option>
                                    {amenityOptions}
                                </Field>
                                {/* <Field className="form-control" name="Amenity" placeholder="Amenity" /> */}
                                <ErrorMessage name="Amenity" component="div" />
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
                                <Field className="form-control" name="Date" placeholder="Date (dd/mm/yyyy)" />
                                <ErrorMessage name="Date" component="div" />
                            </div>
                        </div>
                        <FormActions isNew={!entity.Id} isSubmitting={isSubmitting} onClose={props.onClose} />
                    </Form>
                )}
            </Formik>
        );
}

function mapStateToProps(state) {
    return {
        baseApiUrl: state.app.baseApiUrl,
        loggedUser: state.auth.loggedUser,
        amenities: state.entities.amenities
    };
}

export default connect(
    mapStateToProps
)(ReservationForm);