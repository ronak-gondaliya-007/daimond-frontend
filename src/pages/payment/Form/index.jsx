import InputField from 'components/FormFields/InputField';
import LocationField from 'components/FormFields/LocationField';
import MultiInputField from 'components/FormFields/MultiInputField';
import SelectField from 'components/FormFields/SelectField';
import TextAreaField from 'components/FormFields/TextAreaField';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { paymentForm } from 'static/form-data/payment-form'

const PaymentAdd = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { register, handleSubmit, formState: { errors }, reset, control, watch, getValues, setValue } = useForm();

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

            // case "IMAGE":
            //     return (
            //         <BasicImage
            //             {...field}
            //             newImages={newImages}
            //             oldImages={oldImages}
            //             handleNewImageUpload={handleNewImageUpload}
            //             handleDeleteImage={handleDeleteImage}
            //             register={register}
            //             errors={errors}
            //             setValue={setValue}
            //             getValues={getValues}
            //         />
            //     )

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

    const onSubmit = () => { }

    return (
        <div className='px-[100px] py-[50px]'>
            <form className="stock-add" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                {
                    paymentForm.map((field) => (
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
    )
}

const Row = ({ row, getComponent }) => (
    <div key={row.id} className='w-full flex gap-[10px]'>
        {
            row.childrens.map((field) => getComponent(field))
        }
    </div>
)

export default PaymentAdd