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

// was looking at https://www.terlici.com/2014/09/15/node-testing.html for ideas on further db tests, but it's getting late
