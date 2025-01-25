const RangeInputField = ({
    id,
    label,
    inpType = "text",
    name,
    placeholder = "Select Range",
    readOnly = false,
    register,
    rule,
    errors
}) => (
    <div className="form-group mb-[16px] cursor-pointer">
        <label htmlFor={id}>{label}</label>
        <input
            type={inpType}
            id={id}
            placeholder={placeholder}
            className={`input-field cursor-pointer ${errors?.[name] ? "error" : ""}`}
            readOnly={readOnly}
            min={20}
            max={60}
            {...register(name, rule)}
        />
        {!!errors?.[name] && <span className="error-text">{errors[name].message}</span>}
    </div>
);

export default RangeInputField;