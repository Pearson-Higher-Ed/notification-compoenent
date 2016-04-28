let CoachmarkApi = require("../src/js/CoachmarkApi");
var goodAppHeaderConfig, goodResponseObj, cmApi;

describe("CoachmarkApi", () => {

  before(() => {
    goodAppHeaderConfig = {
      cmApiUrl: "http://localhost:8080",
      cmContentTypeHeader: "application/json",
      cmPiToken: "pi"
    };

    goodResponseObj = {
      "element": "fromTest",
      "uri": "index.html",
      "options": {
        "title": "Stubbed Coachmark Reply",
        "text": "From the Test",
        "hasBack": false,
        "hasNext": true,
        "like": false,
        "currentCM": 1,
        "totalCM": 6
      }
    };

    cmApi = new CoachmarkApi(goodAppHeaderConfig);
  });

  beforeEach(() => {
    sinon.stub(window, 'fetch');

    let res = new window.Response(JSON.stringify(goodResponseObj), {
      status: 200,
      headers: {
        'Content-type': 'application/json'
      }
    });

    window.fetch.returns(Promise.resolve(res));
  });

    afterEach(() => {
      window.fetch.restore();
    });

    it("should call the Coachmark API - get Coachmark", (done) => {
      cmApi.getCoachmark(25)
        .catch(done)
        .then((result) => {
            expect(result).not.to.be(null);
            expect(result.length).not.to.be(0);
            done();
        });
    });

    it("should parse the response body and return the coachmark", (done) => {
      cmApi.getCoachmark(25)
        .catch(done)
        .then((result) => {
          expect(result.element).to.be(goodResponseObj.element);
          expect(result.uri).to.be(goodResponseObj.uri);
          expect(result.options.title).to.be(goodResponseObj.options.title);
          expect(result.options.text).to.be(goodResponseObj.options.text);
          expect(result.options.hasBack).to.be(goodResponseObj.options.hasBack);
          expect(result.options.hasNext).to.be(goodResponseObj.options.hasNext);
          expect(result.options.like).to.be(goodResponseObj.options.like);
          expect(result.options.currentCM).to.be(goodResponseObj.options.currentCM);
          expect(result.options.totalCM).to.be(goodResponseObj.options.totalCM);
          done();
        });
    });

    it("should hydrate the id if the id is missing", (done) => {
      if (goodResponseObj.options.id) {
        goodResponseObj.options.id = undefined;
      }

      cmApi.getCoachmark(25)
        .catch(done)
        .then((result) => {
          expect(result.options.id).to.be(25);
          done();
        });
    });

    it("should call the Coachmark API - incrementViewCount", (done) => {
        cmApi.incrementViewCount(25)
          .catch(done)
          .then((result) => {
            done();
          });
    });
});
