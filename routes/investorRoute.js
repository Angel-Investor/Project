var express = require('express');
var router = express.Router();
const InvestorPost = require("../models/investorPostModel");


// const ensureAuthenticated = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.flash('error_msg', 'Please log in to view that resource');
//     res.redirect('/');
// }


//Display INVESTOR Posts Without being logged in
router.get("/display-investor-posts", (req, res, err) => {
    InvestorPost.find().then((result) => {

        res.render("posts/invPosts", {
            title: "Investor Posts",
            investorPostsList: result
        })
    }).catch((err) = console.log(err));
});


//Display INVESTOR Posts After being logged in
router.get("/display-all-investor-posts", (req, res, err) => {

    InvestorPost.find().then((result) => {

        res.render("posts/listInvPosts", {
            title: "Investor Posts",
            investorPostsList: result
        })
    }).catch((err) = console.log(err));
});

//Add Ivestor Post - GET Request
router.get("/add-investor-post", (req, res, next) => {
    res.render("posts/addInvestorPost", { title: "Add Investor Post" });
});


//Add Investor Post - POST Request
router.post("/add-investor-post", (req, res, next) => {

    let newInvestorPost = new InvestorPost({
        investorPostTitle: req.body.investorPostTitle,
        investorPostEmail: req.body.investorPostEmail,
        investorPostBody: req.body.investorPostBody
    });

    newInvestorPost.save()
        .then((result) => res.redirect("./display-all-investor-posts"))
        .catch((err) => console.log(err))
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
            res.redirect("./../display-all-investor-posts")
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
            res.redirect("./../display-all-investor-posts")
        }
    })

});




module.exports = router;