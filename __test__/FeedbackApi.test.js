let FeedbackApi = require("../src/FeedbackApi");
let AppHeaderConfig = {

  fbApiUrl: "http://localhost:8080",
  fbAcceptHeader: "*/*",
  fbContentTypeHeader: "application/json",
  fbPiToken: "eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTg1ODU2NTIsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiZWY1NDE5YTUwMmM4NDdjNGJkNjdiMjk2MmFmOGE5NTciLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTg1NzQ4NTJ9.UpmltPrDwA_OTcoEKgj7YMJgnOKLQO1ByiTlCBJZiowtiw-knIN7tvLXrVIaXbXZV0Ox3NbVQctuafy44OyUsH6CfBDMafIhYEXc32-IxU8KpAzPqGQo6QyHGiUQ1U_iCV7HDxB-KcebB89lh31vMRfi-BIcAllI3_jllnfkA3s"
};
describe("FeedbackApi", () => {
    let api = null;
    let feedback = null;

    beforeEach(() => {
        api = new FeedbackApi(AppHeaderConfig);
    });

    it("should call the Feedback API - submitFeedback", () => {
        feedback = api.submitFeedback(10, 'some feedback');
        feedback.then((result) => {
        });
    });
});
