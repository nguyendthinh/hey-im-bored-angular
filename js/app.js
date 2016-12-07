angular
  .module("heyimbored", ["ui.router", "checklist-model", "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .controller("IndexController", ["$scope",
  "$state",
  "$http", "EventFactory", "$stateParams",
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
    $http({
      url: "http://localhost:4001/api/events/",
      method: "post",
      data: user
<<<<<<< HEAD
    }).then(() => {
      $state.go("show", {reload: true});
    });
=======
    }).then((res) => {
      $state.go("show", {}, {reload: true});
    })
>>>>>>> 7354c578b0057a8fe41be0577b3aae4e529918cc
  }
}


function ShowControllerFunction($scope, EventFactory, $state) {
<<<<<<< HEAD
  $scope.event = EventFactory.get({}, function(){
    console.log($scope.event)

  })
=======
  $scope.event = EventFactory.get();
  $scope.EventValid = true;
>>>>>>> 7354c578b0057a8fe41be0577b3aae4e529918cc

  $scope.EventValid = true;

  this.destroy = function(event){
    $scope.event.$delete(event).then(function(){
    $scope.event = EventFactory.get({}, function(){
<<<<<<< HEAD
       let validation = ($scope.event.title)
       console.log(validation)
       if (validation != undefined){
         console.log("true");
       }
       else{
         console.log("false")
          $scope.EventValid = false;
=======
       var validation = ($scope.event.title)


       if (validation){
         $scope.EventValid = true;
       }
       else{
         $scope.EventValid = false;
>>>>>>> 7354c578b0057a8fe41be0577b3aae4e529918cc
       }
    })
    $state.go("show")
    })
  }

  this.searchAgain = function(){
    $state.go("index");
  }

}
