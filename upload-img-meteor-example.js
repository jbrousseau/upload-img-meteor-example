
/* global Template it before */
/* global Meteor it before */
/* global FS it before */
var imageStore = new FS.Store.GridFS("images", {
  maxTries: 1,
  chunkSize: 1024*1024
});

var Images = new FS.Collection("images", {
  stores: [imageStore]
});


if (Meteor.isClient) {
  Template.hello.files = function () {
    return Images.find({});
  };

  Template.hello.events({
    'change .myFileInput': function(event, template) {
      var files = event.target.files;
      console.log(event.target.id);
      if (event.target.id) {
        Images.remove(event.target.id);
      } 
      Images.insert(files[0]);
    }
  });
  
  
} //if client

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
