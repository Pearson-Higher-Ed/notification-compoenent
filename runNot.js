var pt = '1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=ef69bea1fc81446abf0aaae460f7552b|2016-03-04T20:46:10+00:00|2016-03-04T23:46:10+00:00|ef95faae6d45808a9f827598e4040dec';

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
