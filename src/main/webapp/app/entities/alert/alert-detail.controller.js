(function() {
    'use strict';

    angular
        .module('hedwigApp')
        .controller('AlertDetailController', AlertDetailController);

    AlertDetailController.$inject = ['$http','$scope', '$rootScope', '$stateParams', 'DataUtils', 'entity', 'Alert'];

    function AlertDetailController($http, $scope, $rootScope, $stateParams, DataUtils, entity, Alert) {
        var vm = this;
        vm.alert = entity;
        vm.asup = vm.alert.alerts;
        vm.required_files = ['DF.txt', 'SYSCONFIG-A.txt', 'SYSCONFIG-R.txt', 'OPTIONS.txt', 'IFCONFIG-A.txt', 'SAS-EXPANDER-MAP.txt', 'STORAGE-FAULT.txt', 'AGGR-STATUS-R.txt', 'AGGR-STATUS-V.txt', 'CF-MONITOR.txt', 'DF-A.txt', 'ENVIRONMENT.txt', 'STORAGE-DISK.txt', 'STORAGE-INITIATORS.txt', 'STORAGE-EXPANDER.txt', 'SYSCONFIG-AC.txt', 'SYSCONFIG-M.txt', 'SYSTEM-SERIAL-NUMBER.TXT', 'VOL-STATUS.txt', 'VOL-STATUS-V.txt', 'UNOWNED-DISKS.txt'];
        vm.available_files = [];
        $http.get('api/a-sup-alert-data/asup/' + $stateParams.id)
        .then(function (response){
        	vm.aSUPAlertData = angular.fromJson(response.data);
        	for(var i=0; i < vm.aSUPAlertData.length; i++) {
        		var afn = vm.aSUPAlertData[i].asup_alert_file_name;
        		if (vm.required_files.indexOf(afn) !== -1) {
        			vm.available_files.push(afn);
        		}
        	}
        });	
    }
})();
