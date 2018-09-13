var friends = require('../data/friends.js');
var path = require("path");

//I think I need to export this whole thing
//Yep, I do
// Displays friends
module.exports = function(app) {
app.get("/api/friends/:friend", function (req, res) {
    var chosen = req.params.friend;

    console.log(chosen);

    for (var i = 0; i < friends.length; i++) {
        if (chosen === friends[i].routeName) {
            return res.json(friends[i]);
        }
    }
    return res.json(friends[i]);
});

// Displays all characters
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

//adds friends
app.post("/api/friends", function (req, res) {

//Comparing user with their best friend match 

//Object to hold the best match
var bestMatch = {
    name: "",
    photo: "",
    //This is just going to be a comparison number
    friendDifference: 5000
};

// This matches the object from survey.html
var newFriend 	= req.body;
//This gets the scores from the object
var newFriendScores = newFriend.scores;

//This will be the diff btwn two users
var totalDifference = 0;

// Loop through all the friends. 
for  (var i=0; i< friends.length; i++) {

    // Loop again through all the scores of each friend
    for (var j=0; j< friends[i].scores[j]; j++){

        // abs is used to get the absolute value, so no negatives
        totalDifference += Math.abs(parseInt(newFriendScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference){

            // Reset the bestMatch to be the new friend. 
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;
        }
    }
}

//push the New Friend into the array of friends for the api
friends.push(newFriend);

// To be used in the popup

res.json(bestMatch);

});

}