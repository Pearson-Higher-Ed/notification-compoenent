var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTg2NzY0NjUsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiZWY4ZjY3ODU3NjY0NDc5YmE1Y2ViYWI1MDNlYzMyMjMiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTg2NjU2NjR9.bDjJ_YPlOpv7H4jb3wxlC1zpMI_ZowFPbFzxydYRyes2Z7UPHysMXJxzysoRJO3IlUv8a2BE25Zpmzmg7yUeEgkzNnYCXpNVr3WHhyc5DvMLktWvlnW21rkZT43blll_Hd1jdnnj6zmNLeNQ1V-3nYpB-gbrhREEFRZu6y1Szjc';

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
