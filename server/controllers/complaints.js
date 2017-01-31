const mongoose = require('mongoose');

var Complaint = mongoose.model('Complaint');



module.exports = (function(){
  return {

    getAllComplaints: function(req,res){
      console.log('++++ ============ +++++'.red);
      console.log(req.body);
      Complaint.find({date: {$gte: req.body.today}}).populate(['_user']).exec(function(err, complaints){
        if(err){
          console.log('=============== Error finding all Complaints ==============='.red);
          console.log(err);
        } else {
          console.log('=============== All Complaints ==============='.cyan);
          res.json(complaints)
        }
      });
    }, //End Get All Complaints


// {$lt: cutoff}
    newComplaint: function(req,res){
      console.log('In the factory'.cyan);
      console.log(req.body);



      Complaint.find({date: req.body.theDate}, function(err, appoints){
        console.log('Amount of apps'.blue);
        console.log(appoints[0]);
        if(err){
          console.log('====== Error 1 ======'.red);
          console.log(err);
          res.json({error: 'ERROR. looking up dates.'});
        } else if (appoints.length>2) {
          console.log('====== Error 2 ======'.red);
          console.log(err);
          res.json({error: 'Too many appointments scheduled for that day.'});
        } else {
          var newComplaint = new Complaint({reason: req.body.reason, date: req.body.theDate, time: req.body.time, _user: req.body.user});
          newComplaint.save(function(err){
            if(err){
              console.log('=============== Error Saving New Complaint ==============='.red);
              console.log(err);
              res.json({error: 'Error Saving New Complaint.'})
            } else  {
              console.log('=============== Saved New Complaint ==============='.cyan);
              console.log(newComplaint);
              res.json({success: 'New Complaint Added!'});
            }
          })
        }

      })
    }, //End New Complaint


    remove: function(req,res){
      console.log('===== This is the remove action ====='.yellow);
      Complaint.remove({_id:req.body.id}, function(err, oneComplaint){
        if(err){
          console.log('====== Error ======'.red);
          console.log(err);
          res.json({error: 'ERROR. Complaint was not removed'});
        } else if (oneComplaint.date == req.body.theDate){
          console.log('error'.cyan);
          res.json({error: "Can only Cancel 24 hours in advance"})
        } else {
          res.json({success: 'Appointment removed'});
        }
      })
    } // End newLike



  }
})();
