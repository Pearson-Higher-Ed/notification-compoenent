var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTgxNzA0ODAsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiZDdjZDQyMjc3NWUzNDdkNzhjYWNiM2JjZjZkNDkxNjkiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTgxNTk2ODB9.VQBYkt5F7CaWvTkqhnPHg9IzVhaAYlWFf6ACpwQa1ME8xhWUcRZu3H-AmdkZWBLWyAFpOaId6i62zFhBHpNycAxlWVqoH-Vettr5R673dUcxN7X2edu3w9cFLbnxGU9qPZ18ecq4g0PBSLo0sdSVQNWTsYm8zERro4vn6yyKgTA';

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
