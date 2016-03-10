var pt = '1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=3fba6ede817b4366ad6246d9bf710aab|2016-03-10T16:46:36+00:00|2016-03-10T19:46:36+00:00|4bc82dad9a22da118322d92f3a8491e9';

var AppHeaderConfig = {
    // NotificationAPI
    nfApiUrl: "https://notifications-api.stg-prsn.com/usernotifications/recipientid",
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
