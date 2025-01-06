import React, { useState } from 'react';
import InputField from 'components/FormFields/InputField';
import TextAreaField from 'components/FormFields/TextAreaField';
import { useForm } from 'react-hook-form';
import { stockForm } from 'static/form-data/stock-form';
import addIcon from 'assets/images/add.svg';
import deleteIcon from 'assets/images/delete.svg';
import { useParams } from 'react-router-dom';

const StockForm = () => {
    const { stockId } = useParams();
    console.log({ stockId })

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [images, setImages] = useState([]);

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
    <div key={row.id} className='w-full flex items-center gap-[10px]'>
        {
            row.childrens.map((field) => getComponent(field))
        }
    </div>
)

const BasicImage = ({
    label,
    images,
    setImages
}) => {

    const handleChange = (element) => {
        const imgList = element.target.files;
        const list = [];

        Array.from(imgList).forEach((ele) => list.push(URL.createObjectURL(ele)))
        setImages([...images, ...list])
    }

    const handleDelete = (index) => {
        const newImgList = images.filter((_, i) => i !== index);
        setImages(newImgList);
    }

    return (
        <div className='w-full h-[120px] bg-[#FAFAFA] px-[10px] py-[5px] border-[1px] border-[#d1e9ff] border-dashed rounded-[8px] mb-[16px]'>
            <label className='text-[12px] text-[#717680] mb-[5px]'>{label}</label>

            <div className='flex gap-[10px]'>
                {
                    !!images.length &&
                    images.map((src, index) => (
                        <div key={index} className='relative w-[96px] h-[80px] rounded-[8px] bg-[#F5F5F5] border-[1px] border-[#EFF1F999] border-dashed'>
                            <img src={src} alt='' className='w-full h-full object-cover rounded-[8px]' />
                            <span className='cursor-pointer absolute top-[3px] right-[3px]' onClick={() => handleDelete(index)}>
                                <img src={deleteIcon} alt='delete' className='w-[25px] h-[25px] rounded-[12px]' />
                            </span>
                        </div>
                    ))
                }
                <div className='relative w-[96px] h-[80px] rounded-[8px] bg-[#F5F5F5] border-[1px] border-[#EFF1F999] border-dashed'>
                    <img src={addIcon} alt='image-upload' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                    <input
                        type={"file"}
                        className='w-full h-full opacity-0 cursor-pointer'
                        accept='.jpeg, .png, .jpeg'
                        onChange={(element) => handleChange(element)}
                        value={""}
                    />
                </div>
            </div>
        </div>
    )
}

export default StockForm;