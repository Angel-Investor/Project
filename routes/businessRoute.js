var express = require('express');
var router = express.Router();
const BusinessPost = require("../models/businessPostModel");


// const ensureAuthenticated = function(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     req.flash('error_msg', 'Please log in to view that resource');
//     res.redirect('/');
// }



//Display Business Posts Without being logged in
router.get("/display-business-posts", (req, res, err) => {
    BusinessPost.find().then((result) => {


        res.render("posts/bussPosts", {
            title: "Business Posts",
            businessPostsList: result
        })

    }).catch((err) = console.log(err));
});


//Display Business Posts after being logged in
router.get("/display-all-business-posts", (req, res, err) => {
    BusinessPost.find().then((result) => {

        res.render("posts/listBussPosts", {
            title: "Business Posts",
            businessPostsList: result
        })

    }).catch((err) = console.log(err));
});


//Add Business Post - GET Request
router.get("/add-business-post", (req, res, next) => {
    res.render("posts/addBusinessPost", { title: "Add Business Post" });
});

//Add Business Post - POST Request
router.post("/add-business-post", (req, res, next) => {

    let newBusinessPost = new BusinessPost({
        businessPostTitle: req.body.businessPostTitle,
        businessPostEmail: req.body.businessPostEmail,
        businessPostBody: req.body.businessPostBody
    });

    newBusinessPost.save()
        .then((result) => res.redirect("./display-all-business-posts"))
        .catch((err) => console.log(err));
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
            res.redirect("./../display-all-business-posts")
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
            res.redirect("./../display-all-business-posts");
        }
    });
});



module.exports = router;