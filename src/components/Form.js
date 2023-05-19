import { useState, useRef } from 'react';

//components
import Button from './Button';
import ErrorMessage from './ErrorMessage';
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
    const [gender, setGender] = useState('');
    const [regulations, setRegulations] = useState(false);
    const [sent, setSent] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@.]+$/;

    const handleSubmit = event => {
        event.preventDefault();

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
            setSent(false);
        }

        if (sent === true) {
            handleChangeName({ target: { value: '' } });
            handleChangeEmail({ target: { value: '' } });
            handleChangeBio({ target: { value: '' } });
            setGender('');
            setRegulations(false);
            setIsSuccess(true);
            console.log('close', isSuccess);
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

    const handleClosing = () => {
        console.log('close', isSuccess);
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
                    onChange={handleChangeName}
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
                    onChange={handleChangeEmail}
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
                    onChange={handleChangeBio}
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
                            onChange={() => setGender('male')}
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
                            onChange={() => setGender('female')}
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
                            value='accept'
                            id='accept'
                            checked={regulations}
                            onChange={() => setRegulations(true)}
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
                    type={'submit'}
                />
            </form>
            {isSuccess && <SentMessage handleClosing={handleClosing} />}
        </div>
    );
};

export default Form;
