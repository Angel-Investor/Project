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

//Edit Investor Post - GET Request
router.get("/edit-investor-post/:id", (req, res, next) => {

    let postId = req.params.id;

    InvestorPost.findById(postId, {}, {}, (err, investorPostToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);

        } else {
            res.render("posts/editInvestorPost", {
                title: "Edit Investor Post",
                investorPost: investorPostToEdit
            })
        }
    });
});

//Edit Investor Post - POST Request
router.post("/edit-investor-post/:id", (req, res) => {

    let id = req.params.id;
    let updatedInvestorPost = InvestorPost({
        _id: id,
        investorPostTitle: req.body.investorPostTitle,
        investorPostEmail: req.body.investorPostEmail,
        investorPostBody: req.body.investorPostBody
    });
    InvestorPost.updateOne({ _id: id }, updatedInvestorPost, err => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/combined")
        }
    });
});



//Delete an Investor Post
router.get("/delete-investor-post/:id", (req, res, next) => {

    let investorPostId = req.params.id;
    InvestorPost.remove({ _id: investorPostId }, err => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/combined")
        }
    })

});


//Edit Business Post Get Request
router.get("/edit-business-post/:id", (req, res, next) => {

    let postId = req.params.id;

    BusinessPost.findById(postId, {}, {}, (err, businessPostToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);

        } else {
            res.render("posts/editBusinessPost", {
                title: "Edit Business Post",
                businessPost: businessPostToEdit
            })
        }
    });
});


//Edit Business Post POST Request
router.post("/edit-business-post/:id", (req, res, next) => {

    let id = req.params.id;
    let updatedBusinessPost = BusinessPost({
        _id: id,
        businessPostTitle: req.body.businessPostTitle,
        businessPostEmail: req.body.businessPostEmail,
        businessPostBody: req.body.businessPostBody

    });

    BusinessPost.updateOne({ _id: id }, updatedBusinessPost, err => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/combined")
        }
    });
});


//Delete a Business Post
router.get("/delete-business-post/:id", (req, res, next) => {
    let id = req.params.id;
    BusinessPost.remove({ _id: id }, err => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.redirect("/combined");
        }
    });
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