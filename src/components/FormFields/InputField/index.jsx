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

export function CommonInput({ name, value, placeholder, onChange }) {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            className="w-full h-[40px] hover:border focus:border border-1 border-[#408dfb] rounded-[8px] px-[10px] py-[10px] outline-none"
            value={value}
            onChange={onChange}
        />
    )
}

export default InputField;