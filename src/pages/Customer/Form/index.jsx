import InputField from 'components/FormFields/InputField';
import PhoneInputField from 'components/FormFields/PhoneInputField/PhoneInputField';
import SelectField from 'components/FormFields/SelectField';
import TextAreaField from 'components/FormFields/TextAreaField';
import React from 'react'
import { useForm } from 'react-hook-form';
import { customerForm } from 'static/form-data/customer-form';

const CustomerAdd = () => {

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

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

            case "SELECT":
                return (
                    <SelectField
                        {...field}
                        register={register}
                        errors={errors}
                    />
                )

                case "PHONE_INPUT":
                return (
                    <PhoneInputField
                        {...field}
                        control={control}
                        errors={errors}
                    />
                )

            default:
                return <></>
        }
    }

    const onSubmit = (data) => {
        console.log({ ...data });
    }

    return (
        <div className='px-[100px] py-[50px]'>
            <form className="stock-add" onSubmit={handleSubmit(onSubmit)}>

                {
                    customerForm.map((field) => (
                        getComponent(field)
                    ))
                }

                <div className='w-full flex items-center justify-end gap-[20px]'>
                    <button type='button' className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]' onClick={() => reset()}>Reset</button>
                    <button type='submit' className='w-[150px] h-[48px] outline-none rounded-[12px] bg-[#342C2C] text-white text-[16px]'>Submit</button>
                </div>
            </form>
        </div>
    )
}

const Row = ({ row, getComponent }) => (
    <div key={row.id} className='w-full flex items-center gap-[10px]'>
        {
            row.childrens.map((field) => getComponent(field))
        }
    </div>
)

export default CustomerAdd