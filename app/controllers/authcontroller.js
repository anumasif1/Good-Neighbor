var exports = module.exports = {}
var db = require("../models");
var color = require("colors");
var gloUser = "";

exports.dashboard = function (req, res) {
    db.post
        .findAll({
            include: [db.user]
        })
        .then((resultPost) => {
            db.comment
                .findAll({})
                .then((resultComment) => {
                    gloUser = req.user.name;
                    res.render("success", {
                        username: req.user.name,
                        userid: req.user.id,
                        allPost: resultPost,
                        allComment: resultComment
                    });
                    // res.json(resultComment);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({ err: err, message: err.message });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ err: err, message: err.message });
        });
}

exports.dashboardPost = function (req, res) {
    var data = req.body;
    console.log(data)
    db.post
        .create({ member_post: data.member_post, userId: req.user.id })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ err: err, message: err.message });
        });
}

exports.dashboardComment = function (req, res) {
    var data = req.body;
    // console.log(data)
    db.comment
        .create({ member_comment: data.member_comment, postId: data.postId, member_name: gloUser })
        .then((resultComment) => {
            res.json(resultComment);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ err: err, message: err.message });
        });
}

exports.delPost = function (req, res) {
    var id = req.params.id;
    db.post
        .destroy({
            where: {
                id: id
            }
        })
        .then(() => {
            console.log("DELETED Post!");
            res.end();
        })
        .catch((err) => {
            res.status(400).json({ err: err, message: err.message });
        });
}

exports.getLatLong = function (req, res) {
    db.user
        .findOne({
            where: {
                name: gloUser
            }
        })
        .then((userdata) => {
            // console.log(userdata.address)
            var spAddress = userdata.address;
            var NodeGeocoder = require('node-geocoder');
            var options = {
                provider: 'mapquest',

                // Optional depending on the providers
                httpAdapter: 'https', // Default
                apiKey: '4KNdAC9qziy1VmxLiiM0kLhxJRCKCYhY', // for Mapquest, OpenCage, Google Premier
                formatter: null         // 'gpx', 'string', ...
            };

            var geocoder = NodeGeocoder(options);

            // Using callback
            geocoder.geocode(spAddress, function (err, resgeo) {
                // console.log(resgeo);
                res.json(resgeo);
            });

            // Or using Promise
            // geocoder.geocode('29 champs elysée paris')
            //     .then(function (result) {
            //         console.log(result);
            //         res.json(result)
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });
        })

}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}