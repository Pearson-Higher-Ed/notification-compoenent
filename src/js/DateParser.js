
let dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports = {

    getFormatDateString: function(date) {
        return dayOfWeek[date.getDay()] + ' ' + month[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + 
        date.getHours() + ':' + date.getMinutes()
    }
}
