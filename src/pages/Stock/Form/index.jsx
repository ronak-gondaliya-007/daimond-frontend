import React, { useEffect, useRef, useState } from 'react';
import InputField from 'components/FormFields/InputField';
import TextAreaField from 'components/FormFields/TextAreaField';
import { useForm } from 'react-hook-form';
import { stockForm as initialStockForm } from 'static/form-data/stock-form';
import addIcon from 'assets/images/add.svg';
import deleteIcon from 'assets/images/delete.svg';
import { useNavigate, useParams } from 'react-router-dom';
import SelectField from 'components/FormFields/SelectField';
import axiosClient from 'api/AxiosClient';
import { toast } from 'react-toastify';
import LocationField from 'components/FormFields/LocationField';
import MultiInputField from 'components/FormFields/MultiInputField';

const StockForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { register, handleSubmit, formState: { errors }, reset, control, getValues, setValue } = useForm();

    const [stockForm, setStockForm] = useState(initialStockForm);
    const [newImages, setNewImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (isFetchingRef.current) return;
        fetchOptions();

        if (params.stockId) {
            console.log("Params Stockk Id : ", params.stockId);
            fetchStockDetail(params.stockId);
        }
    }, [params.stockId]);

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
                                if (child.name === "vendor") {
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

    const fetchStockDetail = async (stockId) => {
        try {
            const response = await axiosClient.post(`/stock/detail`,
                { stockId },
                { headers: { 'Content-Type': 'application/json' } });

            if (response.status === 200) {
                toast.success(response?.data?.message);

                let stockData = response.data.data;

                stockData.vendor = { value: stockData.vendor._id, label: stockData.vendor.name };

                const mappedOldImages = stockData.diamondImages?.map((img) => ({
                    file: {},
                    preview: `${process.env.REACT_APP_IMAGE_URL}${img}`
                }));
                setOldImages(mappedOldImages);

                const updatedForm = stockForm.map((field) => {
                    if (field.type === "ROW") {
                        return {
                            ...field,
                            childrens: field.childrens.map((child) => {
                                if (child.name === "location") {
                                    const updatedOptions = child.options.map(option => option.value);
                                    if (!updatedOptions.includes(stockData.location)) {
                                        child.options.push({ value: stockData.location, label: stockData.location })
                                    };
                                    return { ...child, options: updatedOptions };
                                }
                                return child;
                            }),
                        };
                    }
                    return field;
                });

                setStockForm(updatedForm);

                for (const key in stockData) {
                    if (stockData.hasOwnProperty(key)) {
                        if (key === 'diamondImages') {
                            setValue('images', [...newImages, ...oldImages]);
                        } else {
                            setValue(key, stockData[key]);
                        }
                    }
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

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
                        getValues={getValues}
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
                        newImages={newImages}
                        oldImages={oldImages}
                        handleNewImageUpload={handleNewImageUpload}
                        handleDeleteImage={handleDeleteImage}
                        register={register}
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

    const handleNewImageUpload = (e) => {
        const imgList = e.target.files;
        const list = Array.from(imgList).map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setNewImages([...newImages, ...list]);
    };

    const handleDeleteImage = (index, isOldImage = false) => {
        if (isOldImage) {
            const removedImage = oldImages[index];
            setOldImages(oldImages.filter((_, i) => i !== index));
            setRemovedImages([...removedImages, removedImage.preview]);
        } else {
            setNewImages(newImages.filter((_, i) => i !== index));
        }
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();

            newImages?.forEach((image) => {
                formData.append('DaimondPic', image.file);
            });

            const response = await axiosClient.post('/stock/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success(response?.data?.message);
                return response.data.data;
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const handleRemovedImage = async () => {
        try {
            const response = await axiosClient.post('/stock/remove-image', { url: removedImages }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                toast.success(response?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const onSubmit = async (data) => {
        try {
            console.log(data);

            // Upload new images first
            // const uploadedImageUrls = await handleImageUpload();

            // // Combine new and remaining old image URLs
            // const allImageUrls = [
            //     ...oldImages.map((img) => img.preview),
            //     ...uploadedImageUrls,
            // ];


            // data.diamondImages = allImageUrls;

            // // Remove deleted old images
            // if (removedImages.length > 0) {
            //     await handleRemovedImage();
            // }

            // const response = await axiosClient.post('/stock/add-new', data, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // });

            // if (response.status === 201) {
            //     navigate('/stock');
            //     toast.success(response?.data?.message);
            // }
        } catch (error) {
            // await handleRemovedImage();
            toast.error(error?.response?.data?.message);
        }
    };

    console.log("Errors : ", errors);

    return (
        <div className='px-[100px] py-[50px]'>
            <form className="stock-add" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                {
                    stockForm.map((field) => (
                        getComponent(field)
                    ))
                }
                <div className='w-full flex items-center justify-end gap-[20px]'>
                    {!params.stockId && <button type='button' className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]' onClick={() => reset()}>Reset</button>}
                    {params.stockId && <button type='button' className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]' onClick={() => navigate(-1)}>Cancel</button>}
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
    name,
    label,
    newImages,
    oldImages,
    handleNewImageUpload,
    handleDeleteImage,
    register,
    errors
}) => {

    const isVerified = oldImages.length > 0 || newImages.length > 0;

    return (
        <div className="w-full flex flex-col mb-[10px]">
            <div className={`w-full h-[120px] bg-[#eff1f9] px-[10px] py-[5px] border-[1px] border-[#d1e9ff] border-dashed rounded-[8px] 
            ${!!errors[name] && !isVerified ? "border-[#ef4444] mb-[16px]" : "mb-[16px]"}`}>
                <label
                    className="text-[12px] text-[#717680] mb-[5px]"
                    style={{ fontWeight: "500" }}
                >
                    {label}
                </label>
                <div className="flex gap-[10px]">
                    {oldImages.length > 0 &&
                        oldImages?.map((src, index) => (
                            <div key={index} className="relative w-[96px] h-[80px] rounded-[8px] bg-[#eff1f9] border-[1px] border-[#d1e9ff] border-dashed">
                                <img src={src.preview} alt="" className="w-full h-full object-cover rounded-[8px]" />
                                <span
                                    className="cursor-pointer absolute top-[3px] right-[3px]"
                                    onClick={() => handleDeleteImage(index, true)}
                                >
                                    <img src={deleteIcon} alt="delete" className="w-[25px] h-[25px] rounded-[12px]" />
                                </span>
                            </div>
                        ))}
                    {newImages?.map((src, index) => (
                        <div key={index} className="relative w-[96px] h-[80px] rounded-[8px] bg-[#eff1f9] border-[1px] border-[#d1e9ff] border-dashed">
                            <img src={src.preview} alt="" className="w-full h-full object-cover rounded-[8px]" />
                            <span
                                className="cursor-pointer absolute top-[3px] right-[3px]"
                                onClick={() => handleDeleteImage(index, false)}
                            >
                                <img src={deleteIcon} alt="delete" className="w-[25px] h-[25px] rounded-[12px]" />
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
                            className={`w-full h-full opacity-0 cursor-pointer`}
                            accept=".jpeg, .png, .jpg"
                            multiple
                            {...register(name, {
                                required: "At least one image is required.",
                                validate: () => isVerified || "At least one image must be selected.",
                            })}
                            onChange={handleNewImageUpload}
                        />
                    </div>
                </div>
            </div>
            {!!errors[name] && !isVerified && (
                <span className="error-text" style={{ marginTop: '-12px' }}>At least one image must be selected.</span>
            )}
        </div>
    );
};

export default StockForm;