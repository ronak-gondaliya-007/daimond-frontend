import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectStyle } from './select-style';

const SelectField = ({
    id,
    label,
    control,
    name,
    formGroup = "",
    options,
    rule = { required: true },
    errors,
    placeholder = "Select Options",
    isSearchable = false,
}) => {
    const isError = errors?.[name];
    return (
        <div className={`form-group mb-[16px] ${formGroup}`}>
            <label htmlFor={id}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rule}
                render={({ field: { onChange, value } }) => (
                    <Select
                        id={id}
                        value={value}
                        onChange={onChange}
                        className={`custom-select ${errors?.[name] ? 'error' : ''}`}
                        styles={selectStyle(isError)}
                        options={options}
                        placeholder={placeholder}
                        isSearchable={isSearchable}
                    />
                )}
            />
            {!!errors?.[name] && <span className={`error-text ${errors?.[name] ? `${name}` : ''}`}>{errors[name].message}</span>}
        </div>
    )
}

export default SelectField;