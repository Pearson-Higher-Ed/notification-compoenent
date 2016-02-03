let UserNotAPI = {
    Stg: {
        UserNotificationURL: "https://notifications-api.stg-prsn.com/usernotifications/recipientid/",
        AcceptHeader: "*/*",
        ContentTypeHeader: "application/json"
    },
    Prd: {
        UserNotificationURL: "https://notifications-api.prd-prsn.com/usernotifications/recipientid/",
        AcceptHeader: "*/*",
        ContentTypeHeader: "application/json"
    }
};
module.exports = UserNotAPI;
