'use strict';

angular.module('uptimizer.version', [
  'uptimizer.version.interpolate-filter',
  'uptimizer.version.version-directive'
])

.value('version', '0.1');
