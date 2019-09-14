import {connection, Schema} from "../store/mongoStore";

const UserModel = connection.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));

export class Users {
    async static createUser(name, password, admin){
        await UserModel.create({name, password, admin})
    }

    async static editUser(name, password, admin){
        let user = await UserModel.where({ name: name }).findOne();
        user.name = name || user.name;
        user.password = password || user.password;
        user.admin = admin || user.admin;
        user.save();
    }

    async static deleteUser(name){
        await UserModel.where({ name: name }).deleteOne()
    }

    async static getUser(name){
        await UserModel.where({ name: name }).findOne()
    }

    async static getUsers(){
        await UserModel.findAll();
    }
}
