import React, {useState} from 'react';

//hook to update form change and errors and handling submit
export default function useForm<T>(
        initialState: T, 
        validate:(data: T)=> T, 
        onSubmit: (data: T)=> void
        ): [
            T, any, 
            (e: React.ChangeEvent<HTMLInputElement>) => void, 
            (e: React.FormEvent<HTMLFormElement>) => void
        ]  {            
    
    //form state and errors
    const [form, setForm] = useState<T>(initialState);
    const [errors, setErrors] = useState({});
    
    //input change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    //form submit handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //initialize new errors object 
        //this prevent errors state not updated immediately
        let newErrors = validate(form);
        
        //set errors state to new errors object
        setErrors(newErrors);
        
        //if no errors, submit form
        if (Object.keys(newErrors).length === 0) {
            onSubmit(form);        
        }
    }
    
    //return form state, errors, change handler and submit handler
    return [form, errors ,handleChange, handleSubmit];
}
