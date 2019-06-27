import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Axios from 'axios';
import { connect } from 'react-redux';

import FormActions from './FormActions';
import './Form.css';

function ReservationForm(props) {
    const [optionsLoaded, setOptionsLoaded] = useState(false);
    const [houses, setHouses] = useState([]);
    const [amenities] = useState(props.amenities);

    let entity = props.entity;
    if (!entity.Id) {
        entity = {
            House: '',
            Amenity: '',
            Reservation: '',
            Date: ''
        }
    }

    const loadOptions = () => {
        if (!optionsLoaded) {
            if (props.loggedUser.studentID) {
                const url = props.baseApiUrl + 'houses?studentID=' + props.loggedUser.studentID;

                Axios.get(url)
                    .then(response => {
                        console.log('Axios.get - url: ', url);
                        console.log('Axios.get - response: ', response);

                        setHouses(response.data.house);
                        setOptionsLoaded(true);
                    })
                    .catch(error => {
                        setHouses([]);
                        console.error('Axios.get - url: ', url);
                        console.error('Axios.get - error: ', error);
                    });
            }
        }
    }

    const getHouseOptions = () => {
        let houseOptions;

        if (houses && houses.length > 0) {
            const compareHouses = (a, b) => {
                if (a.location > b.location)
                    return 1;
                if (a.location < b.location)
                    return -1;
                return 0;
            };
            let sortedHouses = houses.sort(compareHouses);
            houseOptions = sortedHouses.map((house, index) => {
                return (<option key={index}>{house.location}</option>);
            });
        } else {
            houseOptions = <></>;
        }

        return houseOptions;
    };

    const getAmenityOptions = () => {
        let amenityOptions;

        if (amenities && amenities.length > 0) {
            const compareAmenities = (a, b) => {
                if (a.Name > b.Name)
                    return 1;
                if (a.Name < b.Name)
                    return -1;
                return 0;
            };
            let sortedAmenities = amenities.sort(compareAmenities);
            amenityOptions = sortedAmenities.map((amenity, index) => {
                return (<option key={index}>{amenity.Name}</option>);
            });
        } else {
            amenityOptions = <></>;
        }

        return amenityOptions;
    };

    loadOptions();

    return !optionsLoaded
        ? <div>Loading form...</div>
        : (
            <Formik
                initialValues={{ ...entity }}
                validate={values => {
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
                                    {getHouseOptions()}
                                </Field>
                                <ErrorMessage name="House" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="Amenity">Amenity:</label>
                            <div className="col-sm-10 input-group">
                                <Field className="form-control" component="select" name="Amenity" placeholder="Amenity">
                                    <option disabled value="">Please select an Amenity</option>
                                    {getAmenityOptions()}
                                </Field>
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