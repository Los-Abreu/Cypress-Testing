import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
    terms: yup.boolean().oneOf([true], 'Agree to Terms and Conditions required')
});

export default function Form() {
const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
});

const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
});

const [buttonDisabled, setButtonDisabled] = useState(true);

const [post, setPost] = useState([]);

useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
    })
},[formState]);

const validateChange = e => {
    yup.reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then(valid => {
        setErrors({
            ...errors,
            [e.target.name]:''
        });
    })
    .catch(err => {
        setErrors({
            ...errors,
            [e.target.name]: err.errors
        });
    });
};
const formSubmit = e=> {
    e.preventDefault();
    axios.post('https://reqres.in/api/users', formState)
    .then(res => {
        setPost(res.data);
        console.log('successful', post);

        setFormState({
            name: '',
            email: '',
            password: '',
            terms: ''
        });
    })
    .catch(err => {
        console.log(err.res);
    });
};

const inputChange = e => {
    e.persist();
    const newFormData = {
        ...formState, [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
};

return (
<form onSubmit={formSubmit}>
    <label htmlFor='name'>
        Name:
        <input
            data-cy="name"
            id='name'
            type='text'
            name='name'
            placeholder='First and Last name'
            value={formState.name}
            onChange={inputChange}
        />
        {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
    </label>
    <label htmlFor='email'>
        Email:
        <input
            data-cy="email"
            id='email'
            type='text'
            name='email'
            placeholder='Email Address'
            value={formState.email}
            onChange={inputChange}
        />
        {errors.email.length > 0 ? <p className='error'>{errors.email}</p> : null}
    </label>
    <label htmlFor='password'>
        Password (6 characters minimum):
        <input
            data-cy="password"
            id='password'
            type='password'
            name='password'
            minLength='6'
            placeholder='Password'
            value={formState.password}
            onChange={inputChange}
        />
        {errors.password.length > 0 ? <p className='error'>{errors.password}</p> : null}
    </label>
    <label htmlFor='terms' className='terms'>
        <input
            data-cy="terms"
            type='checkbox'
            name='terms'
            checked={formState.terms}
            onChange={inputChange}
        />
        Terms and Conditions
    </label>
    <pre>{JSON.stringify(post, null, 3)}</pre>
    <button data-cy="submit" disabled={buttonDisabled}>Submit</button>
</form>
);
};