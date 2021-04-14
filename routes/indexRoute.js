var express = require('express');
var router = express.Router();
const passport = require('passport');
const InvestorPost = require("../models/investorPostModel");
const BusinessPost = require("../models/businessPostModel");


/* Home Page - ADMIN LOGIN PAGE */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home Page' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact Page' });
});



//Admin Login POST Request
router.post('/', function(req, res, next) {
    passport.authenticate('adminLocal', {
        successRedirect: '/combined',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

//Get combined page - After Admin Logged In
router.get("/combined", (req, res, next) => {

    BusinessPost.find().then((businessResults) => {
        InvestorPost.find().then((investorResults) => {

            res.render("posts/combined", {
                title: "Admin Page",
                businessResults: businessResults,
                investorResults: investorResults
            })
        })

    })

});


//Investor login - GET Request
router.get("/investorLogin", (req, res, next) => {
    res.render("auth/investorLogin", { title: "Investor Login Page" })
});

//Investor login - POST Request
router.post("/investorLogin", (req, res, next) => {
    passport.authenticate('investorLocal', {
        successRedirect: '/investor/display-all-investor-posts',
        failureRedirect: '/investorLogin',
        failureFlash: true
    })(req, res, next);
});

//Investor login - GET Request
router.get("/businessLogin", (req, res, next) => {
    res.render("auth/businessLogin", { title: "Business Login Page" })
});

//Investor login - POST Request
router.post("/businessLogin", (req, res, next) => {
    passport.authenticate('businessLocal', {
        successRedirect: '/business/display-all-business-posts',
        failureRedirect: '/businessLogin',
        failureFlash: true
    })(req, res, next);
});


// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});


module.exports = router;