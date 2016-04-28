let NotificationApi = require("../src/js/NotificationApi");
let AppHeaderConfig = {

  nfApiUrl: "https://notifications-api.stg-prsn.com/usernotifications/recipientid",
  nfAcceptHeader: "*/*",
  nfContentTypeHeader: "application/json",
  nfRecipientId: "ffffffff560c1a1ee4b04ebf43118c60",
  nfPiToken: "eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTg1ODU2NTIsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiZWY1NDE5YTUwMmM4NDdjNGJkNjdiMjk2MmFmOGE5NTciLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTg1NzQ4NTJ9.UpmltPrDwA_OTcoEKgj7YMJgnOKLQO1ByiTlCBJZiowtiw-knIN7tvLXrVIaXbXZV0Ox3NbVQctuafy44OyUsH6CfBDMafIhYEXc32-IxU8KpAzPqGQo6QyHGiUQ1U_iCV7HDxB-KcebB89lh31vMRfi-BIcAllI3_jllnfkA3s"
};
describe("NotificationAPI", () => {
    let notApi = null;
    let userNotifications = null;

    beforeEach(() => {
        notApi = new NotificationApi(AppHeaderConfig);
    });

    it("should call the Notification API - user notifications", () => {
        userNotifications = notApi.getNotifications();
        userNotifications.then((result) => {
            let response = result;
            expect(response).not.to.be(null);
        });
    });

    it("should parse the response body and return the list of inbrowser notifications", () => {
        userNotifications = notApi.getNotifications();
        userNotifications.then((result) => {
            let userNotResponseList = notApi.parseResponse(result);
            expect(userNotResponseList.length).not.to.be(0);
        });
    });

    it("should call the Notification API - mark as read", () => {
        userNotifications = notApi.markAsRead();
        userNotifications.then((result) => {
        });
    });

});
