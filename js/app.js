angular
  .module("heyimbored", ["ui.router", "checklist-model", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("IndexController", ["$scope", IndexControllerFunction])
  .controller("ShowController", [
  "$scope",
  "EventFactory",
  ShowControllerFunction])
  .factory("EventFactory", [
    "$resource",
    EventFactoryFunction
  ])

  function EventFactoryFunction($resource) {
    return $resource("http://localhost:4001/api/events", {}, {
      update: {method: "PUT"}
    })
  }

function RouterFunction($stateProvider) {
  $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "/js/ng-views/index.html",
      controller: "IndexController",
      controllerAs: "vm"
    })
    .state("show",{
      url: "/events",
      templateUrl: "/js/ng-views/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
}



function IndexControllerFunction($scope) {

  $scope.categories = [
    'Music',
    'Comedy',
    'Sports',
    'Arts',
    'Food',
    'Family'
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


function ShowControllerFunction($scope, EventFactory) {
  $scope.events = EventFactory.query();
  $scope.events.$promise.then((data) => {
    console.log(data);
  })
}
