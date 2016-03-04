(function () {
  'use strict';

  angular.module('ngKUICore', []);
})();
(function () {
  'use strict';

  var powers = ['k', 'm', 'g', 't', 'p', 'e', 'z', 'y'];

  function resolveDivider(id) {
    switch (id) {
    case 'i':
      return 1024;
    }

    return 1000;
  }

  angular.module('ngKUICore')
    .filter('unit', ['number', function (number) {
        return function (input, unit, decimals, mutate) {
          if (isNaN(input)) {
            return 'NaN';
          }

          var first = unit.substring(0, 1).toLowerCase();
          var second = unit.substring(1, 2);
          var power = powers.indexOf(first);
          if (power++ === -1) {
            throw 'Unknown unit';
          }

          var divider = resolveDivider(second);
          var upperCase = unit[0] === unit[0].toUpperCase();
          var value = input / Math.pow(divider, power);

          while (mutate && value > divider) {
            value = input / Math.pow(divider, ++power);
            unit = powers[power - 1] + unit.substring(1);
          }

          if (decimals) {
            value = number(value, decimals);
          }

          if (upperCase) {
            unit = unit[0].toUpperCase() + unit.substring(1);
          }

          return value + ' ' + unit;
        };
      }
    ]);
})();