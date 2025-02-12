import React, { useEffect, useRef, useState } from 'react';
import InputField from 'components/FormFields/InputField';
import TextAreaField from 'components/FormFields/TextAreaField';
import { useForm } from 'react-hook-form';
import { giaForm, loosePurchaseForm, parcelPurchaseForm } from 'static/form-data/purchase-form';
import addIcon from 'assets/images/add.svg';
import deleteIcon from 'assets/images/delete.svg';
import { useNavigate, useParams } from 'react-router-dom';
import SelectField from 'components/FormFields/SelectField';
import axiosClient from 'api/AxiosClient';
import { toast } from 'react-toastify';
import LocationField from 'components/FormFields/LocationField';
import MultiInputField from 'components/FormFields/MultiInputField';
import Loader from 'components/loader';

const FORM_ROW = {
    "loose": loosePurchaseForm,
    "parcel": parcelPurchaseForm,
    "gia": giaForm
}

const PurchaseForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const purchaseId = params?.purchaseId;

    const { register, handleSubmit, formState: { errors }, reset, control, watch, getValues, setValue } = useForm({ defaultValues: { pic: '1' } });

    const [formType, setFormType] = useState('');
    const [purchaseForm, setPurchaseForm] = useState();
    const [newImages, setNewImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [removedImages, setRemovedImages] = useState([]);
    const [purchaseDetail, setPurchaseDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    const isFetchingRef = useRef(false);

    useEffect(() => {
        switch (formType) {
            case 'loose':
                setPurchaseForm(loosePurchaseForm);
                break;
            case 'parcel':
                setPurchaseForm(parcelPurchaseForm);
                break;
            default:
                setPurchaseForm(giaForm);
                break;
        }
    }, [formType]);

    useEffect(() => {
        if (isFetchingRef.current) return;
        if (purchaseId) fetchPurchaseDetail(purchaseId);
    }, [purchaseId]);

    useEffect(() => {
        if (purchaseDetail != null) {
            const updatedForm = purchaseForm.map((field) => {
                if (field.type === "ROW") {
                    return {
                        ...field,
                        childrens: field.childrens.map((child) => {
                            if (child.name === "location") {
                                const updatedOptions = child.options.map(option => option.value);
                                if (!updatedOptions.includes(purchaseDetail.location)) {
                                    child.options.unshift({ value: purchaseDetail.location, label: purchaseDetail.location });
                                }
                                if (child.options.length > 4 && child.options[0].value !== purchaseDetail.location) {
                                    child.options.shift();
                                }
                                return { ...child };
                            }
                            return child;
                        }),
                    };
                }
                return field;
            });

            setPurchaseForm(updatedForm);
        }
    }, [purchaseDetail]);

    const caratValue = watch('carat');
    const pricePerCaratValue = watch('pricePerCarat');

    useEffect(() => {
        if (caratValue && pricePerCaratValue) {
            const price = (caratValue * pricePerCaratValue)?.toFixed(2);
            setValue('price', isNaN(price) ? '0' : price?.toString());
        } else {
            setValue('price', '0');
        }
    }, [caratValue, pricePerCaratValue, setValue]);

    const fetchPurchaseDetail = async (purchaseId) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/purchase/detail`,
                { purchaseId },
                { headers: { 'Content-Type': 'application/json' } });

            if (response.status === 200) {
                toast.success(response?.data?.message);
                let purchaseData = response.data.data;
                const key = Object.entries(stockType).find(([key, value]) => value === purchaseData.type)?.[0];
                setFormType(key)

                setPurchaseDetail(purchaseData);

                const mappedOldImages = purchaseData.diamondImages?.map((img) => ({
                    file: {},
                    preview: `${process.env.REACT_APP_IMAGE_URL}${img}`
                }));
                setOldImages(mappedOldImages);

                for (const key in purchaseData) {
                    if (purchaseData.hasOwnProperty(key)) {
                        setValue(key, purchaseData[key]);
                    }
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
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
                        readOnly={field.readOnly}
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
                        setValue={setValue}
                        getValues={getValues}
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

            const response = await axiosClient.post('/purchase/upload-image', formData, {
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
            const response = await axiosClient.post('/purchase/remove-image', { url: removedImages }, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                toast.success(response?.data?.message);
                setRemovedImages([]);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const purchaseType = {
        "gia": 'GIA Stone',
        "loose": 'Loose Stone',
        "parcel": 'Parcel Good'
    }

    const onSubmit = async (data) => {
        try {
            data.type = purchaseType[formType];

            // Remove deleted old images
            if (removedImages.length > 0) {
                await handleRemovedImage();
            }

            // Upload new images first
            if (newImages.length > 0) {
                const uploadedImageUrls = await handleImageUpload();

                // Combine new and remaining old image URLs
                const allImageUrls = [
                    ...(purchaseDetail ? purchaseDetail.diamondImages : []),
                    ...uploadedImageUrls,
                ];
                data.diamondImages = allImageUrls;

                setRemovedImages(uploadedImageUrls);
            }

            delete data.images;

            const endPoint = purchaseId ? '/purchase/update' : '/purchase/add-new';

            if (purchaseId) {
                data.purchaseId = purchaseId;
                if ([purchaseType['loose'], purchaseType['parcel']].includes(data.type)) delete data.diamondImages;
                data.carat = data.carat?.toString();
                data.pic = data.pic?.toString();
                delete data.availableCarat;
                delete data.memoCarat;
                delete data.soldCarat;
                delete data._id;
                delete data.diamondId;
                delete data.status;
                delete data.isDeleted;
                delete data.deletedAt;
                delete data.createdBy;
                delete data.createdAt;
                delete data.updatedAt;
                delete data.__v;
            };

            const response = await axiosClient.post(endPoint, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201 || response.status === 200) {
                navigate(-1);
                toast.success(response?.data?.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        loading ? <Loader /> :
            <div className='px-[100px] py-[50px]'>
                <div className="flex gap-[10px] mb-[20px]">
                    <span className="w-7 h-7 rounded-full text-center font-medium border-2 border-black bg-black text-white">1</span>
                    <p className='text-[20px] font-medium'>Select Purchase Type</p>
                </div>
                <div className='mb-[10px]'>
                    <label className='text-[#333] leading-[140%] font-medium'>Purchase Type</label>
                </div>
                <div className="radio-buttons flex gap-[50px]">
                    <div className={`${formType === 'gia' ? 'border-2 border-[#1373e7] bg-[#e7f1fd] p-[15px] rounded-[6px]' : 'border-2 border-gray p-[15px] rounded-[6px]'} ${purchaseId ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <label className='flex items-center justify-center cursor-pointer gap-[15px]'>
                            <input
                                type="radio"
                                name="formType"
                                value="gia"
                                checked={formType === 'gia'}
                                onChange={() => { setFormType('gia'); reset(); }}
                                className="peer hidden"
                                disabled={purchaseId}
                            />
                            <span className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
                                {formType === 'gia' && <div className="w-3 h-3 bg-[#1373e7] rounded-full"></div>}
                            </span>
                            <span className={formType === 'loose' ? 'font-medium' : ''}>GIA Diamond</span>
                        </label>
                    </div>
                    <div className={`${formType === 'loose' ? 'border-2 border-[#1373e7] bg-[#e7f1fd] p-[15px] rounded-[6px]' : 'border-2 border-gray p-[15px] rounded-[6px]'} ${purchaseId ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <label className='flex items-center justify-center cursor-pointer gap-[15px]'>
                            <input
                                type="radio"
                                name="formType"
                                value="loose"
                                checked={formType === 'loose'}
                                onChange={() => { setFormType('loose'); reset(); }}
                                className="peer hidden"
                                disabled={purchaseId}
                            />
                            <span
                                className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
                                {formType === 'loose' && <div className="w-3 h-3 bg-[#1373e7] rounded-full"></div>}
                            </span>
                            <span className={formType === 'loose' ? 'font-medium' : ''}>Loose Diamond</span>
                        </label>
                    </div>
                    <div className={`${formType === 'parcel' ? 'border-2 border-[#1373e7] bg-[#e7f1fd] p-[15px] rounded-[6px]' : 'border-2 border-gray p-[15px] rounded-[6px]'} ${purchaseId ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <label className='flex items-center justify-center cursor-pointer gap-[15px]'>
                            <input
                                type="radio"
                                name="formType"
                                value="parcel"
                                checked={formType === 'parcel'}
                                onChange={() => { setFormType('parcel'); reset(); }}
                                className="peer hidden"
                                disabled={purchaseId}
                            />
                            <span className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-500">
                                {formType === 'parcel' && <div className="w-3 h-3 bg-[#1373e7] rounded-full"></div>}
                            </span>
                            <span className={formType === 'loose' ? 'font-medium' : ''}>Parcel Diamond</span>
                        </label>
                    </div>
                </div>
                {
                    formType !== "" &&
                    <form className="stock-add" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-[10px] mt-[40px] mb-[20px]">
                            <span className="w-7 h-7 rounded-full text-center font-medium border-2 border-black bg-black text-white">2</span>
                            <p className='text-[20px] font-medium'>Enter Purchase Detail</p>
                        </div>
                        {
                            FORM_ROW[formType].map((field) => (
                                getComponent(field)
                            ))
                        }
                        <div className='w-full flex items-center justify-end gap-[20px]'>
                            {!purchaseId && <button type='button' className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]' onClick={() => reset()}>Reset</button>}
                            {purchaseId && <button type='button' className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]' onClick={() => navigate(-1)}>Cancel</button>}
                            <button type='submit' className='w-[150px] h-[48px] outline-none rounded-[12px] bg-[#342C2C] text-white text-[16px]'>Submit</button>
                        </div>
                    </form>
                }
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
    rule,
    newImages,
    oldImages,
    handleNewImageUpload,
    handleDeleteImage,
    register,
    errors,
    setValue,
    getValues
}) => {
    setValue(name, oldImages);

    const isVerified = getValues(name)?.length > 0 || newImages.length > 0;

    return (
        <div className="w-full flex flex-col mb-[10px]">
            <div className={`w-full h-[120px] bg-[#eff1f9] px-[10px] py-[5px] border-[1px] border-[#d1e9ff] border-dashed rounded-[8px] mb-[16px]`}>
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
                            {...register(name)}
                            onChange={handleNewImageUpload}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseForm;