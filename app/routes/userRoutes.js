var userCtrl = require('./../controllers/userCtrl');
const baseUrl = require('./../../config').baseUrl;
var expressJoi = require('express-joi');
var Joi = expressJoi.Joi;
var UsersSchema = {
    admin: {
        getList: {
            limit: Joi.types.Number().integer().min(1).max(25).required(),
            offset: Joi.types.Number().integer().min(0).max(25).required(),
            fields: Joi.types.String().optional()
        },
        get: {
            id: Joi.types.String().required(),
        },
        update: {
            id: Joi.types.String().required(),
            imageUrl: Joi.types.String().optional(),
            facebook: Joi.types.String().optional(),
            twitter: Joi.types.String().optional(),
            linkedin: Joi.types.String().optional(),
            github: Joi.types.String().optional(),
            gplus: Joi.types.String().optional(),
            resume: Joi.types.String().optional()
        },
        delete: {
            id: Joi.types.String().required(),
        }
    },
    user: {
        getMyData: {},
        getPublicResource: {
            resource: Joi.types.String().required()
        }
    },
    public: {
        getAllPublicData: {
            username: Joi.types.String().required()
        },
        getPublicResource: {
            username: Joi.types.String().required(),
            resource: Joi.types.String().optional()
        },
        create: {
            username: Joi.types.String().required(),
            name: Joi.types.String().required(),
            email: Joi.types.String().required(),
            facebook: Joi.types.String().optional(),
            twitter: Joi.types.String().optional(),
            linkedin: Joi.types.String().optional(),
            github: Joi.types.String().optional(),
            gplus: Joi.types.String().optional(),
            resume: Joi.types.String().optional()
        }
    }
};
module.exports = function (app) {
    //admin
    app.get(`${baseUrl}/admin/users`, expressJoi.joiValidate(UsersSchema.admin.getList), userCtrl.admin.getList);
    app.get(`${baseUrl}/admin/users/:id`, expressJoi.joiValidate(UsersSchema.admin.get), userCtrl.admin.get);
    app.put(`${baseUrl}/admin/users/:id`, expressJoi.joiValidate(UsersSchema.admin.update), userCtrl.admin.update);
    app.delete(`${baseUrl}/admin/users/:id`, expressJoi.joiValidate(UsersSchema.admin.delete), userCtrl.admin.delete);
    //user
    app.get(`${baseUrl}/me`, expressJoi.joiValidate(UsersSchema.user.getMyData), userCtrl.user.getMyData);
    app.get(`${baseUrl}/me/:resource`, expressJoi.joiValidate(UsersSchema.user.getMyResource), userCtrl.user.getMyResource);
    //public
    app.get(`/:username`, expressJoi.joiValidate(UsersSchema.public.getAllPublicData), userCtrl.public.getAllPublicData);
    app.get(`/:username/:resource`, expressJoi.joiValidate(UsersSchema.public.getPublicResource), userCtrl.public.getPublicResource);
    app.post(`${baseUrl}/users`, expressJoi.joiValidate(UsersSchema.public.create), userCtrl.public.create);
}
