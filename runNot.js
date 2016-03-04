var pt = '1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=29a56b62eeba48ee8409098936d76788|2016-03-03T21:10:19+00:00|2016-03-04T00:10:19+00:00|007874b4c41af5edd23af17134d8a1fc';

var AppHeaderConfig = {
    // NotificationAPI
    nfUrl: "https://notifications-api.stg-prsn.com/usernotifications/recipientid",
    nfAcceptHeader: "*/*",
    nfContentTypeHeader: "application/json",
    nfPiToken: pt,
    nfRecipientId: "ffffffff560c1a1ee4b04ebf43118c60",

    // CoachmarkAPI
    cmApiUrl: "http://localhost:8080",
    cmAcceptHeader: "*/*",
    cmContentTypeHeader: "application/json",
    cmPiToken: pt,

    // FeedbackAPI
    fbApiUrl: "http://localhost:8080",
    fbAcceptHeader: "*/*",
    fbContentTypeHeader: "application/json",
    fbPiToken: pt
};

var not = NotificationComponent.getInstance(AppHeaderConfig);
not.attachComponent("#notification");
