import { useState } from "react";

const MultiInputField = ({
    id,
    label,
    type = "text",
    name,
    register,
    errors,
    getValues
}) => {
    const [lengthValue, setLengthValue] = useState(0);
    const [widthValue, setWidthValue] = useState(0);
    const [heightValue, setHeightValue] = useState(0);

    const handleLengthChange = (e) => {
        setLengthValue(e.target.value !== "" ? e.target.value : 0);
    };

    const handleWidthChange = (e) => {
        setWidthValue(e.target.value !== "" ? e.target.value : 0);
    };

    const handleHeightChange = (e) => {
        setHeightValue(e.target.value !== "" ? e.target.value : 0);
    };
    
    return (
        <div className="form-group mb-[16px]">
            <label htmlFor={id}>{label}</label>
            <div className='flex gap-[10px]'>
                <div className="main-relative flex flex-row w-[40%] gap-[5px] items-center">
                    {/* Measurment Disable Input */}
                    <input
                        placeholder=""
                        className={`input-field ${errors?.[name]?.measurement ? 'error' : ''}`}
                        type={type}
                        disabled={true}
                        value={`${getValues(`${name}.length`) === "" || getValues(`${name}.length`) === undefined ? lengthValue : getValues(`${name}.length`)} x ${getValues(`${name}.length`) === "" || getValues(`${name}.length`) === undefined ? widthValue : getValues(`${name}.width`)} x ${getValues(`${name}.height`) === "" || getValues(`${name}.length`) === undefined ? heightValue : getValues(`${name}.height`)}`}
                    />
                    <span className='text-[#717680] font-medium'>=</span>
                </div>
                <div className="main-relative flex flex-row w-[60%] gap-[5px] items-center">
                    {/* Length Input */}
                    <div className="relative">
                        <label>Length</label>
                        <input
                            placeholder="Enter Length"
                            className={`input-field ${errors?.[name]?.length ? 'error' : ''}`}
                            type={type}
                            name={'length'}
                            {...register(`${name}.length`, {
                                pattern: {
                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                    message: "*Invalid Length"
                                }
                            })}
                            onInput={(e) => handleLengthChange(e)}
                        />
                        {/* Length Error */}
                        {errors?.[name]?.length && (
                            <span className="error-text absolute left-0 bottom-[-20px] text-red-500">
                                {errors[name].length.message}
                            </span>
                        )}
                    </div>
                    <span className='text-[#717680] font-medium'>×</span>
                    {/* Width Input */}
                    <div className="relative">
                        <label>Width</label>
                        <input
                            placeholder="Enter Width"
                            className={`input-field ${errors?.[name]?.width ? 'error' : ''}`}
                            type={type}
                            name={'width'}
                            {...register(`${name}.width`, {
                                pattern: {
                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                    message: "*Invalid Width"
                                }
                            })}
                            onInput={(e) => handleWidthChange(e)}
                        />
                        {/* Width Error */}
                        {errors?.[name]?.width && (
                            <span className="error-text absolute left-0 bottom-[-20px] text-red-500">
                                {errors[name].width.message}
                            </span>
                        )}
                    </div>
                    <span className='text-[#717680] font-medium'>×</span>
                    {/* Height Input */}
                    <div className="relative">
                        <label>Height</label>
                        <input
                            placeholder="Enter Height"
                            className={`input-field ${errors?.[name]?.height ? 'error' : ''}`}
                            type={type}
                            name={'height'}
                            {...register(`${name}.height`, {
                                pattern: {
                                    value: /^[0-9]+(\.[0-9]+)?$/,
                                    message: "*Invalid Height"
                                }
                            })}
                            onInput={(e) => handleHeightChange(e)}
                        />
                        {/* Height Error */}
                        {errors?.[name]?.height && (
                            <span className="error-text absolute left-0 bottom-[-20px] text-red-500">
                                {errors[name].height.message}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MultiInputField;