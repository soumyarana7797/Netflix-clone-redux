import { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginSchema from 'shared/validationSchema/login';
import { routeConstants } from 'shared/constants';
import { TooloButton } from 'shared/components';
import { useCheckbox } from 'shared/hooks';

const LoginForm = ({ loading, user, onTryLogin }) => {
    const [formSubmitted, changeSubmittedState] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const [checked, handleChange] = useCheckbox();

    useEffect(() => {
        if (formSubmitted && !loading && user) {
            changeSubmittedState(false);
            const redirectUrl = user.fullName
                ? location.state && location.state.from
                    ? location.state.from.pathname
                    : routeConstants.ACCOUNT.subRoutes.MY_ACCOUNT.route
                : routeConstants.COMPLETE_PROFILE.route;
            history.push(redirectUrl);
            toast.success('Login successful!');
        }
    }, [loading, changeSubmittedState, formSubmitted, user, history, location]);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
                onTryLogin(values);
                setSubmitting(false);
                changeSubmittedState(true);
            }}
        >
            {() => (
                <Form>
                    <h3 className="welcometolo">
                        Welcome to<span>Töölö</span>
                    </h3>
                    <p className="no-message">
                        If you are an existing user, we request you to reset your password
                        the first time you login to the new website since your passwords are
                        encrypted in our database
                    </p>
                    <div className="eachfieldzone">
                        <label className="labelfrmtxt">
                            Email Id<small className="required">*</small>
                        </label>
                        <div className="rlc-fldrw">
                            <Field
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                aria-label="Email"
                            />
                            <span>
                                <img
                                    src={require('assets/images/icons/email.png').default}
                                    alt="Username"
                                />
                            </span>
                        </div>
                        <ErrorMessage name="email" component="div" className="errornotif" />
                    </div>
                    <div className="eachfieldzone">
                        <label className="labelfrmtxt">
                            Password<small className="required">*</small>
                        </label>
                        <div className="rlc-fldrw">
                            <Field
                                type={checked ? 'text' : 'password'}
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                aria-label="Password"
                            />
                            <span>
                                <img
                                    src={require('assets/images/icons/password.png').default}
                                    alt="password"
                                />
                            </span>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="errornotif"
                        />
                    </div>
                    <div className="eachfieldzone">
                        <input type="checkbox" checked={checked} onChange={handleChange} />
                        <span className="ml-2">Show password</span>
                        <div className="fltrgt textreq">* Required</div>
                    </div>
                    <div className="rlc-fldrw text-center">
                        <TooloButton
                            buttonText="Login"
                            loadingText="Loading"
                            loading={loading}
                            type="submit"
                        />
                    </div>
                    <div className="alreadyuser">
                        <img
                            src={require('assets/images/icons/forgotpass.png').default}
                            alt="forgot password"
                        />
                        <Link className="fgpass" to={routeConstants.RESET_PASSWORD.route}>
                            Forgot Password?
                        </Link>
                        <span style={{ width: '50px' }} />
                        <img
                            src={require('assets/images/icons/adduser.png').default}
                            alt="add user"
                        />
                        New User?{' '}
                        <Link to={routeConstants.AUTH.subRoutes.REGISTRATION.route}>
                            Join Now
                        </Link>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
