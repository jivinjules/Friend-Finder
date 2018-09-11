var friends = require('../data/friends.js');

//I think I need to export this whole thing
// Displays friends
module.exports = function(app) {
app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

//adds friends
app.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newFriend = req.body;

    // Using a RegEx Pattern to remove spaces from newtable
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newFriend.routeName = newFriend.name.replace(/\s+/g, "").toLowerCase();

    console.log(newFriend);

});
}