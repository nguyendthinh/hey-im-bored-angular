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

  $scope.categories = [
    'music',
    'comedy',
    'sports',
    'arts',
    'food',
    'family'
  ];

  $scope.postal_code = []

  $scope.user = {
    categories: [],
    postal_code: []
  };


  this.create = function(user){

    console.log(user)
      // this.songs.$add(this.newSong).then( () => this.newSong = {} )
  }
}
