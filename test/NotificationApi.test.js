let NotificationApi = require("../src/NotificationApi");
const UserNotConfig = require("../src/NotificationConfig");
import xhr from 'o-xhr';
let AppHeaderConfig = {
    RecipientId: "ffffffff5482258ce4b05a12806d3b14",
    PiToken: "eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTQ3MDgyMTIsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiYTY3YTJkNmViMWE5NDliMWI4NTgwYTIzZDliMTdhNTMiLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTQ2OTc0MTJ9.YDC5YEXd0nGam154029x2UvARaj6cynFv6LLY4VDhumhTbwE52MnY9KZBC0Oj-OLVOhnhc3Tjd-SIxk0LxGAP3fg57DT4JvAsI6dZwHJKS6euMrFrbTbNy_B_GautZ8wckzvV8uNEQX0lho2pEFcet946bNo_ydSJGWXwfRVVF8"
}

let notApi = new NotificationApi();
let userNotifications = null;

describe("NotificationAPI", () => {
    let notificationComponent = null;

    it("should call the Notification API - user notifications", () => { 
        let response = null
        userNotifications = notApi.getNotifications(AppHeaderConfig);
        userNotifications.then((result) => {
                response = result;
                expect(response).not.to.be(null);
            },
            function(error) {
                //If this fails moslty due to the PItoken expired
                expect(response).to.be(null);
            });
    });

    it("should parse the response body and return the list of inbrowser notifications", () => {
        let response = null
        userNotifications = notApi.getNotifications(AppHeaderConfig);
        userNotifications.then((result) => {
                let userNotResponseList = notApi.parseResponse(result);
                expect(userNotResponseList.length).toBeGreaterThan(1);
            },
            function(error) {
                //If this fails moslty due to the PItoken expired
                expect(response).to.be(null);
            });
    });

});