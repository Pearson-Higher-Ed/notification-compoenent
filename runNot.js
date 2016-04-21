var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjEyNzcxOTQsInN1YiI6ImZmZmZmZmZmNTMzZWRlNGRlNGIwNmVmNjQ5NGM5MGI1Iiwic2Vzc2lkIjoiN2Q1ZDc2ZDJkZDY3NDQ5YzkwZDI2MDEzN2UzZmIxNTIiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjEyNjYzOTN9.gXHm4fU9PisS38mNKUiut3PVATMPe-rGHnXZsxGuo1Awu7FKEOD2EfAC9RAW4WhH2XpWoHexBy_hQSuvEsO2IIYMGK_e4PTqwSMJmocobb6fNmt3NAVZRF6UsosSpnNkck2QEcm6Ihi6iDPU5ImEZHe_Qv2ClS0qANfPJOCkFjM';

var AppHeaderConfig = {
  // NotificationAPI
  nfApiUrl: "https://notifications-api.stg-prsn.com",
  nfContentTypeHeader: "application/json",
  nfPiToken: pt,
  nfRecipientId: "ffffffff560c1a1ee4b04ebf43118c60",

  // CoachmarkAPI
  cmApiUrl: "http://localhost:8080",
  cmContentTypeHeader: "application/json",
  cmPiToken: pt,

  // FeedbackAPI
  fbApiUrl: "http://localhost:8080",
  fbContentTypeHeader: "application/json",
  fbPiToken: pt
};

var not = NotificationComponent.getInstance(AppHeaderConfig);
not.attachComponent("#notification");
