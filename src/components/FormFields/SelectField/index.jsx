import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

const customStyles = {
    control: (provided) => ({
        ...provided, height: '54px', borderRadius: '8px', backgroundColor: 'rgba(239, 241, 249, 0.6)', border: '1px solid #d1e9ff', fontSize: '14px',
        '&:hover': { borderColor: '#d1e9ff', boxShadow: 'none' },
        '&:focus': { borderColor: 'transparent', boxShadow: 'none', focusoutline: 'none' },
        '&:active': { borderColor: 'transparent', boxShadow: 'none' },
    }),
    input: (provided) => ({ ...provided, height: '23px !important', padding: '0', margin: '20px 0 0 0', }),
    singleValue: (provided) => ({ ...provided, fontSize: '14px', margin: '20px 0 0 0' }),
    placeholder: (provided) => ({ ...provided, margin: '20px 0 0 0', fontSize: '14px' }),
    dropdownIndicator: (provided) => ({ ...provided, color: '#050A24' }),
    menu: (provided) => ({ ...provided, zIndex: 2, fontSize: '14px', }),
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? 'linear-gradient(135deg, #1F2A59,rgb(21, 30, 70), #050A26)' : state.isFocused ? 'linear-gradient(135deg, #f0f0f0, #d1d1d1)' : 'white',
        color: state.isSelected ? '#fff' : '#000',
        padding: '10px'
    }),
};

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
                        styles={customStyles}
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