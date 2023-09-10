
const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {  // en-us gives numbers formatted with a comma as the thousands separator 
    maximumFractionDigits: 0    // the number will be formatted as an integer with no decimal places.
});

function NumberFormater(operand) {
    if (operand == null) return "";   // if naN do nothing

    let [integer, decimal] = operand.split('.');  
    integer = INTEGER_FORMATTER.format(integer);    // format the integer part
    // no need to format decimal part (we don't add ',' in decimals)
    
    if (decimal == null) {
        return integer;   // if no decimal part just format integer part by applying ','
    }

    return `${integer}.${decimal}`;  // concat the integer and decimal part
}

export default NumberFormater
