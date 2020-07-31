var express = require('express');
var router = express.Router();
var User = require('../models/user');


//index get
router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

//user login get
router.get('/userLogin', function (req, res, next) {
	return res.render('userLogin.ejs');
});

//user login post
router.post('/userLogin', function (req, res, next) {
	var data = req.body;
	//console.log(req.body);
	if (data.password == "user" && data.username == "user") {
		console.log("Done Login");
		return res.redirect('/userDashboard');

	} else {
		return res.redirect('/userLogin');
	}
});

//user dashboard get
router.get('/userDashboard', function (req, res, next) {
	return res.render('userDashboard.ejs');
});

//admin login get
router.get('/adminLogin', function (req, res, next) {
	return res.render('adminLogin.ejs');
});

//admin login post
router.post('/adminLogin', function (req, res, next) {
	var data = req.body;
	//console.log(req.body);
	if (data.password == "admin" && data.username == "admin") {
		console.log("Done Login");
		return res.redirect('/adminDashboard');

	} else {
		return res.redirect('/adminLogin');
	}
});

//admin dashboard get
router.get('/adminDashboard', function (req, res, next) {
	return res.render('adminDashboard');
});

//user upload file get
router.get('/userUploadFile', function (req, res, next) {
	return res.render('userUploadFile');
});

//admin upload file get
router.get('/adminUploadFile', function (req, res, next) {
	return res.render('adminUploadFile');
});

//file save post
router.post('/upload', function (req, res, next) {
	var data = req.body;
	console.log(data.path);
	console.log(data.file);
});

//User Sort file get
router.get('/userSortFile', function (req, res, next) {
	return res.render('userSortFile');
});

//Admin Sort file get
router.get('/adminSortFile', function (req, res, next) {
	return res.render('adminSortFile');
});


//forger password get
router.get('/forgetPassword', function (req, res, next) {
	res.render("forgetPassword.ejs");
});


//forger password post
router.post('/forgetPassword', function (req, res, next) {
	data = req.body;
	if (data.password == data.cpassword) {
		res.send("Password Saved...");
		return res.render('/');
	} else {
		res.send("Password does not matched! Both Password should be same.");
	}
});

//register get
router.get('/register', function (req, res, next) {
	res.render("register.ejs");
});

//register post
router.post('/register', function (req, res, next) {
	console.log(req.body);
	var personInfo = req.body;

	if (personInfo.password == personInfo.cpassword) {
		res.send("User Successfully Registerd..")
	}
	else {
		res.send("Password does not matched! Both Password should be same.");
	}
});


router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			//console.log("found");
			return res.render('data.ejs', { "name": data.username, "email": data.email });
		}
	});
});

//destory session
router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});



module.exports = router;