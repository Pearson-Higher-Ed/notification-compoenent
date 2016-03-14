var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTc5OTk5OTgsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiYzUwYjliZDZlYzhhNDgwNGFhNzJkMmZjNjJjZmEwYWIiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTc5ODkxOTh9.WGIbw0L5EHVJpnHGZX5Zn0Kub_q2WQi8fC7EKGj6Cu1qu-hQdODcm8BxNinyDCfW_jqI6dI3bczifCc7TKXo9bmT9PIoywUWU3ncbIAY_loc1XwDqJtV_RCfKY7XTL-YaEViIykRo_Mbq4k4xYn1prwQPuIWDsZc_Sj4I8awXD8';

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
