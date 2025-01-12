import React from 'react'

const SelectField = ({
    id,
    label,
    name,
    formGroup = "",
    options,
    register,
    rule = { required: true },
    errors,
    placeholder = "Select Role"
}) => {
    return (
        <div className={`form-group mb-[16px] ${formGroup}`}>
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                {...register(name, rule)}
                className={`select-field ${errors?.[name] ? "error" : ""}`}
            >
                <option value="" key="placeholder" disabled selected>
                    {placeholder}
                </option>
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