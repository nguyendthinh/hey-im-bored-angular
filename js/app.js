angular
  .module("heyimbored", ["ui.router", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("IndexController", ["$scope",
  "$state","$http", "EventFactory", "$stateParams",
  IndexControllerFunction])
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
      url: "/events/:id",
      templateUrl: "/js/ng-views/show.html",
      controller: "ShowController",
      controllerAs: "vm"
    })
}

function IndexControllerFunction($scope, $state, $http, EventFactory, $stateParams) {


  $scope.categories = [
    'music',
    'performing_arts',
    'sports',
    'art',
    'food',
    'family_fun_kids'
  ];

  $scope.postal_code = []

  $scope.user = {
    categories: [],
    postal_code: []
  };

  $scope.clicked = false;

  this.create = function(user){
    // send this object to API and data.categories and data.postal_code
    $http({
      url: "http://localhost:4001/api/events/",
      method: "post",
      data: user
    }).then((res) => {
      $state.go("show", {}, {reload: true});
    })
  }
}


function ShowControllerFunction($scope, EventFactory, $state) {

  $scope.event = EventFactory.get();
  $scope.EventValid = true;


  this.destroy = function(event){
    $scope.event.$delete(event).then(function(){
    $scope.event = EventFactory.get({}, function(){

       var validation = ($scope.event.title)

       if (validation){
         $scope.EventValid = true;
       }
       else{
         $scope.EventValid = false;
       }
    })
    $state.go("show")
    })
  }

  this.searchAgain = function(){
    $state.go("index");
  }

}
