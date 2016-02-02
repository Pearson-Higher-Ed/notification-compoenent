var config = require("./NotificationConfig");
console.log('config is'+config);
var not = NotificationComponent.getInstance(config);
not.attachComponent("#notification");