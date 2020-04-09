module.exports = {
    dateTimeConvert: function(isoString) {
        const time = new Date(isoString);
        const monthName = time.toString().substr(4, 6);
        const fullYear = time.getFullYear();
        return `${monthName},${fullYear}`;
    }
}