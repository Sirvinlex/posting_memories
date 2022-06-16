import { combineReducers } from "redux";
import Posts from './posts';
import Auth from './auth'
export default combineReducers({posts: Posts, auth: Auth})

