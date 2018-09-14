var friends = require('../data/friends.js');
var path = require("path");

//I think I need to export this whole thing
//Yep, I do
// Displays friends
module.exports = function (app) {
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
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        // new Friend takes survey and info is added
        var newFriend = req.body;

        // parseInt for scores
        for (var i = 0; i < newFriend.scores.length; i++) {
            newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }

        // if two friends have the same score, their diff will be zero
        //top score is 50 and lowest is 10 so largest difference is 40
        //the closer they are to zero the closer the scores
        var closestDifference = 0;
        var biggestDifference = 40;

        // Loop through the friends to get the scores
        for (var i = 0; i < friends.length; i++) {


            //Loop again through the scores
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(newFriend.scores[j] - friends[i].scores[j]);

            }


            //I got this section below off of stackoverflow
            // gives back one with min diff
            if (difference < biggestDifference) {
                //we change closest diff to i to loop through
                closestDifference = i;
                biggestDifference = difference;
            }
        }

        // after finding match, add newFriend to friend array
        friends.push(newFriend);

        // send back to browser the best friend match
        res.json(friends[closestDifference]);
    });
};