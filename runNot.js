var pt = 'eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NjAwNjkzMDUsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiMzM3MzRhYjRmNmFlNDZhYjhlN2RkMmE2MGQwN2IxOWEiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NjAwNTg1MDR9.AAz_AY3XM_D7Qcqp19FPCOB7qtXpxgBm93AgUVibj-vHE0e_QgApVuBEKKVv3NEKqbY3K-8varJT7uNYkhSQieLNhU-JeyvnEFB8XuDOhgBeNWdYiE9P74SaHGrlxaZdaG8CRDTWPG3Tx1br-hO_47lErLRjamkJmKJqZ7ZkDt0';

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
