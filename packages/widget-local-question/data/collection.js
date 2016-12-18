/**
 * Created by c_aarutyunyan on 12/2/16.
 */
bz.cols.locationTrackings = new Mongo.Collection('localQuestions');
if (Meteor.isServer) {
  Meteor.publish('localQuestions', function(){
    return bz.cols.locationTrackings.find();
  });
  Meteor.publish('localQuestion', function(id){
    return bz.cols.locationTrackings.find(id);
  });
  Meteor.startup(function () {
    bz.cols.locationTrackings.allow({
      insert: function() {
        return true;
      },
      update: function() {
        return true;
      },
      remove: function() {
        return true;
      }
    });
    bz.cols.locationTrackings.after.insert(function(userId, doc) {

    });
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('localQuestions'); // for testing
}

