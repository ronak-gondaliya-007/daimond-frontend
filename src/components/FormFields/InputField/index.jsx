import '../../../assets/css/fields.css';

const InputField = ({ id, label, type = "text", value, onChange }) => (
    <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default InputField;