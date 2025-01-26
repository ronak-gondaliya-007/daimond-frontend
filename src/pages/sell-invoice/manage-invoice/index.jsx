import React from 'react'
import { getCurrency } from 'utils'

const ManageInvoices = () => {
    return (
        <div className="w-full h-full p-[20px] max-w-[100rem] flex flex-col mx-auto overflow-auto">
            <div className="w-full flex justify-between items-center mb-[24px]">
                <h6 className="text-[16px]">Manage invoices</h6>
            </div>

            <div className='relative flex-1 border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[30px]'>
                <div className='w-full flex justify-between items-center mb-[20px] border-b border-[#D0D0D0] pb-[20px]'>
                    <h6 className='text-[16px]'>Invoice #12345</h6>

                    <div className='flex items-center gap-[12px]'>
                        <button className='text-[12px] text-[#414651] px-[12px] py-[8px] border border-[#D5D7DA] rounded-[6px]'>
                            Mark as Paid
                        </button>
                        <button className='text-[12px] text-[#414651] px-[12px] py-[8px] border border-[#D5D7DA] rounded-[6px]'>
                            Edit Invoice
                        </button>
                        <button className='text-[12px] text-[#414651] px-[12px] py-[8px] border border-[#D5D7DA] rounded-[6px]'>
                            Email Invoice
                        </button>
                        <button className='text-[12px] text-white px-[12px] py-[8px] bg-[#219653] rounded-[6px]'>
                            Download
                        </button>
                    </div>
                </div>

                <div className='flex flex-col text-[11px] border-b border-[#D0D0D0] py-[20px]'>
                    <p className='font-medium mb-[14px]'>Basic Details</p>
                    <div className='flex justify-between flex-wrap'>
                        <div className='flex flex-col basis-[120px] mb-[14px]'>
                            <span className='font-medium'>Invoice Date</span>
                            <span className='text-[#9199A3]'>09/03/2024</span>
                        </div>
                        <div className='flex flex-col basis-[120px] mb-[14px]'>
                            <span className='font-medium'>Due Date</span>
                            <span className='text-[#9199A3]'>09/03/2024</span>
                        </div>
                        <div className='flex flex-col basis-[120px] mb-[14px]'>
                            <span className='font-medium'>Customer Name</span>
                            <span className='text-[#9199A3]'>Nirav Patel</span>
                        </div>
                        <div className='flex flex-col basis-[120px] mb-[14px]'>
                            <span className='font-medium'>Terms</span>
                            <span className='text-[#9199A3]'>Nirav Patel</span>
                        </div>
                        <div className='flex flex-col basis-[120px] mb-[14px]'>
                            <span className='font-medium'>Due Date</span>
                            <span className='text-[#9199A3]'>Nirav Patel</span>
                        </div>
                    </div>
                    <div className='flex flex-col mb-[14px]'>
                        <span className='font-medium'>Ship To</span>
                        <span className='text-[#9199A3]'>02/03/2024</span>
                    </div>
                    <div className='flex flex-col mb-[14px]'>
                        <span className='font-medium'>Bill To</span>
                        <span className='text-[#9199A3]'>02/03/2024</span>
                    </div>
                </div>

                <div className='mt-[20px] border border-[#E9EAEB] rounded-[12px] overflow-auto'>
                    <CustomTable />
                </div>

                <div className='mt-[20px]'>
                    <p className='text-[14px] font-medium'>Payment Details</p>
                </div>
                <div className='mt-[20px]'>
                    <p className='text-[14px] font-medium'>Outstanding Amount</p>
                </div>
            </div>
        </div>
    )
}

function CustomTable() {
    const table = [
        {
            _id: 1,
            description: "Description",
            carat: "1.2",
            pcs: "6",
            pricePerCarat: "1000",
            total: "3000"
        },
        {
            _id: 2,
            description: "Description",
            carat: "1.2",
            pcs: "6",
            pricePerCarat: "1000",
            total: "3000"
        },
    ]
    return (
        <table className='w-full'>
            <thead className='h-[44px] bg-[#FAFAFA] text-[#717680] border border-[#E9EAEB] border-x-0 border-t-0'>
                <tr className='text-[10px]'>
                    <td className='pl-[20px] w-[210px]'>Description</td>
                    <td className='text-center'>Carat</td>
                    <td className='text-center'>PCS</td>
                    <td className='text-center'>Price/Ct</td>
                    <td className='text-center'>Total</td>
                </tr>
            </thead>
            <tbody>
                {
                    table.map(({ _id, description, carat, pcs, pricePerCarat, total }) => (
                        <tr className='h-[60px] text-[12px] border border-[#E9EAEB] border-x-0 border-t-0' key={_id}>
                            <td className='pl-[20px] w-[210px]'>{description}</td>
                            <td className='text-center'>{carat}</td>
                            <td className='text-center'>{pcs}</td>
                            <td className='text-center font-semibold'>{pricePerCarat}</td>
                            <td className='text-center font-semibold'>{total}</td>
                        </tr>
                    ))
                }
                <tr className='h-[60px] text-[12px] border border-[#E9EAEB] border-x-0 border-t-0'>
                    <td colSpan={4} className='p-[20px]'>
                        <div className='flex flex-col'>
                            <span className='h-[22px]'>Subtotal</span>
                            <span className='h-[22px]'>Tax</span>
                            <span className='h-[22px]'>Grand Total</span>
                        </div>
                    </td>
                    <td className='text-center p-[20px] flex flex-col'>
                        <div className='flex flex-col'>
                            <span className='h-[22px] font-semibold'>{getCurrency(200)}</span>
                            <span className='h-[22px] font-semibold'>{getCurrency(10000)}</span>
                            <span className='h-[22px] font-semibold'>{getCurrency(10200)}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ManageInvoices