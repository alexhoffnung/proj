/*********************************
*
*    Sleep list methods
*
*********************************/

  Meteor.methods({
    addSleep: function (text, direction, activeBaby) {

    // Make sure the user is logged in before inserting a sleep
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Sleeps.insert({
      text: text,
      direction: direction,
      babyName: activeBaby,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
    deleteSleep: function (sleepId) {
    var sleep = Sleeps.findOne(sleepId);
    if (sleep.private && sleep.owner !== Meteor.userId()) {
      // If the sleep is private, make sure only the owner can delete it
      throw new Meteor.Error("not-authorized");
    }
 
      Sleeps.remove(sleepId);
    },
  setCheckedSleep: function (sleepId, setChecked) {
      var sleep = Sleeps.findOne(sleepId);
      if (sleep.private && sleep.owner !== Meteor.userId()) {
        // If the sleep is private, make sure only the owner can check it off
        throw new Meteor.Error("not-authorized");
      }
    Sleeps.update(sleepId, { $set: { checked: setChecked} });
  },
  setPrivateSleep: function (sleepId, setToPrivate) {
      var sleep = Sleeps.findOne(sleepId);
 
      // Make sure only the sleep owner can make a sleep private
      if (sleep.owner !== Meteor.userId()) {
        throw new Meteor.Error("not-authorized");
      }
 
      Sleeps.update(sleepId, { $set: { private: setToPrivate } });
  }
  });
