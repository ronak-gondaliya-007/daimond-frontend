import React, { useEffect, useRef, useState } from 'react';
import InputField from 'components/FormFields/InputField';
import TextAreaField from 'components/FormFields/TextAreaField';
import { useForm } from 'react-hook-form';
import { expenseForm } from 'static/form-data/expense-form';
import SelectField from 'components/FormFields/SelectField';
import DatePickerField from 'components/FormFields/DatePickerField';
import { toast } from 'react-toastify';
import axiosClient from 'api/AxiosClient';
import SuccessPopup from '../Popup';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

const ExpenseForm = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { register, handleSubmit, formState: { errors }, reset, control, setValue } = useForm();

    const [showModel, setShowModel] = useState(false);
    const [expenseDetail, setExpenseDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (params.expenseId) fetchExpenseDetail(params.expenseId);
    }, [params.expenseId]);

    useEffect(() => {
        if (expenseDetail) {
            const formattedDate = expenseDetail.expenseDate ? format(new Date(expenseDetail.expenseDate), 'yyyy-MM-dd') : '';

            setValue('amount', expenseDetail.amount);
            setValue('invoiceNumber', expenseDetail.invoiceNumber);
            setValue('description', expenseDetail.description);
            setValue('expenseDate', formattedDate);
            setValue('category', { value: expenseDetail.category, label: expenseDetail.category });
        }
    }, [expenseDetail, setValue]);

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
                        onInput={(e) => {
                            if (field.name === "amount") {
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '');
                            }
                        }}
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
                        errors={errors}
                        control={control}
                    />
                )

            case "DATEPICKER":
                return (
                    <DatePickerField
                        {...field}
                        control={control}
                        errors={errors}
                    />
                );

            default:
                return <></>
        }
    }

    const fetchExpenseDetail = async (expenseId) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post(`/expense/detail`,
                { expenseId },
                { headers: { 'Content-Type': 'application/json' } });

            if (response.status === 200) {
                toast.success(response?.data?.message);
                setExpenseDetail(response.data.data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    };

    const handleClosePopup = () => {
        setShowModel(false);
    };

    const handleReset = () => {
        reset();
        setShowModel(false);
    };

    const handleCustomButton = () => {
        navigate(-1);
        setShowModel(false);
    };

    const onSubmit = async (data) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        if (!params.expenseId) {
            createExpenseApiCall(data);
        } else {
            updateExpenseApiCall(data);
        }
    };

    const createExpenseApiCall = async (data) => {
        try {
            const response = await axiosClient.post('/expense/create',
                {
                    category: data.category.value,
                    invoiceNumber: data.invoiceNumber,
                    amount: data.amount,
                    expenseDate: data.expenseDate,
                    description: data.description
                },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 201) {
                toast.success(response?.data?.message);
                setShowModel(true);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
        }
    }

    const updateExpenseApiCall = async (data) => {
        try {
            const payload = { ...data };
            payload.expenseId = params.expenseId;
            payload.category = data?.category?.value;

            const response = await axiosClient.post('/expense/update',
                payload,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                toast.success(response?.data?.message);
                navigate(-1);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
        }
    }

    return (
        <div className='w-full h-full p-[20px] max-w-[100rem] flex flex-col mx-auto'>
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Overview</h6>
            </div>
            <div className='relative border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[30px]'>
                <form className="stock-add" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    {
                        expenseForm.map((field) => (
                            getComponent(field)
                        ))
                    }
                    <div className='w-full flex items-center justify-end gap-[20px]'>
                        <button type='button' className='w-[150px] h-[48px] outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px]' onClick={() => reset()}>Reset</button>
                        <button type='submit' className='w-[150px] h-[48px] outline-none rounded-[12px] bg-[#342C2C] text-white text-[16px]'>Submit</button>
                    </div>
                </form>
            </div>
            {showModel && <SuccessPopup onClose={handleClosePopup} onAddMore={handleReset} buttonName={'Expense'} handleCustomButton={handleCustomButton} />}
        </div>
    );
};

const Row = ({ row, getComponent }) => (
    <div key={row.id} className='w-full flex gap-[10px]'>
        {
            row.childrens.map((field) => getComponent(field))
        }
    </div>
);

export default ExpenseForm; 