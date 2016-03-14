var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTc5ODU5NDUsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiMmIwYTliMjgyNTlhNDk2NDhjMGNjNjFiNDc0OGVhYjciLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTc5NzUxNDV9.EFHM8d8irZSCTdqaoGQRGdnkkMo7BfsYawPKeYBBNCjmaTiXwj8QeW3gpx7nsIYAOZSdXBFXQthNulrbwVT12NL97Qh6LA7ok5itYdTRT5Rz0skOdIHGBGqP7m43JCWopHwbYpLVtem66N8N9U7cGZqtbwfvH2vz_Vu-AXU_GjQ';

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
