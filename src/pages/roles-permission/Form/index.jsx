import React from 'react';
import InputField from 'components/FormFields/InputField';
import SelectField from 'components/FormFields/SelectField';
import TextAreaField from 'components/FormFields/TextAreaField';
import { useForm } from 'react-hook-form';
import { userForm } from 'static/form-data/user-form';
import PhoneInputField from 'components/FormFields/PhoneInputField/PhoneInputField';
import addIcon from 'assets/images/add.svg';

const RolesPermissionForm = () => {

    const { register, handleSubmit, control, formState: { errors }, reset, setValue, watch } = useForm();
    const profileImg = watch("profileImage");

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

            case "PHONE_INPUT":
                return (
                    <PhoneInputField
                        {...field}
                        control={control}
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

            default:
                return <></>
        }
    }

    const handleChange = (element) => {
        const ele = element.target.files;

        setValue("profileImage", URL.createObjectURL(ele[0]))
    }

    const onSubmit = (data) => {
        console.log({ ...data });
    }

    return (
        <div className='px-[100px] py-[50px]'>
            <form className="stock-add" onSubmit={handleSubmit(onSubmit)}>

                <div className='w-full flex items-center gap-[10px]'>
                    <div className='form-group mb-[16px] w-1/2 h-[134px] outline-none rounded-[12px] border border-[#d1e9ff] bg-[#eff1f999]'>
                        <label htmlFor='profile-image'>Profile Image</label>
                        <div className='relative w-[122px] h-[113px] mt-[26px] ml-[10px] mb-[10px] border border-[rgba(0,0,0,0.1)] rounded-[12px] cursor-pointer'>
                            {
                                (!!profileImg && profileImg?.[0])
                                    ? (
                                        <>
                                            <img src={URL.createObjectURL(profileImg[0])} alt='profile-image' className='w-full h-full object-cover rounded-[12px]' />
                                            <button type='button' className='absolute top-[6px] left-[135px] w-[180px] h-[54px] bg-[#342C2C] text-white text-[16px] rounded-[12px]'>
                                                Upload new image
                                                <input
                                                    type='file'
                                                    id='profile-image'
                                                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                                    accept='.jpeg, .png, .jpeg'
                                                    {...register('profileImage', { required: "*Profile Image is required" }, {
                                                        onChange: (element) => handleChange(element)
                                                    })}
                                                />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <img src={addIcon} alt='image-upload' className='absolute w-[44px] h-[44px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                                            <input
                                                type='file'
                                                id='profile-image'
                                                className='!w-full !h-full outline-none rounded-[12px] border-[2px] border-[#342C2C] border-solid text-[16px] opacity-0 cursor-pointer z-10'
                                                accept='.jpeg, .png, .jpeg'
                                                {...register('profileImage', { required: "*Profile Image is required" }, {
                                                    onChange: (element) => handleChange(element)
                                                })}
                                            />
                                        </>
                                    )
                            }
                        </div>
                        {!!errors?.["profileImage"] && <span className="error-text">{errors["profileImage"].message}</span>}
                    </div>

                    <div className='w-full'>
                        <InputField
                            {...{
                                id: 2,
                                name: "firstName",
                                label: "First Name",
                                type: "INPUT",
                                placeholder: "Enter First Name",
                                rule: {
                                    required: "*First Name is required"
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            {...{
                                id: 3,
                                name: "lastName",
                                label: "Last Name",
                                type: "INPUT",
                                placeholder: "Enter Last Name",
                                rule: {
                                    required: "*Last Name is required"
                                },
                            }}
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>

                {
                    userForm.map((field) => (
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

export default RolesPermissionForm