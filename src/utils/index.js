export function getCurrency(amount) {
    const formattedAmount = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);

    return formattedAmount
}

export function downloadExcel(url) {
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
};