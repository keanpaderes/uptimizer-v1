'use strict';

describe('uptimizer.version module', function() {
  beforeEach(module('uptimizer.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
