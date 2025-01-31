const InputField = ({
    id,
    label,
    inpType = "text",
    name,
    placeholder = "",
    readOnly = false,
    register,
    rule,
    errors,
    onInput = {}
}) => (
    <div className="form-group mb-[16px]">
        <label htmlFor={id}>{label}</label>
        <input
            type={inpType}
            id={id}
            placeholder={placeholder}
            className={`input-field ${errors?.[name] ? "error" : ""}`}
            readOnly={readOnly}
            min={20}
            max={60}
            onInput={onInput}
            {...register(name, rule)}
        />
        {!!errors?.[name] && <span className="error-text">{errors[name].message}</span>}
    </div>
);

export default InputField;