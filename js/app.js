angular
  .module("heyimbored", ["ui.router", "checklist-model", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("IndexController", ["$scope", "$state", IndexControllerFunction])
  .controller("ShowController", [
  "$scope",
  "EventFactory", "$state",
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


function IndexControllerFunction($scope, $state) {

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
    // send this object to API and data.categories and data.postal_code
    console.log(user)
      // this.songs.$add(this.newSong).then( () => this.newSong = {} )
    $state.go("show")
  }
}


function ShowControllerFunction($scope, EventFactory, $state) {
  $scope.event = EventFactory.get();
  $scope.event.$promise.then((data) => {
    console.log(data);
  })

  this.destroy = function(event){
    $scope.event.$delete(event).then(function(){
    $state.go("show")
    $scope.event = EventFactory.get();
  })
}
}
