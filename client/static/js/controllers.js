
// =========================================================================
// =========================== Home Controller =============================
// =========================================================================
app.controller('homeController', function($scope, userFactory, complaintFactory, $cookieStore, $location){
  $scope.user = {};
  $scope.message = {};
  $scope.allComplaints= [{}];
  $scope.login_error = "";
  $scope.showPrompt = $cookieStore.get('hideMask');
  $scope.showPrompt = true;

  if($cookieStore.get('user')){
    $scope.showPrompt = false;
  } else {
    $scope.showPrompt = true;
  }


  $scope.user=$cookieStore.get('user');
  if(!$scope.user){
    $location.url('/');
  }

  $scope.regUser = function(){
    console.log('Register Button Clicked');
    console.log($scope.reg);

    $scope.error = "";
    $scope.user = {};

    if($scope.reg.name){
      //call Factory method to register user
      userFactory.register($scope.reg, function(output){
        console.log(output);
        console.log("Back from factory ---> finished registering");
        $scope.user = output.data;

        if(output.data.error){
          $scope.error = output.data.error;
        } else {
          console.log('this is the outputtttt');
          console.log(output.data);
          $cookieStore.put('user', output.data);
          $scope.user=$cookieStore.get('user');
          $cookieStore.put('hideMask', false);
          $scope.showPrompt = false;
          $location.url('/');
        }
      });
    } else {
      $scope.error= "Passwords do not match!"
    }
    //Clear input
    $scope.reg = {};
  }


  $scope.loginUser = function(){
    console.log('Login Button Clicked');
    console.log($scope.login);

    //call Factory method to register user
    userFactory.login($scope.login, function(output){
      console.log(output);
      console.log("Back from factory ---> finished login");

      if(output.data.error){
        $scope.error = output.data.error;
      } else {
        $cookieStore.put('user', output.data);
        $scope.user=$cookieStore.get('user');
        $cookieStore.put('hideMask', false);
        $scope.showPrompt = false;
        $location.url('/');
      }
    });
    //Clear input
    $scope.login = {};
  }

  var today = new Date;
  today.setHours(0,0,0,0)


  // Get all Questions
  complaintFactory.getAllComplaints(today, function(output){
    $scope.allComplaints = output;
    console.log(output);
  });

  $scope.addAppointmentPage = function(){
    $location.url('/addComplaint');
  } // End of Add New Message

  $scope.delete =function(cID){
    $scope.success= {};
    complaintFactory.delete(cID, today, function(output){
      console.log('Back from factory ----> delete complaint');
      console.log(output);
      if(output.error){
        $scope.error = output.error;
      } else {
        $scope.success = output.data;
        complaintFactory.getAllComplaints(today, function(output){
          $scope.allComplaints = output;
          console.log(output);
        });
      }
    })
  } // End Show Question


  $scope.logout = function(){
    $cookieStore.remove('user');
    $cookieStore.remove('question');
    $cookieStore.remove('hideMask');
    $location.url('/home');
  } // End Logout

}); //End of Game Controller


// =========================================================================
// ========================== Add Complaint Controller ======================
// =========================================================================
app.controller('addComplaintController', function($scope, userFactory, complaintFactory, $cookieStore, $location){
  $scope.user = {};
  $scope.newQuestion = {};

  $scope.user = $cookieStore.get('user');

  $scope.today = new Date;
  $scope.todayRef = new Date;

  $scope.today = $scope.today.toISOString().split('T')[0];
  console.log($scope.today + '<----- Today');




  $scope.addComplaint = function(){
    $scope.error = '';
    $scope.message = '';
        //Check Date and Time
    if(!$scope.newComplaint.theDate){
      $scope.error = 'Date must be on or after today';
      $location.url('/addComplaint');
    } else if (!$scope.newComplaint.time){
      $scope.error = 'Hours must be between 8am and 5pm';
      $location.url('/addComplaint');
    } else if($scope.newComplaint.reason.length < 10){
      $scope.error = 'Complaint must be between at least 10 charactesr long';
      $location.url('/addComplaint');
    } else {
      $scope.newComplaint.user = $scope.user._id;
      console.log('new Complaint object');
      console.log($scope.newComplaint);
      complaintFactory.newComplaint($scope.newComplaint, function(output){
        console.log(output);
        console.log('back from factory');
        if(output.error){
          console.log(output.error);
          $scope.error = output.error;
        }else{
          $location.url('/');
        }
      })
    }
  } // End Add Question





  $scope.backHome = function(){
      $location.url('/');
  } //End Back Home


  $scope.logout = function(){
    $cookieStore.remove('user');
    $cookieStore.remove('question');
    $cookieStore.remove('hideMask');
    // cookieStore.put('hideMask', true);
    $location.url('/home');
  } // End Logout



}); //End of Add Question Controller
