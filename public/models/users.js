import {connection, Schema} from "../store/mongoStore";

export const User = connection.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean 
}));
