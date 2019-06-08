import React from 'react';
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { logInSuccess, logInError } from '../Reducers/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { history } from '../Store';

class Login extends React.Component {
    render() {
        return (
            <Formik className="Login"
                initialValues={{
                    Email: '',
                    Password: ''
                }}
                validate={values => {
                    let errors = {};

                    if (!values.Email) {
                        errors.Email = 'Required';
                    }

                    if (!values.Password) {
                        errors.Password = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);

                    if (values.Email === 'pablo@email.com' && values.Password === '123') {
                        values.Name = 'Pablo';

                        this.props.logInSuccess(values);
                        history.push('/Home');
                    } else {
                        this.props.logInError();
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="Login form form-horizontal form-compact">
                        <h3>Login to React Practice Site - Isthmus</h3>
                        <div className="form-group">
                            <div className="input-group">
                                <Field className="form-control" type="Email" name="Email" placeholder="Email" />
                                <ErrorMessage name="Email" component="div" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <Field className="form-control" type="Password" name="Password" placeholder="Password" />
                                <ErrorMessage name="Password" component="div" />
                            </div>
                        </div>
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