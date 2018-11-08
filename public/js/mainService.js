angular.module('myApp').service('mainService', function($http) {


    this.postData = function(data) {
      console.log(data)
      return $http({
        method: 'POST',
        url: '/send',
        data: data
      })
    }

    this.getData = function(data) {
      return $http({
        method: 'GET',
        url: '/getData'
      })
    }

    this.deleteText = function(id) {
      return $http({
        method: 'DELETE',
        url: '/delete/' + id
      })
    }

    this.changeData = function(item) {
      return $http({
        method: 'PUT',
        url: '/change/' + item.id,
        data: item
      })
    }

    this.getUser = function(res) {
      console.log("get user")
      return $http({
        method: 'GET',
        url: '/auth/me'
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.log(err)
      })

      this.logout = function() {
        return $http({
          method: 'GET',
          url: '/auth/logout'
        })
        .then(function(res) {
          return res.data;
        })
        .catch(function(err) {
          console.log(err);
        })
      }
    }

})
