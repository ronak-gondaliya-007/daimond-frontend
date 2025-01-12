import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Controller } from 'react-hook-form';
import 'react-phone-input-2/lib/style.css';

const PhoneInputField = ({
    id,
    label,
    name,
    placeholder,
    control,
    errors,
    rules,
}) => {

    return (
        <div className='form-group mb-[16px]'>
            <label htmlFor={id}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <PhoneInput
                        id={id}
                        country={'in'}
                        value={value}
                        onChange={onChange}
                        // disableDropdown={true}
                        placeholder={placeholder}
                        inputProps={{
                            name: name,
                            id: id,
                        }}
                        containerClass={!!errors?.[name] ? 'input-error' : ''}
                        inputClass={!!errors?.[name] ? 'input-box-error' : ''}
                    />
                )}
            />
            {!!errors?.[name] && <span className="error-text">{errors[name].message}</span>}
        </div>
    )
}

export default PhoneInputField
