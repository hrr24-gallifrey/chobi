const expect = require('chai').expect;
const mongoose = require('mongoose');
const User = require('../server/db/models/user.js');

describe('User Model', () => {

  it('User should be a Mongoose model', () => {
    expect(new User()).to.be.instanceOf(mongoose.Model);
  });

  it('should have a schema', () => {
    expect(User.schema).to.exist;
  });

});
