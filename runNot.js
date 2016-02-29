var pt = '1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=a8adc653ac924734a485b3d1041fde4b|2016-02-29T21:29:19+00:00|2016-03-01T00:29:19+00:00|a42840da7da949718741b7a4ba2a9f20';

var AppHeaderConfig = {
    // NotificationAPI
    UserNotificationURL: "https://notifications-api.stg-prsn.com/usernotifications/recipientid",
    AcceptHeader: "*/*",
    ContentTypeHeader: "application/json",
    RecipientId: "ffffffff560c1a1ee4b04ebf43118c60",
    PiToken: pt,

    // CoachmarkAPI
    cmApiUrl: "http://localhost:8080/coachmark",
    cmAcceptHeader: "*/*",
    cmContentTypeHeader: "application/json",
    cmPiToken: pt


};

var not = NotificationComponent.getInstance(AppHeaderConfig);
not.attachComponent("#notification");
