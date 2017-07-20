// Define Angular module and whitelist URL of server with Node.js script
  var app = angular.module('viewCustom', ['angularLoad'])  
    .constant('nodeserver', "https://yourserver.edu/primo/browzine")
    .config(['$sceDelegateProvider', 'nodeserver', ($sceDelegateProvider, nodeserver) => {
      let urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push(`${nodeserver}**`); 
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
  }]);

// Add Browzine Links
  app.controller('prmBriefResultAfterController', function($scope, $http) { 
    var vm = this;
    if (vm.parentCtrl.item.pnx.addata.doi)  {
          vm.doi = vm.parentCtrl.item.pnx.addata.doi[0] || '';
          var url = "https://yourserver.edu/primo/browzine/browzineArticleInContext?DOI=" + vm.doi;
          $http.jsonp(url, {jsonpCallbackParam: 'callback'}).then(function(response) {
          $scope.article = response.data;
          }, function(error){
                 console.log(error); //
            });
      }


      //TO DO: add control so both links don't show up for a single record...


    if (vm.parentCtrl.item.pnx.addata.issn) { 
      vm.issn = vm.parentCtrl.item.pnx.addata.issn[0].replace("-", "") || '';
      var url2 = "https://yourserver.edu/primo/browzine/browzineJournals?ISSN=" + vm.issn;
      $http.jsonp(url2, {jsonpCallbackParam: 'callback'}).then(function(response) {
        $scope.journal = response.data;
        console.log(response.data);
        }, function(error){
              console.log(error); //
        });
    }

  }); 

  app.component('prmBriefResultAfter', { 
    bindings: { parentCtrl: '<' }, 
    controller: 'prmBriefResultAfterController',
    template: `
          
          <div ng-if="article.data.browzineWebLink"><blockquote><a href="{{ article.data.browzineWebLink }}" target="_blank">See in Table of Contents!</a> ({{$ctrl.doi}}) </blockquote></div>
          <div ng-if="journal.data[0].browzineWebLink"><blockquote><a href="{{ journal.data[0].browzineWebLink }}" target="_blank">Browse this journal in Browzine!</a> ({{$ctrl.issn}}) </blockquote></div>
            
          
          ` 
  }); 
