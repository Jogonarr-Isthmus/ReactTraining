import React from 'react';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Axios from 'axios';

import { logInSuccess, logInError } from '../Reducers/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { history } from '../Store';

class Login extends React.Component {
    render() {
        return (
            <Formik className="Login"
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={values => {
                    let errors = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);

                    const data = {
                        user: { ...values }
                    };
                    Axios.post('http://kyrapps.com:4300/api/login', data).then((response) => {
                        if (response.data.token) {
                            this.props.logInSuccess(response.data.user);
                            history.push('/Home');
                        } else {
                            this.props.logInError('Informacion incorrecta');
                        }
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="Login form form-horizontal form-compact">
                        <h3>Login to React Practice Site - Isthmus</h3>
                        <div className="form-group">
                            <div className="input-group">
                                <Field className="form-control" name="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <Field className="form-control" type="password" name="password" placeholder="Password" />
                                <ErrorMessage name="password" component="div" />
                            </div>
                        </div>
                        <p style={{ color: 'red' }}>{this.props.logginError}</p>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-sm btn-secondary" disabled={isSubmitting}>Login</button>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.auth.isLogged,
        loggedUser: state.auth.loggedUser,
        logginError: state.auth.logginError
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logInSuccess,
        logInError
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);