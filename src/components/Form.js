import { useState, useEffect, useRef } from 'react';

//components
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import SentMessage from './SentMessage';

//styles
import './styles_Form.css';

const initialValues = {
    name: '',
    email: '',
    bio: '',
    gender: '',
    regulations: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;

const Form = () => {
    const [formData, setFormData] = useState(initialValues);

    const { name, email, bio, gender, regulations } = formData;

    const [sent, setSent] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (sent) {
            setIsSuccess(true);
        }
    }, [sent]);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const bioRef = useRef(null);
    const femaleRef = useRef(null);
    const maleRef = useRef(null);
    const regRef = useRef(null);

    const errorNameRef = useRef(null);
    const errorEmailRef = useRef(null);
    const errorBioRef = useRef(null);
    const errorGenderRef = useRef(null);
    const errorRegRef = useRef(null);

    const handleChange = event => {
        const type = event.target.type;
        const name = event.target.name;
        const value =
            type === 'checkbox' ? event.target.checked : event.target.value;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();

        const isFilledInput =
            nameRef.current.value.trim() &&
            emailRef.current.value.trim() &&
            emailPattern.test(emailRef.current.value) &&
            bioRef.current.value.trim() &&
            !!gender &&
            regulations;

        if (isFilledInput) {
            setSent(true);
            setFormData(initialValues);
        } else {
            setSent(false);
        }

        if (sent) {
            setIsSuccess(true);
        } else {
            if (!nameRef.current.value.trim()) {
                nameRef.current.style.border = '#f00 1px solid';
                errorNameRef.current.textContent = 'Field required!';
            } else {
                nameRef.current.style.border = 'green 1px solid';
                errorNameRef.current.textContent = '';
            }

            if (
                !emailRef.current.value.trim() ||
                !emailPattern.test(emailRef.current.value)
            ) {
                emailRef.current.style.border = '#f00 1px solid';
                errorEmailRef.current.textContent =
                    'Field required! Or invalid email.';
            } else {
                emailRef.current.style.border = 'green 1px solid';
                errorEmailRef.current.textContent = '';
            }

            if (!bioRef.current.value.trim()) {
                bioRef.current.style.border = '#f00 1px solid';
                errorBioRef.current.textContent = 'Field required!';
            } else {
                bioRef.current.style.border = 'green 1px solid';
                errorBioRef.current.textContent = '';
            }

            if (!gender) {
                errorGenderRef.current.textContent = 'Field required!';
            } else {
                errorGenderRef.current.textContent = '';
            }

            if (!regulations) {
                errorRegRef.current.textContent = 'Field required!';
            } else {
                errorRegRef.current.textContent = '';
            }
        }
    };

    const handleClose = () => {
        setIsSuccess(false);
        setSent(false);
    };

    return (
        <div className='formWrapper flex'>
            <div className='valueWrapper'>
                <div>Name: {name}</div>
                <div>Email: {email}</div>
                <div>Bio: {bio}</div>
                <div>Gender: {gender}</div>
                <div>The Terms and Conditions: {regulations.toString()}</div>
            </div>
            <form className='flex'>
                <legend htmlFor='name'>Name:</legend>
                <input
                    name='name'
                    placeholder='name'
                    type='text'
                    value={name}
                    onChange={handleChange}
                    ref={nameRef}
                    required
                />
                <ErrorMessage ref={errorNameRef} />

                <legend htmlFor='email'>Email:</legend>
                <input
                    name='email'
                    placeholder='email'
                    type='email'
                    value={email}
                    onChange={handleChange}
                    ref={emailRef}
                    required
                />
                <ErrorMessage ref={errorEmailRef} />

                <legend htmlFor='bio'>Bio:</legend>
                <textarea
                    name='bio'
                    placeholder='write some bio'
                    type='text'
                    rows='5'
                    cols='25'
                    value={bio}
                    onChange={handleChange}
                    ref={bioRef}
                    required
                ></textarea>
                <ErrorMessage ref={errorBioRef} />

                <div className='flex'>
                    <legend>Choose gender:</legend>
                    <div className='genderChoose'>
                        <input
                            type='radio'
                            name='gender'
                            value='male'
                            checked={gender === 'male'}
                            onChange={handleChange}
                            ref={maleRef}
                            required
                        />
                        <label htmlFor='male'>Male</label>
                    </div>

                    <div className='genderChoose'>
                        <input
                            type='radio'
                            name='gender'
                            value='female'
                            id='female'
                            checked={gender === 'female'}
                            onChange={handleChange}
                            ref={femaleRef}
                            required
                        />
                        <label htmlFor='female'>Female</label>
                    </div>
                    <ErrorMessage ref={errorGenderRef} />
                </div>

                <div className='flex'>
                    <div>
                        <input
                            type='checkbox'
                            name='regulations'
                            value='accept'
                            id='accept'
                            checked={regulations}
                            onChange={handleChange}
                            ref={regRef}
                            required
                        />
                        <label htmlFor='accept'>
                            <a href='https://github.com/UlEdy'>
                                The terms and conditions
                            </a>
                        </label>
                    </div>
                    <ErrorMessage ref={errorRegRef} />
                </div>
                <Button
                    label={'Send form'}
                    onClick={handleSubmit}
                />
                {isSuccess && <SentMessage handleClose={handleClose} />}
            </form>
        </div>
    );
};

export default Form;
