/** @format */

import { useState, useRef } from 'react';

//components
import Button from './Button';
import SentMessage from './SentMessage';

//styles
import './styles_Form.css';

function useInput(initialValue = '') {
    const [value, setValue] = useState('');

    const handleChange = event => {
        setValue(event.target.value);
    };

    return [value, handleChange];
}

const Form = () => {
    const [name, handleChangeName] = useInput('');
    const [email, handleChangeEmail] = useInput('');
    const [bio, handleChangeBio] = useInput('');
    const [gender, setGender] = useState(false);
    const [regulations, setRegulations] = useState(false);
    const [sent, setSent] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const bioRef = useRef(null);
    const genderRef = useRef(null);
    const regRef = useRef(null);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;

    const handleSubmit = event => {
        event.preventDefault();

        if (!nameRef.current.value.trim()) {
            nameRef.current.style.border = '#f00 1px solid';
        } else {
            nameRef.current.style.border = 'green 1px solid';
        }
        if (
            !emailRef.current.value.trim() ||
            !emailPattern.test(emailRef.current.value)
        ) {
            emailRef.current.style.border = '#f00 1px solid';
        } else {
            emailRef.current.style.border = 'green 1px solid';
        }
        if (!bioRef.current.value.trim()) {
            bioRef.current.style.border = '#f00 1px solid';
        } else {
            bioRef.current.style.border = 'green 1px solid';
        }

        if (
            nameRef.current.value.trim() &&
            emailRef.current.value.trim() &&
            emailPattern.test(emailRef.current.value) &&
            bioRef.current.value.trim() &&
            !!gender &&
            regulations
        ) {
            setSent(true);
        } else {
            return;
        }
        if (sent === true) {
            handleChangeName({ target: { value: '' } });
            handleChangeEmail({ target: { value: '' } });
            handleChangeBio({ target: { value: '' } });
            setGender(false);
            setRegulations(false);
            setIsSuccess(true);
            console.log('close', isSuccess);
        } else {
            return;
        }
    };

    const handleClosing = () => {
        console.log('close', isSuccess);
        setIsSuccess(false);
        setSent(false);
    };

    return (
        <div className='formWrapper'>
            <div className='valueWrapper'>
                <div>Name: {name}</div>
                <div>Email: {email}</div>
                <div>Bio: {bio}</div>
                <div>Gender: {gender}</div>
                <div>The Terms and Conditions: {regulations.toString()}</div>
            </div>
            <form>
                <legend htmlFor='name'>Name:</legend>
                <input
                    name='name'
                    placeholder='name'
                    type='text'
                    value={name}
                    onChange={handleChangeName}
                    ref={nameRef}
                    required
                />

                <legend htmlFor='email'>Email:</legend>
                <input
                    name='email'
                    placeholder='email'
                    type='email'
                    value={email}
                    onChange={handleChangeEmail}
                    ref={emailRef}
                    required
                ></input>

                <legend htmlFor='bio'>Bio:</legend>
                <textarea
                    name='bio'
                    placeholder='write some bio'
                    type='text'
                    value={bio}
                    onChange={handleChangeBio}
                    ref={bioRef}
                    required
                ></textarea>

                <div>
                    <legend>Choose gender:</legend>
                    <input
                        type='radio'
                        name='gender'
                        value='male'
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                        ref={genderRef}
                        required
                    />
                    <label htmlFor='male'>Male</label>
                    <input
                        type='radio'
                        name='gender'
                        value='female'
                        id='female'
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                        ref={genderRef}
                        required
                    />
                    <label htmlFor='female'>Female</label>
                </div>
                <div>
                    <input
                        type='checkbox'
                        value='accept'
                        id='accept'
                        checked={regulations}
                        onChange={() => setRegulations(true)}
                        ref={regRef}
                        required
                    />
                    <label htmlFor='accept'>
                        <a href='https://github.com/UlEdy'>
                            the terms and conditions
                        </a>
                    </label>
                </div>
                <Button
                    label={'Send form'}
                    onClick={handleSubmit}
                    type={'submit'}
                />
                {isSuccess ? (
                    <SentMessage handleClosing={handleClosing} />
                ) : null}
            </form>
        </div>
    );
};

export default Form;
