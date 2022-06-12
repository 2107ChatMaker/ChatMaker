import {useState} from 'react'

export default function useForm(initialState, validate, onSubmit) {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(form));
        if (Object.keys(errors).length === 0) {
            onSubmit(form);
        }
    }

    return [form, errors ,handleChange, handleSubmit];
}