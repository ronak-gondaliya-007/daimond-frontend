import { CompanyIconSvg, DiamondIconSvg } from 'assets/images/svg'
import html2pdf from 'html2pdf.js';
import { getCurrency } from 'utils';

const MemoPreview = ({
    rowData,
    onCancel
}) => {

    function handlePrint() {
        const element = document.getElementById('pdf-content');
        if (element) {
            try {
                const options = {
                    filename: 'output.pdf',
                    image: { type: 'jpeg', quality: 1 },
                    html2canvas: { scale: 2, width: 1400 },
                    jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' },
                };

                html2pdf().from(element).set(options).save();
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log('Element not found!');
        }
    }

    function getPctTotal() {
        const total = rowData.reduce((sum, item) => sum + item.pcs, 0);;
        return `${total} ct`
    }

    function getAmountTotal() {
        const total = rowData.reduce((sum, item) => sum + item.amount, 0);;
        return total
    }

    return (
        <div id='element-to-print' className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white  rounded-lg shadow-lg max-w-[1024px] w-full max-h-[90vh] overflow-auto">
                <div className='mt-[5px] pr-[20px] flex justify-end gap-2'>
                    <button
                        type='button'
                        className='px-8 py-4 bg-[#18191C] rounded-[4px] text-[14px] font-semibold text-[#F1F2F4]'
                        onClick={handlePrint}
                    >
                        Download
                    </button>
                    <button
                        type='button'
                        className='px-6 py-4 bg-[#F1F2F4] rounded-[4px] text-[14px] font-semibold text-[#18191C]'
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
                <div id="pdf-content" className={`w-full h-full p-6 sm:p-8 `}>
                    <div className='flex justify-between gap-7'>
                        <div className='flex justify-between w-[380px] h-[116px]'>
                            <div className='flex items-center'>
                                <DiamondIconSvg />
                            </div>
                            <div className='flex flex-col w-[260px] justify-between text-[12px]'>
                                <div className='flex flex-col justify-center'>
                                    <CompanyIconSvg className={'w-[240px] '} />
                                    <p className='w-[240px] text-center mt-[5px]'>20 West 47 Street, Suite 602 New York, Ny 10036</p>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <p className='text-center'>Tel: +1 917 702 1701</p>
                                    <p className='text-center'>E mail: naturediaminc@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <table className='w-[280px] h-[100px]'>
                                <tr>
                                    <td colSpan={2} className='text-center text-[18px] font-semibold'>Memo</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='text-center text-[12px] border border-black'>Date</td>
                                    <td className='text-center text-[12px]'>Memo #</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='text-center text-[12px] border border-black'>12/2/2222</td>
                                    <td className='text-center text-[12px]'>333</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className='mt-[40px] text-[12px]'>
                        <table className='w-[370px] h-[130px] border border-black'>
                            <tr className='border border-black'>
                                <td className='p-1 pl-[8px]'>Name / Address</td>
                            </tr>
                            <tr className='h-full'></tr>
                        </table>
                    </div>

                    <div className='mt-[40px] overflow-auto'>
                        <table className='w-full'>
                            <thead className='h-[44px] bg-[#FAFAFA] text-[#717680] border border-[#E9EAEB] border-x-0 border-t-0'>
                                <tr className='text-[10px]'>
                                    <td className='text-center w-[40px]'>No</td>
                                    <td className='text-center'>RefNo</td>
                                    <td className='text-center'>Description</td>
                                    <td className='text-center'>PCS.</td>
                                    <td className='text-center'>Carats</td>
                                    <td className='text-center'>Price Per Carat</td>
                                    <td className='text-center'>Return In Carats</td>
                                    <td className='text-center'>Sold In Carats</td>
                                    <td className='text-center'>Amount</td>
                                    <td className='text-center'>Remarks</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rowData.length > 0 && rowData.map(({ no, refNo, description, pcs, carats, pricePerCarat, returnInCarats, soldInCarats, amount, remarks }) => (
                                        <tr className='h-[70px] text-[12px] border border-[#E9EAEB] border-x-0 border-t-0'>
                                            <td className='text-center'>{no}</td>
                                            <td className='text-center'>{refNo}</td>
                                            <td className='text-center'>{description}</td>
                                            <td className='text-center'>{pcs}</td>
                                            <td className='text-center'>{carats}</td>
                                            <td className='text-center font-semibold'>{getCurrency(pricePerCarat)}</td>
                                            <td className='text-center font-semibold'>{getCurrency(returnInCarats)}</td>
                                            <td className='text-center font-semibold'>{getCurrency(soldInCarats)}</td>
                                            <td className='text-center'>{getCurrency(amount)}</td>
                                            <td className='text-center'>{remarks}</td>
                                        </tr>
                                    ))
                                }
                                <tr className='h-[70px] text-[12px]'>
                                    <td colspan="3" className='pl-[8px]'>Total</td>
                                    <td colspan="1" className='text-center'>{getPctTotal()}</td>
                                    <td colspan="4"></td>
                                    <td colspan="2" className='pl-[8px] border border-[#E9EAEB] border-x-0 border-t-0'>{getCurrency(getAmountTotal())}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='mt-[40px]'>
                        <p className='text-[10px] px-[10px] leading-[15px]'>The goods described and valued as below are delivered for EXAMINATION AND INSPECTION ONLY and are the property of NATURE DIAM INC. This merchandise is subject to their order and shall be returned to them on demand. Such merchandise, until returned to them and actually received are at your risk from all hazards, NO RIGHT OR POWER IS GIVEN TO YOU TO SELL, PLEDGE, HYPOTHECATE 1  OR OTHERWISE DISPOSE OF THIS MERCHANDISE regardless of prior transactions. A sale of this merchandise can only be effected and title will pass only if, as and when 2  the NATURE DIAM INC shall agree to such a sale and a bill of sale rendered therefore. In case suit is instituted to collect this merchandise or any portion thereof, the customer promise to pay such additional sum as the court may adjudge reasonable as attorney’s fees in and/or your company and NATURE DIAM INC arising out of or relating to this memo and/or the good described therein, shall be and/or your company and NATURE DIAM INC arising out of or relating to this memo and/or the good described therein, shall be exclusively determined by arbitration administered by the Diamond Dealers Club, Inc. (“DDC”) in New York City under its By-Laws and Rules and Regulations. The parties 3  of this memo submit themselves to the jurisdiction of the DDC, and judgement on any award rendered by the arbitrators may be entered in any court having jurisdiction thereof. 4  You are to be personally responsible for any awards rendered by the arbitrators. You hereby waive any claim or objection relating to forum non conveniens. 5</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemoPreview