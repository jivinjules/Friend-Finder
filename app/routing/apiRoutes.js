var friends = require('../data/friends.js');
var path = require("path");

//I think I need to export this whole thing
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
    friendDifference: 1000
};

// Here we take the result of the user's survey POST and parse it.
var newFriend 	= req.body;
var userScores 	= newFriend.scores;

var totalDifference = 0;

// Loop through all the friend possibilities in the database. 
for  (var i=0; i< friends.length; i++) {

    // Loop through all the scores of each friend
    for (var j=0; j< friends[i].scores[j]; j++){

        // abs is used to get the absolute value, so no negatives
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference){

            // Reset the bestMatch to be the new friend. 
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;
        }
    }
}

// Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
// the database will always return that the user is the user's best friend).
friends.push(newFriend);

// Return a JSON with the user's bestMatch. This will be used by the HTML in the next page. 
res.json(bestMatch);

});

}