// Define Angular module and whitelist URL of server with Node.js script
  var app = angular.module('viewCustom', ['angularLoad'])  
    .constant('nodeserver', "https://yourserver.edu")
    .config(['$sceDelegateProvider', 'nodeserver', ($sceDelegateProvider, nodeserver) => {
      let urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push(`${nodeserver}**`); 
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
  }]);

// Add Article In Context & Browzine Links
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope, $http, nodeserver) { 
    var vm = this;
    if (vm.parentCtrl.result.pnx.addata.doi && vm.parentCtrl.result.pnx.display.type[0] == 'article')  {
          vm.doi = vm.parentCtrl.result.pnx.addata.doi[0] || '';
          var articleURL = nodeserver + "/primo/browzine/browzineArticleInContext?DOI=" + vm.doi;
          $http.jsonp(articleURL, {jsonpCallbackParam: 'callback'}).then(function(response) {
            $scope.article = response.data;
          }, function(error){
            console.log(error);
            });
      }
      if (vm.parentCtrl.result.pnx.addata.issn && vm.parentCtrl.result.pnx.display.type[0] == 'journal')  {  
          vm.issn = vm.parentCtrl.result.pnx.addata.issn[0].replace("-", "") || '';
          var journalURL = nodeserver + "/primo/browzine/browzineJournals?ISSN=" + vm.issn;
          $http.jsonp(journalURL, {jsonpCallbackParam: 'callback'}).then(function(response) {
            $scope.journal = response.data;
          }, function(error){
            console.log(error);
            });
        }

  }); 

  app.component('prmSearchResultAvailabilityLineAfter', { 
    bindings: { parentCtrl: '<' }, 
    controller: 'prmSearchResultAvailabilityLineAfterController',
    template: `
          <div ng-if="article.data.browzineWebLink"><a href="{{ article.data.browzineWebLink }}" target="_blank"> See article in Table of Contents!</a></div>
          <div ng-if="journal.data[0].browzineWebLink"><a href="{{ journal.data[0].browzineWebLink }}" target="_blank"> Browse this journal in Browzine!</a></div>  
          ` 
  });

// Add Journal Cover Images from Browzine
  app.controller('prmSearchResultThumbnailContainerAfterController', function($scope, $http, nodeserver) {
    var vm = this;
    var newThumbnail = '';
    if (vm.parentCtrl.item.pnx.addata.issn) {
      vm.issn = vm.parentCtrl.item.pnx.addata.issn[0].replace("-", "") || '';
      var journalURL = nodeserver + "/primo/browzine/browzineJournals?ISSN=" + vm.issn;
      $http.jsonp(journalURL, {jsonpCallbackParam: 'callback'}).then(function(response) {
        newThumbnail = response.data.data["0"].coverImageUrl;
        }, function(error){
          console.log(error); //
          });
      }
      vm.$doCheck = function(changes) {
        if (vm.parentCtrl.selectedThumbnailLink) {
          if (newThumbnail != '' && (vm.parentCtrl.selectedThumbnailLink.linkURL.indexOf("icon_journal.png") != -1 || vm.parentCtrl.selectedThumbnailLink.linkURL.indexOf("img/icon_article.png") != -1) ) {
            vm.parentCtrl.selectedThumbnailLink.linkURL = newThumbnail;  
          }
        }
      };
  });

  app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultThumbnailContainerAfterController',
  });
