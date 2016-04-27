import NotificationComponent from './src/NotificationComponent';

var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjE3OTYzODUsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiYTVjMmZjNjBmNDNhNDAyZjk5MTRiYjhjYmM4NmU1ZmIiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjE3ODU1ODR9.eZf29K-4-6X08P0-LXsdijTANrivHhFVmqwIvjF_OYTti2M8zKXyadk9padCLvG2XI9_-SDeP4oxKW0M020dyQc7HsdQ1gsRU6rw7-gE4O9kz0NH3f2ax4znhD_xOYr9or0lOckIAzeBirAqwTr9T5EecDrcfwoTCqgWC7_bDmQ';

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

var not = new NotificationComponent(AppHeaderConfig, "notification");
