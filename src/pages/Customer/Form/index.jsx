import axiosClient from 'api/AxiosClient';
import InputField from 'components/FormFields/InputField';
import PhoneInputField from 'components/FormFields/PhoneInputField/PhoneInputField';
import SelectField from 'components/FormFields/SelectField';
import TextAreaField from 'components/FormFields/TextAreaField';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customerForm, vendorForm } from 'static/form-data/customer-form';

const CustomerAdd = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const routeTitle = location.pathname.slice();

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            userType: routeTitle === '/customer/add' ? 'Customer' : 'Vendor'
        }
    });

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

    const onSubmit = async (data) => {
        try {
            const response = await axiosClient.post('/customer/register',
                {
                    userType: data.userType,
                    name: data.customerName,
                    company: data.companyName,
                    email: data.email,
                    phone: data.contactNumber,
                    address: data.address
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 201) {
                toast.success(response?.data?.message);
                if (data.userType === 'Customer') {
                    navigate('/customer');
                } else {
                    navigate('/vendor');
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className='px-[100px] py-[50px]'>
            <form className="stock-add" onSubmit={handleSubmit(onSubmit)}>
                {
                    routeTitle === '/customer/add' ?
                        customerForm.map((field) => (
                            getComponent(field)
                        )) : vendorForm.map((field) => (
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