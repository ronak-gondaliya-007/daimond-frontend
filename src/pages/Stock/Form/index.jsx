import React, { useEffect, useRef, useState } from 'react';
import InputField from 'components/FormFields/InputField';
import TextAreaField from 'components/FormFields/TextAreaField';
import { useForm } from 'react-hook-form';
import { stockForm as initialStockForm } from 'static/form-data/stock-form';
import addIcon from 'assets/images/add.svg';
import deleteIcon from 'assets/images/delete.svg';
import { useParams } from 'react-router-dom';
import SelectField from 'components/FormFields/SelectField';
import axiosClient from 'api/AxiosClient';
import { toast } from 'react-toastify';
import LocationField from 'components/FormFields/LocationField';
import MultiInputField from 'components/FormFields/MultiInputField';

const StockForm = () => {
    const { stockId } = useParams();

    const { register, handleSubmit, formState: { errors }, reset, control, getValues, setValue } = useForm();

    const [loading, setLoading] = useState(false);
    const [stockForm, setStockForm] = useState(initialStockForm);
    const [images, setImages] = useState([]);

    const isFetchingRef = useRef(false);

    const fetchOptions = async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        try {
            const response = await axiosClient.get('/stock/all-vendors', {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                const vendorOptions = response?.data?.data?.map(vendor => ({
                    label: vendor.name,
                    value: vendor._id,
                }));

                const updatedForm = stockForm.map((field) => {
                    if (field.type === "ROW") {
                        return {
                            ...field,
                            childrens: field.childrens.map((child) => {
                                if (child.name === "vendorId") {
                                    return { ...child, options: vendorOptions };
                                }
                                return child;
                            }),
                        };
                    }
                    return field;
                });

                setStockForm(updatedForm);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
        }
    };

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchOptions();
    }, []);

    const getComponent = (field) => {
        switch (field.type) {
            case "ROW":
                return <Row row={field} getComponent={getComponent} />

            case "INPUT":
                return (
                    <InputField
                        {...field}
                        register={register}
                        errors={errors}
                    />
                )

            case "MULTI_INPUT":
                return (
                    <MultiInputField
                        {...field}
                        register={register}
                        errors={errors}
                    />
                )

            case "TEXTAREA":
                return (
                    <TextAreaField
                        {...field}
                        register={register}
                        errors={errors}
                    />
                )

            case "IMAGE":
                return (
                    <BasicImage
                        {...field}
                        images={images}
                        setImages={setImages}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                    />
                )

            case "SELECT":
                return (
                    <SelectField
                        {...field}
                        errors={errors}
                        control={control}
                    />
                )

            case "LOCATION":
                return (
                    <LocationField
                        {...field}
                        errors={errors}
                        control={control}
                    />
                )

            default:
                return <></>
        }
    }

    const onSubmit = (data) => {
        console.log({ ...data, images });
    }

    return (
        <div className='px-[100px] py-[50px]'>
            <form className="stock-add" onSubmit={handleSubmit(onSubmit)}>
                {
                    stockForm.map((field) => (
                        getComponent(field)
                    ))
                }
                <div className='w-full flex items-center justify-end gap-[20px]'>
                    <button type='button' className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]' onClick={() => reset()}>Reset</button>
                    <button type='submit' className='w-[150px] h-[48px] outline-none rounded-[12px] bg-[#342C2C] text-white text-[16px]'>Submit</button>
                </div>
            </form>
        </div>
    );
};

const Row = ({ row, getComponent }) => (
    <div key={row.id} className='w-full flex gap-[10px]'>
        {
            row.childrens.map((field) => getComponent(field))
        }
    </div>
)

const BasicImage = ({
    label,
    images,
    setImages,
    name,
    register,
    setValue,
    errors,
    rule,
}) => {
    const handleChange = (e) => {
        const imgList = e.target.files;
        const list = Array.from(imgList).map((file) => URL.createObjectURL(file));

        setImages([...images, ...list]); // Update the preview images
        setValue(name, imgList); // Update the form value
    };

    const handleDelete = (index) => {
        const newImgList = images.filter((_, i) => i !== index);
        setImages(newImgList);
    };

    return (
        <div className="w-full flex flex-col mb-[10px]">
            <div className={`w-full h-[120px] bg-[#eff1f9] px-[10px] py-[5px] border-[1px] border-[#d1e9ff] border-dashed rounded-[8px] ${errors?.[name] ? "border-[#ef4444]" : "mb-[16px]"}`}>
                <label
                    className="text-[12px] text-[#717680] mb-[5px]"
                    style={{ fontWeight: "500" }}
                >
                    {label}
                </label>
                <div className="flex gap-[10px]">
                    {images.length > 0 &&
                        images.map((src, index) => (
                            <div
                                key={index}
                                className="relative w-[96px] h-[80px] rounded-[8px] bg-[#eff1f9] border-[1px] border-[#d1e9ff] border-dashed"
                            >
                                <img
                                    src={src}
                                    alt=""
                                    className="w-full h-full object-cover rounded-[8px]"
                                />
                                <span
                                    className="cursor-pointer absolute top-[3px] right-[3px]"
                                    onClick={() => handleDelete(index)}
                                >
                                    <img
                                        src={deleteIcon}
                                        alt="delete"
                                        className="w-[25px] h-[25px] rounded-[12px]"
                                    />
                                </span>
                            </div>
                        ))}
                    <div className="relative w-[96px] h-[80px] rounded-[8px] bg-[#f5f5f5] border-[1px] border-[#d1e9ff] border-dashed">
                        <img
                            src={addIcon}
                            alt="image-upload"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                        <input
                            type="file"
                            className={`w-full h-full opacity-0 cursor-pointer ${errors?.[name] ? "error" : ""
                                }`}
                            accept=".jpeg, .png, .jpg"
                            multiple
                            onChange={handleChange}
                        // {...register(name, rule)}
                        />
                    </div>
                </div>
            </div>
            {!!errors[name] && (
                <span className="error-text">{errors[name].message}</span>
            )}
        </div>
    );
};

export default StockForm;