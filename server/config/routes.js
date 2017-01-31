// =========================================================================
// ========================= Required Models ===============================
// =========================================================================
var users = require('./../controllers/users.js');
var complaints = require('./../controllers/complaints.js');

module.exports = function(app){
// =========================================================================
// =========================== User Routes =================================
// =========================================================================
app.post('/regUser', function(req,res){
  users.reg(req,res)
});

app.post('/login', function(req,res){
  users.login(req,res)
});




// app.post('/login', function(req,res){
//   users.login(req,res)
// });

// =========================================================================
// ============================ Question Routes =============================
// =========================================================================
app.post('/complaint/all', function(req,res){
  complaints.getAllComplaints(req, res);
});

app.post('/complaint/new', function(req,res){
  complaints.newComplaint(req,res);
});

app.post('/complaint/remove', function(req,res){
  complaints.remove(req,res);
})


}; // End Routes
