// =========================================================================
// ========================= User Factory =================================
// =========================================================================
app.factory('userFactory', function ($http){
  var factory = {};
  var user = {};
  var message = {};


  // // Register User method
  factory.register = function(input, callback){
    $http.post('/regUser', input).then(function(output){
      console.log('Made it back to factory');
      console.log(output);
      callback(output);
    });
  }

  //Login method
  factory.login = function(input, callback){
    $http.post('/login', input).then(function(output){
      console.log('Made it to factory');
      callback(output);
    });
  }

  //User Object Setter
  factory.setUser = function(data, callback){
    user = data;
    callback();
  }

  factory.setMessage = function(data, callback){
    message = data;
    callback();
  }

  //User Object Getter
  factory.getUser = function(callback){
    callback(user);
  }

  factory.getMessage = function(callback){
    callback(message);
  }

  return factory;
}); // End Login Factory


// =========================================================================
// ========================= Complaint Factory ===============================
// =========================================================================
app.factory('complaintFactory', function($http){
  var factory = {};

  factory.getAllComplaints = function(today, callback){
    $http.post('/complaint/all', {today: today}).then(function(output){
      callback(output.data);
      console.log('This is the output');
      console.log(output);
    });
  } //End Get All


  factory.newComplaint = function(input, callback){
    $http.post('/complaint/new', input).then(function(output){
      console.log('Back from server controller');
      callback(output.data);
    });
  } //End new Question


  factory.getOneComplaint = function(cID, callback){
    console.log('at factory. cID ----> ');
    console.log(cID);
    $http.post('/complaint/one', {cID:cID}).then(function(output){
      console.log('back At factory');
      callback(output.data);
    });
  } //End get One Question


  factory.delete = function(cID, today, callback){
    console.log('======== At Factory ========');
    console.log(cID);
    $http.post('/complaint/remove', {id: cID}).then(function(output){
      console.log('Back from factory');
      callback(output.data)
    });
  }


  // factory.likeAnswer = function(aID, callback){
  //   console.log('At like factory');
  //   console.log(aID);
  //   $http.post('/complaint/like', {aID:aID}).then(function(output){
  //     console.log('Back from server Controller');
  //     console.log(output);
  //     callback(output);
  //   })
  // } // End likeAnswer


return factory;

}); // End Complaint Factory
