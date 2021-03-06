(function () {
  'use strict';

  angular
    .module('webApp')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['FragmentFactory', 'PolicyFactory'];

  function SettingsCtrl(FragmentFactory, PolicyFactory) {
    /*jshint validthis: true*/
    var vm = this;
    vm.runScriptFragments = runScriptFragments;
    vm.runScriptPolicies = runScriptPolicies;

    /////////////////////////////////

    function runScriptFragments() {
      var inputList = FragmentFactory.getFakeFragments('create_inputs.json');

      inputList.then(function (result) {
        for (var i = 0; i < result.length; i++) {
          var newFragment = FragmentFactory.createFragment(result[i]);

          newFragment.then(function (newInputResult) {
          }, function (error) {
            console.log('There was an error while creating an input');
          });
        }

      }, function (error) {
        console.log('There was an error while loading the inputs flist!');
      });

      var outputList = FragmentFactory.getFakeFragments('create_outputs.json');

      outputList.then(function (result) {
        for (var i = 0; i < result.length; i++) {
          var newFragment = FragmentFactory.createFragment(result[i]);

          newFragment.then(function (newInputResult) {
          }, function (error) {
            console.log('There was an error while creating an output!');
          });
        }

      }, function (error) {
        console.log('There was an error while loading the outputs list!');
      });
    };


    function runScriptPolicies() {
      /*Get inputs list*/
      var inputsListRequest = FragmentFactory.getFragments('input');
      inputsListRequest.then(function (inputsResult) {
        var inputList = inputsResult;

        /*Get outputs list*/
        var outputsListRequest = FragmentFactory.getFragments('output');
        outputsListRequest.then(function (outputsResult) {

          var outputList = outputsResult;

          /*Get policy template*/
          var policyTemplate = PolicyFactory.getFakePolicy();
          policyTemplate.then(function (policiesResult) {

            for (var i = 0; i < inputList.length; i++) {
              var test = {};
              angular.copy(policiesResult, test);

              test.name = 'policy_' + inputList[i].name;
              test.description = 'Test description - ' + inputList[i].name;
              test.fragments.push(inputList[i]);
              test.fragments.push(outputList[0]);

              /*Create a new policy*/
              var newPolicy = PolicyFactory.createPolicy(test);
              newPolicy.then(function (result) {

              }, function (error) {
                console.log('There was an error while creating the policy!');
              });
            }
            ;

          }, function (error) {
            console.log('There was an error while loading the policy template!');
          });

        }, function (error) {
          console.log('There was an error while loading the outputs list!');
        });

      }, function (error) {
        console.log('There was an error while loading the inputs list!');
      });

    };

  };
})();
