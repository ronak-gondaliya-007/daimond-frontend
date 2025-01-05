const InputField = ({
    id,
    label,
    type = "text",
    name,
    placeholder = "",
    register,
    rule,
    errors
}) => (
    <div className="form-group mb-[16px]">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            placeholder={placeholder}
            {...register(name, rule)}
        />
        {!!errors?.[name] && <span className="error-text">{errors[name].message}</span>}
    </div>
);

export default InputField;