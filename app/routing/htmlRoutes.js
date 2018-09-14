   
   var path = require("path");
   module.exports = function(app) {
    // Home page
	app.get('/home', function(req, res) {
		res.sendFile(path.join(__dirname, '/../public/home.html'));
	});

	// Survey page
	app.get('/survey', function(req, res) {
		res.sendFile(path.join(__dirname, '/../public/survey.html'));
		});
		



    // app.get('/crowd', function(req, res) {
		// res.sendFile(path.join(__dirname, '../../images/crowd.jpg'));
    // });
}