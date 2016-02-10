var AppHeaderConfig = {
    UserNotificationURL: "https://notifications-api.stg-prsn.com/usernotifications/recipientid",
    AcceptHeader: "*/*",
    ContentTypeHeader: "application/json",
    RecipientId: "ffffffff5482258ce4b05a12806d3b14",
    PiToken: "eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTUxMzk3MjUsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiODdlYTY0MzdkOTA5NGY5MGEzOTE5Yjc2ODgwNTAzMmUiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTUxMjg5MjR9.MTaCOT7HYV2SlRLTF-uX5ny9TVTo_GsKEAE3mcs--Ge1KQzggiZm0hCNv10thwKwp5i96Uvg2gxfASl4TxzsHPgyDGlBGXwZd9D2CyNE652r_MBOw73wqPbB8350TpRrSf_Zt6wUby0i_qObp5wPLhwSGVm7ERVuRWRLvdP0eOk"
}
var not = NotificationComponent.getInstance(AppHeaderConfig);
not.attachComponent("#notification");