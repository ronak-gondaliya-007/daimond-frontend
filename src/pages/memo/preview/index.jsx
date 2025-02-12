import React, { useEffect, useRef, useState } from 'react'
import Loader from 'components/loader';
import NoDataFound from 'components/no-data-found';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadCloud02 } from 'assets/utils/images';
import { getDate } from 'utils/dateFormat';
import { getCurrency } from 'utils';
import axiosClient from 'api/AxiosClient';
import { toast } from 'react-toastify';

const MemoPreview = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const isFetchingRef = useRef(false);

    useEffect(() => {
        if (isFetchingRef.current) return;
        if (params.memoId) fetchMemoDetail(params.memoId);
    }, [params.memoId]);

    const fetchMemoDetail = async (memoId) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;

        setLoading(true);
        try {
            const response = await axiosClient.post('/memo/detail',
                { memoId },
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

    const formatPhoneNumber = (phone) => {
        if (!phone) return "--";
        return phone.startsWith("91") ? phone.slice(2) : phone;
    };
    console.log(data);

    return (
        loading ?
            <Loader />
            : data === null ?
                <NoDataFound />
                : <div className="w-full h-full p-[20px] max-w-[100rem] flex flex-col mx-auto overflow-auto">
                    <div className="w-full flex justify-between items-center mb-[24px]">
                        <h6 className="text-[16px]">Manage Memo</h6>
                    </div>

                    <div className='relative flex-1 border border-[rgba(0,0,0,0.1)] rounded-[12px] p-[30px]'>
                        <div className='w-full flex justify-between items-center border-b border-[#D0D0D0] pb-[20px]'>
                            <h6 className='text-[24px] font-medium'>#{data.memoNumber}</h6>

                            <div className='flex items-center gap-[12px]'>
                                <button
                                    className='text-[14px] font-medium text-[#414651] px-[12px] py-[8px] border border-[#D5D7DA] rounded-[6px]'
                                    onClick={() => navigate(`/memo/edit/${params.memoId}`)}
                                >
                                    Edit Memo
                                </button>
                                <button className='text-[14px] font-medium text-[#414651] px-[12px] py-[8px] border border-[#D5D7DA] rounded-[6px]'>
                                    Email Memo
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
                                    <span className='font-medium text-[14px]'>Memo Date</span>
                                    <span className='text-[#9199A3] text-[16px]'>{getDate(data?.createdAt)}</span>
                                </div>
                                <div className='flex flex-col basis-[170px] mb-[27px]'>
                                    <span className='font-medium text-[14px]'>Customer Name</span>
                                    <span className='text-[#9199A3] text-[16px]'>{data?.customer?.name}</span>
                                </div>
                                <div className='flex flex-col basis-[170px] mb-[27px]'>
                                    <span className='font-medium text-[14px]'>Contact Info</span>
                                    <span className='text-[#9199A3] text-[16px]'>{formatPhoneNumber(data?.customer?.phone)}</span>
                                </div>
                            </div>
                            <div className='flex flex-col mb-[27px] gap-[1px]'>
                                <span className='font-medium text-[14px]'>Address</span>
                                <span className='text-[#9199A3] text-[16px]'>{data?.customer?.address}</span>
                            </div>
                        </div>

                        <div className='mt-[20px] border border-[#E9EAEB] rounded-[12px] overflow-auto'>
                            <CustomTable table={data?.memoItems} subTotal={data.totalValue} />
                        </div>
                    </div>

                </div>
    )
}

function CustomTable({ table = [], subTotal = 0, tax = 0 }) {
    return (
        <table className='w-full'>
            <thead className='h-[44px] bg-[#FAFAFA] text-[#717680] border border-[#E9EAEB] border-x-0 border-t-0'>
                <tr className='text-[12px] font-medium'>
                    <td className='pl-[25px] text-start'>SR No</td>
                    <td className='text-start'>Ref No</td>
                    <td className='min-w-[150px] text-start'>Description</td>
                    <td className='text-center'>Carats</td>
                    <td className='text-center'>Price Per Carat</td>
                    <td className='text-center'>Return In Carats</td>
                    <td className='text-center'>Sold In Carats</td>
                    <td className='text-center'>Amount</td>
                    <td className='pr-[25px] min-w-[150px] text-start'>Remarks</td>
                </tr>
            </thead>
            <tbody>
                {
                    table.map(({ _id, srNo, refNo, description, carat, pricePerCarat, returnInCarats, soldInCarats, price, remarks }, index) => (
                        <tr className='h-[60px] text-[14px] border border-[#E9EAEB] border-x-0 border-t-0' key={_id}>
                            <td className='pl-[35px] text-start'>{index + 1}</td>
                            <td className='text-start'>{refNo}</td>
                            <td className='min-w-[150px] break-words'>{description === "" ? '--' : description}</td>
                            <td className='text-center'>{carat} CT</td>
                            <td className='text-center font-semibold'>{pricePerCarat}</td>
                            <td className='text-center font-semibold'>{returnInCarats}</td>
                            <td className='text-center font-semibold'>{soldInCarats}</td>
                            <td className='text-center font-semibold'>{price}</td>
                            <td className='pr-[25px] min-w-[150px] text-start'>{remarks === "" ? '--' : remarks}</td>
                        </tr>
                    ))
                }
                <tr className='h-[60px] text-[14px] border border-[#E9EAEB] border-x-0 border-t-0'>
                    <td colSpan={7} className='p-[20px]'>
                        <div className='flex flex-col gap-[8px]'>
                            <span className='h-[22px]'>Subtotal</span>
                            <span className='h-[22px]'>Tax</span>
                            <span className='h-[22px]'>Grand Total</span>
                        </div>
                    </td>
                    <td className='text-center p-[20px] flex flex-col'>
                        <div className='flex flex-col gap-[8px]'>
                            <span className='h-[22px] font-semibold'>{getCurrency(subTotal)}</span>
                            <span className='h-[22px] font-semibold'>{getCurrency(tax)}</span>
                            <span className='h-[22px] font-semibold'>{getCurrency(Number(subTotal) + Number(tax))}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default MemoPreview;