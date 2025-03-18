export const formatNum = (num) => {
    // add , every 3 digits
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
