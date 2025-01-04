import '../../../assets/css/fields.css';

const TextAreaField = ({ label, id, value, onChange }) => (
    <div className="form-group single">
        <label htmlFor={id}>{label}</label>
        <textarea
            id={id}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default TextAreaField;