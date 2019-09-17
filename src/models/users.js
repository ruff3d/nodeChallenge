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

    static async editUser(name, password, admin){
        let user = await UserModel.where({ name: name }).findOne();
        user.name = name || user.name;
        user.password = password || user.password;
        user.admin = admin || user.admin;
        user.save();
    }

    static async deleteUser(name){
        await UserModel.where({ name: name }).deleteOne()
    }

    static async getUser(name){
        await UserModel.where({ name: name }).findOne()
    }

    static async getUsers(){
        await UserModel.findAll();
    }
}

module.exports = Users;
