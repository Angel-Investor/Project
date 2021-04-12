var express = require('express');
var router = express.Router();
const InvestorUser = require("../models/investorUserModel");
const BusinessUser = require("../models/businessUserModel");


// const ensureAuthenticated = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.flash('error_msg', 'Please log in to view that resource');
//     res.redirect('/');
// }



router.get('/add-investor-user', function(req, res, next) {
    res.render('auth/registerInvestorUser', { title: 'Register as Investor' });
});

router.post('/add-investor-user', function(req, res, next) {
    let newInvestorUser = new InvestorUser({
        investorUserName: req.body.investorUserName,
        password: req.body.password,
        investorUserEmail: req.body.investorUserEmail,
        investorDisplayName: req.body.investorDisplayName
    });

    newInvestorUser.save().then((result) => {
        req.flash(
            'success_msg',
            'You are now registered and can log in'
        );
        res.redirect("/investorLogin")
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/add-business-user', function(req, res, next) {
    res.render('auth/registerBusinessUser', { title: 'Register as Business' });
});

router.post('/add-business-user', function(req, res, next) {
    let newBusinessUser = new BusinessUser({
        businessUserName: req.body.businessUserName,
        password: req.body.password,
        businessUserEmail: req.body.businessUserEmail,
        businessDisplayName: req.body.businessDisplayName
    });
    newBusinessUser.save().then((result) => {
        req.flash(
            'success_msg',
            'You are now registered and can log in'
        );
        res.redirect("/businessLogin")
    }).catch((err) => {
        console.log(err);
    })

});

module.exports = router;