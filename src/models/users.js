const {Schema, Model} = require("../store/mongoStore");

const UserModel = Model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));

class Users {
    static async createUser(name, password, admin){
        return await UserModel.create({name, password, admin});
    }

    static async editUser(name = null, password = null, admin = null){
        let user = await UserModel.where({ name: name }).findOne().exec();
        user.name = name || user.name;
        user.password = password || user.password;
        user.admin = admin == null ? user.admin : false;
        user.save();
        return user;
    }

    static async deleteUser(name){
        return await UserModel.where({ name: name }).deleteOne().exec();
    }

    static async getUser(name){
        return await UserModel.findOne({name: name}).exec();
    }

    static async getUsers(){
        return await UserModel.find({}).exec();
    }
}

module.exports = Users;
