var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../server/app.js');


describe('Routes', function() {

  describe('/logout', function() {
    it('should logout a user', function(done) {
      request(app)
        .get('/logout')
        .end(function(err, res) {
          request(app).get('/')
          .expect(function(res) {
            var redirect = res.headers.location;
            console.log(redirect);
            expect(redirect).to.equal('/auth/login');
          })
          .end(done);
        });
    });
  });
});