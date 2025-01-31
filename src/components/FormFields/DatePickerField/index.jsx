import { calendar } from "assets/utils/images";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

const DatePickerField = ({ name, label, control, errors, placeholder, rule }) => {
    return (
        <div className="w-full flex gap-[10px]">
            <div className="form-group mb-[16px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <Controller
                    name={name}
                    control={control}
                    rules={rule}
                    render={({ field }) => (
                        <div className="relative w-full">
                            <DatePicker
                                {...field}
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                placeholderText={placeholder}
                                dateFormat="yyyy-MM-dd"
                                showYearDropdown
                                showMonthDropdown
                                dropdownMode="select"
                                ref={(ref) => {
                                    field.ref = ref;
                                    field.inputRef = ref;
                                }}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => field.inputRef.setOpen(true)}>
                                <img src={calendar} alt="Calendar" />
                            </div>
                        </div>
                    )}
                />
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
            </div>
        </div>
    );
};

export default DatePickerField;
