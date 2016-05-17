
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports = {

    getFormatDateString: function(updatedAt) {
        
        let difference = (new Date() - updatedAt) / 1000 / 60;// in minutes

        if (difference >= 60) {
            difference = difference / 60;
            if (difference >= 24) {
                return dayOfWeek[updatedAt.getDay()] + ' ' + month[updatedAt.getMonth()] + ' ' + updatedAt.getDate() + ' ' + updatedAt.getFullYear();
            }
            return Number.parseInt(difference) + ' hr';
        }
        
        return Number.parseInt(difference) + ' min';
    }
}
