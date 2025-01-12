const TextAreaField = ({
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
        <textarea
            type={type}
            id={id}
            placeholder={placeholder}
            className={`text-area-field ${errors?.[name] ? "error" : ""}`}
            {...register(name, rule)}
        />
        {!!errors?.[name] && <span className="error-text">{errors[name].message}</span>}
    </div>
);

export default TextAreaField;