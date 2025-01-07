import React from 'react'

const SelectField = ({
    id,
    label,
    name,
    formGroup = "",
    options,
    register,
    rule,
    errors
}) => {
    return (
        <div className={`form-group mb-[16px] ${formGroup}`}>
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                {...register(name, rule)}
            >
                {
                    options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))
                }
            </select>
            {!!errors?.[name] && <span className="error-text">{errors[name].message}</span>}
        </div>
    )
}

export default SelectField