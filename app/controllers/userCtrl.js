var User = require('./../models/user');
var shortHands = require('./../utils/shortHands');
module.exports = {
    admin: {
        getList: function (req, res) {
            var limit = parseInt(req.items.limit);
            var offset = parseInt(req.items.offset);
            var fields = req.items.fields;
            User.find().limit(limit).skip(offset).select(fields).exec(function (err, users) {
                if (err) res.send(err);
                res.json(users);
            });
        },
        get: function (req, res) {
            var id = req.items.id;
            User.findById(id).exec(function (err, user) {
                if (err) res.send(err);
                res.json(user);
            });
        },
        update: function (req, res) {
            var id = req.items.id;
            User.update({
                _id: id
            }, {
                $set: req.items
            }).exec(function (err) {
                if (err) res.send(err);
                res.json({
                    message: 'User updated!',
                    status: 1
                });
            })
        },
        delete: function (req, res) {
            User.findOneAndRemove({
                _id: req.items.id
            }).exec(function (err, user) {
                if (err) res.send(err);
                res.json({
                    message: 'User Deleted!',
                    status: 1
                });
            });
        }
    },
    user: {
        getMyData: function (req, res) {},
        getMyResource: function (req, res) {},
    },
    public: {
        getAllPublicData: function (req, res) {
            User.findOne({
                username: req.items.username
            }).exec(function (err, user) {
                if (err) res.send(err);
                res.json(user);
            });
        },
        getPublicResource: function (req, res) {
            var resource = req.items.resource;
            if (resource.length === 1) {
                resource = shortHands[resource];
            }
            User.findOne({
                username: req.items.username
            }).select(resource).exec(function (err, user) {
                if (err) res.send(err);
                var resourceLink = user[resource];
                if (resourceLink) {
                    if (resource === "email") {
                        res.redirect(`mailto:${resourceLink}`)
                    } else {
                        res.redirect(resourceLink);
                    }
                } else {
                    res.json({
                        message: 'User hasn\' added this url!',
                        status: 1
                    });
                }
            });
        },
        create: function (req, res) {
            var user = new User();
            Object.assign(user, req.items)
            user.save(function (err) {
                if (err) res.send(err);
                res.json({
                    message: 'User Saved!',
                    status: 1
                });
            });
        }
    }
}
