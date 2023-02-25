import { useCallback, useState } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

import { AsyncDropdown, TooloButton } from 'shared/components';
import socialProfileSchema from 'shared/validationSchema/socialProfile';
import locationImage from 'assets/images/icons/location.png';
import { useOptionLoader } from 'shared/hooks';
import { fetchCities } from 'services';

const config = { label: 'cityName' };

const EmailModal = ({
    onRegisterClicked,
    submitting,
    show,
    onClose,
    token,
    email,
}) => {
    const [communityDisabled, setCommunityDisabled] = useState(true);
    const [selectedCity, setCityId] = useState('');
    const [defaultOptions, setDefaultOptions] = useState([]);
    const [cityOptions, loadCityOptions] = useOptionLoader(fetchCities, config);

    const fetchCommunities = useCallback(async (search, cityId) => {
        try {
            const response = await axios.get(`/communities`, {
                params: { city: cityId, search },
            });
            return { response: response.data, error: null };
        } catch (error) {
            error.handleGlobally && error.handleGlobally();
            return { response: null, error };
        }
    }, []);

    const setCommunityOptions = (obj) => {
        return obj.response.data.map((community) => {
            const { _id, communityName } = community;
            return { value: _id, label: communityName };
        });
    };

    const loadCommunityOptions = useCallback(
        async (inputValue, callback) => {
            const obj = await fetchCommunities(inputValue, selectedCity);
            const communityOptions = setCommunityOptions(obj);
            callback(communityOptions);
        },
        [fetchCommunities, selectedCity]
    );

    const handleCitySelected = useCallback(
        async (city) => {
            const obj = await fetchCommunities('', city.value);
            const communityOptions = setCommunityOptions(obj);
            setCommunityDisabled(false);
            setDefaultOptions([...communityOptions]);
            setCityId(city.value);
        },
        [setCommunityDisabled, fetchCommunities, setDefaultOptions, setCityId]
    );

    return (
        <Modal
            show={show}
            centered
            style={{ zIndex: 10500 }}
            backdropClassName="confirm-backdrop"
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Provide additional details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        city: '',
                        community: '',
                        email,
                    }}
                    validationSchema={socialProfileSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onRegisterClicked({ ...values, token });
                        setSubmitting(false);
                    }}
                >
                    {() => (
                        <Form>
                            <div className="eachfieldzone">
                                <label className="labelfrmtxt">
                                    Select City<small className="required">*</small>
                                </label>
                                <div className="rlc-fldrw">
                                    <AsyncDropdown
                                        name="city"
                                        placeHolder="City"
                                        defaultOptions={cityOptions}
                                        loadOptions={loadCityOptions}
                                        onOptionSelected={handleCitySelected}
                                        indicatorImage={locationImage}
                                    />
                                </div>
                                <ErrorMessage
                                    className="errornotif"
                                    name="city"
                                    component="div"
                                />
                            </div>
                            <div className="eachfieldzone">
                                <label className="labelfrmtxt">
                                    Select Community<small className="required">*</small>
                                </label>
                                <div className="rlc-fldrw">
                                    <AsyncDropdown
                                        name="community"
                                        placeHolder="Community"
                                        loadOptions={loadCommunityOptions}
                                        disabled={communityDisabled}
                                        defaultOptions={defaultOptions}
                                    />
                                </div>
                                <ErrorMessage
                                    className="errornotif"
                                    name="community"
                                    component="div"
                                />
                            </div>
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
                                        readOnly={!!email}
                                    />
                                    <span>
                                        <img
                                            src={require('assets/images/icons/email.png').default}
                                            alt="Username"
                                        />
                                    </span>
                                </div>
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="errornotif"
                                />
                            </div>
                            <div className="rlc-fldrw text-center">
                                <TooloButton
                                    buttonText="save details"
                                    loadingText="saving"
                                    loading={submitting}
                                    type="submit"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default EmailModal;
