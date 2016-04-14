var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjA2NzM0OTgsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiY2QwNWE2ZTIyNjk5NDdhY2E5YWZhMjRjYjcxYzY0NTkiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjA2NjI2OTh9.Fc-uTFUXjSXQ2wBaXD3tzgayLl5VCCVZ8GUapXgcoa5mFcKdAqAOhe7wMHlkqnt2vhdTxGnZJVb9v3hy0mINxisgq-qsEvcdnwilnKv08k4vSXmyCo8xBBeNJbIvheg3frmpybbdBvmLETz2zSeUsZmKmRSPOIissIBoESehcI4';

var AppHeaderConfig = {
  // NotificationAPI
  nfApiUrl: "https://notifications-api.stg-prsn.com",
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
