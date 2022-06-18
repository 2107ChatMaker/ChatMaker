import React, {useState} from 'react';

export default function useForm<T>(
        initialState: T, 
        validate:(data: T)=> T, 
        onSubmit: (data: T)=> void
        ): [
            T, any, 
            (e: React.ChangeEvent<HTMLInputElement>) => void, 
            (e: React.FormEvent<HTMLFormElement>) => void
        ]  {            
            
    const [form, setForm] = useState<T>(initialState);
    const [errors, setErrors] = useState({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newErrors = validate(form);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            onSubmit(form);        
        }
    }
    return [form, errors ,handleChange, handleSubmit];
}

// [
//     formData, 
//     errors, 
//     handleChange, 
//     handleSubmit
// ]