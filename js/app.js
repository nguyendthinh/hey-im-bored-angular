angular
  .module("heyimbored", ["ui.router", "checklist-model"])
  .config(["$stateProvider", RouterFunction])
  .controller("IndexController", ["$scope", IndexControllerFunction])

function RouterFunction($stateProvider) {
  $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "/js/ng-views/index.html",
      controller: "IndexController",
      controllerAs: "vm"
    })
}

function IndexControllerFunction($scope) {
  // this.newUserInput = new EventFactory();
  // this.create = function() {
  //     this.newUserInput.save().then(function(event){
  //       $state.go("index")
  //     })
  //   }
  $scope.categories = [
    'music',
    'comedy',
    'sports',
    'arts',
    'food',
    'family'
  ];
  $scope.user = {
    categories: ['music']
  };
}
