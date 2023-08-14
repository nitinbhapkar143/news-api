const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Test Suite', () => {
  it('should fetch N news articles', async () => {
    const res = await chai.request('http://localhost:3000')
      .get('/api/articles');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf.at.least(1);
  });

  it('should find a news article by title', async () => {
    const title = 'example';
    const res = await chai.request('http://localhost:3000')
      .get(`/api/articles/title/${title}`);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('object');
  });

  it('should not find a non-existent article by title', async () => {
    const nonExistentTitle = 'nonexistentarticle';
    const res = await chai.request('http://localhost:3000')
      .get(`/api/articles/title/${nonExistentTitle}`);

    expect(res).to.have.status(404);
  });

  it('should return 404 for non-existent routes', async () => {
    const res = await chai.request('http://localhost:3000')
      .get('/api/nonexistentroute');

    expect(res).to.have.status(404);
  });
});
