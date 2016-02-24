var AppHeaderConfig = {
    UserNotificationURL: "https://notifications-api.stg-prsn.com/usernotifications/recipientid",
    AcceptHeader: "*/*",
    ContentTypeHeader: "application/json",
    RecipientId: "ffffffff5482258ce4b05a12806d3b14",
    PiToken: "1.0|idm|idm|piid=ffffffff53da3cb3e4b0eaaddd576877&sessid=17f1320d5356459480f91a624bd9a3af|2016-02-24T17:23:21+00:00|2016-02-24T20:23:22+00:00|eb4c3e9828d961c2dbe2c086e19f2868"
}
var not = NotificationComponent.getInstance(AppHeaderConfig);
not.attachComponent("#notification");
