var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjE3MTU3NjgsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiYzRmNWNhMWQxMjI1NDA4Y2FhNWM3MzMzY2VhMDhlMTkiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjE3MDQ5Njh9.JPfrwfyYSfWQEu1bYyV3KmxnZPLPHnVDVmndV_qy-MOcPlAgRLBEWZwfCanPKj6iPMCQ4leP_NFuKoahAReNDlSuIsQMnwdoiNrWPCt85-1VyW5fbo1oVXd4ULzUuR0QvmuqV1Nq4Iu1U0VHQv_nm8l_L6UbSGJavVbb42UQ1PQ';

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
