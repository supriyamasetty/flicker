angular.module('MainCtrl', []).controller('MainController', function($scope,$log,$http,$timeout,$q,$sce) {
  // get your OWN_KEY from Yahoo!
  // on page load display photos
	$http.get("https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=cfa37a845b7a8bb3051a8b974abf8283&per_page=100&format=json&nojsoncallback=?&extras=url_o")
	  .then(function(data){
	  	$scope.displayImages = [];
	    $scope.data = data.data.photos;
	});
	      $scope.master = {};
	      $scope.images = {};
      $scope.search = function (searchCriteria) {
        if (searchCriteria.tags == undefined || searchCriteria.tags.trim() == "") {
          searchCriteria.tags = null;
          $scope.master = angular.copy(searchCriteria);
          $scope.form.$submitted = true;
          return false;
        }
        // build URL for Flickr API
        var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne";
        flickrAPI = flickrAPI + "?jsoncallback=?"
          + "&tags=" + encodeURIComponent($scope.searchCriteria.tags)
          + "&tagmode=" + $scope.searchCriteria.mode
          + "&format=json";
       
        // send AJAX query to Flickr API
        $http.get(flickrAPI).then(function (data) {
          $scope.images = data;
          $scope.imagesStatus = status;
          console.log(data);
        })
      };
      
      // reset form to initial state
      $scope.resetForm = function (form) {
        // $scope.form.tags.$setValidity();
        $scope.images = {};
        $scope.searchCriteria = {};
      };
});
  