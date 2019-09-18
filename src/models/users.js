const {connection, Schema, Model} = require("../store/mongoStore");

const UserModel = Model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));

class Users {
    static async createUser(name, password, admin){
        await UserModel.create({name, password, admin});
    }

    static async editUser(name = null, password = null, admin = null){
        let user = await UserModel.where({ name: name }).findOne().exec();
        user.name = name || user.name;
        user.password = password || user.password;
        user.admin = admin == null ? user.admin : false;
        user.save();
    }

    static async deleteUser(name){
        await UserModel.where({ name: name }).deleteOne().exec();
    }

    static async getUser(name){
        await UserModel.findOne({name: name}).exec();
    }

    static async getUsers(){
        await UserModel.find({}).exec();
    }
}

module.exports = Users;
