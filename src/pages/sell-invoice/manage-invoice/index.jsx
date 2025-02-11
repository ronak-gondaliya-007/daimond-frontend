import axiosClient from 'api/AxiosClient';
import { exclamationIcon, uploadCloud02 } from 'assets/utils/images'
import Loader from 'components/loader';
import NoDataFound from 'components/no-data-found';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrency } from 'utils'
import { getDate } from 'utils/dateFormat';

const ManageInvoices = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (isFetchingRef.current) return;
        if (params.sellInvoiceId) fetchInvoiceDetail(params.sellInvoiceId);
    }, [params.sellInvoiceId]);

    const fetchInvoiceDetail = async (sellInvoiceId) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/invoice/detail',
                { sellInvoiceId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                const responseData = response.data.data;
                setData(responseData);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
        }
    };

    const handleMarkAsPaid = async () => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/invoice/change-status',
                { sellInvoiceId: params.sellInvoiceId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                setIsPaid(true);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        loading ?
            <Loader />
            : data === null ?
                <NoDataFound />
                : <div className="w-full h-full p-[20px] max-w-[100rem] flex flex-col mx-auto overflow-auto">
                    <div className="w-full flex justify-between items-center mb-[24px]">
                        <h6 className="text-[16px]">Manage invoices</h6>
                    </div>

                    <div className='relative flex-1 border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[30px]'>
                        <div className='w-full flex justify-between items-center border-b border-[#D0D0D0] pb-[20px]'>
                            {/* <h6 className='text-[20px]'>Invoice #12345</h6> */}
                            <h6 className='text-[24px] font-medium'>#{data.invoiceNumber}</h6>

                            <div className='flex items-center gap-[12px]'>
                                <button
                                    className={`text-[14px] font-medium text-[#414651] px-[12px] py-[8px] border border-[#D5D7DA] rounded-[6px]
                                    ${isPaid ? 'bg-[#219653] text-white border-none' : 'text-[#414651] border border-[#D5D7DA]'}
                                    `}
                                    onClick={() => { if (!isPaid) setShowModal(true) }}
                                    disabled={isPaid}
                                >
                                    {isPaid ? 'Invoice Paid' : 'Mark as Paid'}
                                </button>
                                <button
                                    className='text-[14px] font-medium text-[#414651] px-[12px] py-[8px] border border-[#D5D7DA] rounded-[6px]'
                                    onClick={() => navigate(`/sell-invoice/edit/${params.sellInvoiceId}`)}
                                >
                                    Edit Invoice
                                </button>
                                <button className='text-[14px] font-medium text-[#414651] px-[12px] py-[8px] border border-[#D5D7DA] rounded-[6px]'>
                                    Email Invoice
                                </button>
                                <div className='flex items-center gap-[4px] bg-[#219653] rounded-[6px] px-[12px] py-[8px]'>
                                    <img className='h-[20px] w-auto' src={uploadCloud02} alt="Download" />
                                    <button className='text-[14px] text-white font-medium'>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col text-[16px] border-b border-[#D0D0D0] py-[20px]'>
                            <p className='font-medium mb-[27px]'>Basic Details</p>
                            <div className='flex justify-between flex-wrap'>
                                <div className='flex flex-col basis-[120px] mb-[27px]'>
                                    <span className='font-medium text-[14px]'>Invoice Date</span>
                                    <span className='text-[#9199A3] text-[16px]'>{getDate(data?.createdAt)}</span>
                                </div>
                                <div className='flex flex-col basis-[120px] mb-[27px]'>
                                    <span className='font-medium text-[14px]'>Due Date</span>
                                    <span className='text-[#9199A3] text-[16px]'>{getDate(data?.dueDate)}</span>
                                </div>
                                <div className='flex flex-col basis-[170px] mb-[27px]'>
                                    <span className='font-medium text-[14px]'>Customer Name</span>
                                    <span className='text-[#9199A3] text-[16px]'>{data?.customer?.name}</span>
                                </div>
                                <div className='flex flex-col basis-[120px] mb-[27px]'>
                                    <span className='font-medium text-[14px]'>Terms</span>
                                    <span className='text-[#9199A3] text-[16px]'>{data?.terms} {data?.terms === 1 ? 'Day' : 'Days'}</span>
                                </div>
                            </div>
                            <div className='flex flex-col mb-[27px] gap-[1px]'>
                                <span className='font-medium text-[14px]'>Ship To</span>
                                <span className='text-[#9199A3] text-[16px]'>{data?.shipTo}</span>
                            </div>
                            <div className='flex flex-col mb-[27px] gap-[1px]'>
                                <span className='font-medium text-[14px]'>Bill To</span>
                                <span className='text-[#9199A3] text-[16px]'>{data?.address}</span>
                            </div>
                        </div>

                        <div className='mt-[20px] border border-[#E9EAEB] rounded-[12px] overflow-auto'>
                            <CustomTable table={data?.invoiceItems} />
                        </div>

                        <div className='mt-[20px]'>
                            <p className='text-[16px] font-medium'>Payment Details</p>
                        </div>
                        <div className='mt-[20px]'>
                            <p className='text-[16px] font-medium'>Outstanding Amount</p>
                        </div>
                    </div>

                    {/* Confirmation Popup */}
                    {showModal && (
                        <PaymentConfirmation
                            invoiceNumber={data?.invoiceNumber}
                            customerName={data?.customer?.name}
                            amount={data?.totalValue}
                            setShowModal={setShowModal}
                            handleMarkAsPaid={handleMarkAsPaid}
                            loading={loading}
                        />
                    )}
                </div>
    )
}

function CustomTable({ table = [] }) {
    return (
        <table className='w-full'>
            <thead className='h-[44px] bg-[#FAFAFA] text-[#717680] border border-[#E9EAEB] border-x-0 border-t-0'>
                <tr className='text-[12px] font-medium'>
                    <td className='pl-[25px] text-start'>RefNo</td>
                    <td className='max-w-[110px]'>Description</td>
                    <td className='text-center'>Carat</td>
                    <td className='text-center'>Price/Ct</td>
                    <td className='text-center'>Total</td>
                </tr>
            </thead>
            <tbody>
                {
                    table.map(({ _id, description, carat, refNo, pricePerCarat, price }) => (
                        <tr className='h-[60px] text-[14px] border border-[#E9EAEB] border-x-0 border-t-0' key={_id}>
                            <td className='pl-[25px] text-start'>{refNo}</td>
                            <td className='max-w-[110px] break-words'>{description === "" ? '--' : description}</td>
                            <td className='text-center'>{carat} CT</td>
                            <td className='text-center font-semibold'>{pricePerCarat}</td>
                            <td className='text-center font-semibold'>{price}</td>
                        </tr>
                    ))
                }
                <tr className='h-[60px] text-[14px] border border-[#E9EAEB] border-x-0 border-t-0'>
                    <td colSpan={4} className='p-[20px]'>
                        <div className='flex flex-col gap-[8px]'>
                            <span className='h-[22px]'>Subtotal</span>
                            <span className='h-[22px]'>Tax</span>
                            <span className='h-[22px]'>Grand Total</span>
                        </div>
                    </td>
                    <td className='text-center p-[20px] flex flex-col'>
                        <div className='flex flex-col gap-[8px]'>
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

function PaymentConfirmation({ invoiceNumber, customerName, amount, setShowModal, handleMarkAsPaid, loading }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
                {/* Image positioned outside the popup with margin-bottom */}
                <img
                    className="w-[60px] absolute top-[-25px] left-1/2 transform -translate-x-1/2 mb-6"
                    src={exclamationIcon}
                    alt="exclamation"
                />

                {/* Header with margin-top */}
                <h3 className="text-lg font-semibold text-gray-800 mb-6 mt-6 text-center">
                    Confirm Mark As Paid
                </h3>

                {/* Invoice & Customer Details */}
                <div className="mb-6 text-left space-y-4 flex border-b border-gray-300">
                    <div className="flex justify-between mb-4 w-full">
                        <div>
                            <div className="text-sm text-gray-500 font-medium mb-2 ">Invoice Number</div>
                            <div className="text-sm text-gray-900 font-medium">{invoiceNumber}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 font-medium mb-2 ">Customer Name</div>
                            <div className="text-sm text-gray-900 font-medium">{customerName}</div>
                        </div>
                    </div>
                </div>

                {/* Payable Amount - Centered */}
                <div className="mb-4 text-center">
                    <div>
                        <div className="text-sm text-gray-500 font-medium mb-2 ">Payable Amount</div>
                        <div className="text-[30px] text-gray-900 font-medium">{getCurrency(amount)}</div>
                    </div>
                </div>

                {/* Delete Item Key-Value Section */}
                <div className="mb-3 text-center">
                    <span className="text-sm text-gray-600">Just Double-Checking!</span>
                </div>
                <div className="mb-6 text-start bg-red-100 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <span className="text-sm text-gray-800 font-semibold">
                        Are you sure you want to mark this invoice as <strong className="font-bold">Paid</strong>? This action cannot be undone.
                    </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 justify-center">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-md"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                        onClick={() => handleMarkAsPaid()}
                        disabled={loading}
                    >
                        Yes, Mark as Paid
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ManageInvoices