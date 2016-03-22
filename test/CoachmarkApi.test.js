let CoachmarkApi = require("../src/CoachmarkApi");
import xhr from 'o-xhr';
let AppHeaderConfig = {

  cmApiUrl: "http://localhost:8080",
  cmAcceptHeader: "*/*",
  cmContentTypeHeader: "application/json",
  cmPiToken: "eyJhbGciOiJSUzUxMiIsImtpZCI6ImsxMDY5NDgxOTAifQ.eyJleHAiOjE0NTg1ODU2NTIsInN1YiI6ImZmZmZmZmZmNTNkYTNjYjNlNGIwZWFhZGRkNTc2ODc3Iiwic2Vzc2lkIjoiZWY1NDE5YTUwMmM4NDdjNGJkNjdiMjk2MmFmOGE5NTciLCJ0eXBlIjoiYXQiLCJpYXQiOjE0NTg1NzQ4NTJ9.UpmltPrDwA_OTcoEKgj7YMJgnOKLQO1ByiTlCBJZiowtiw-knIN7tvLXrVIaXbXZV0Ox3NbVQctuafy44OyUsH6CfBDMafIhYEXc32-IxU8KpAzPqGQo6QyHGiUQ1U_iCV7HDxB-KcebB89lh31vMRfi-BIcAllI3_jllnfkA3s"
};
describe("CoachmarkApi", () => {
    let cmApi = null;
    let coachmark = null;

    beforeEach(() => {
        cmApi = new CoachmarkApi(AppHeaderConfig);
    });

    it("should call the Coachmark API - get Coachmark", () => {
        coachmark = cmApi.getCoachmark(10);
        coachmark.then((result) => {
            let response = result;
            expect(response).not.to.be(null);
        });
    });

    it("should parse the response body and return the coachmark", () => {
        coachmark = cmApi.getCoachmark(10);
        coachmark.then((result) => {
            let coachmark = cmApi.parseResponse(result);
            expect(coachmark.length).not.to.be(0);
        });
    });

    it("should call the Coachmark API - incrementViewCount", () => {
        coachmark = cmApi.incrementViewCount(10);
        coachmark.then((result) => {
        });
    });

});
