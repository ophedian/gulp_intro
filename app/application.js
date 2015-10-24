/**
 * Created by Agwayambadde on 10/21/2015.
 */
(function () {
    'use strict';

    angular.module('DemoApp', [])
        .controller('SampleController', ['$scope', sampleController]);

    function sampleController($scope) {
        $scope.Name = 'Abbey'
    }
}());