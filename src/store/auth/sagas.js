  
import {call, put,  takeLatest} from '@redux-saga/core/effects'


import {
    getActiveUser,
    login,
    logout,
    register,
    setActiveUser,
    setToken,
} from './slice'

//workeri
import UserService from '../../services/UserService';

function* handleRegister(action){
    try{
        const {user, token} = yield call(UserService.register, action.payload)
        yield put (setActiveUser(user))
        yield put(setToken(token))
    }catch(error){
        console.log(error);
    }
}

function* handleLogin(action){
    try{
        const{user, token} = yield call(UserService.login, action.payload)
        yield put(setActiveUser(user))
        yield put(setToken(token))
    }catch(error){
        console.log(error);
    }
}

function* handleLogout() {
    try{
        yield call(UserService.logout)
        yield put(setToken(null));
        yield put(setActiveUser(null));
    }catch(error){
        console.log(error);
    }
}

function* handleActiveUser(){
    try{
        const activeUser = yield call(UserService.getActiveUser);
        yield put(setActiveUser(activeUser));
    }catch(error){
        console.log(error);
    }
}
//watcheri

export function* watchRegister(){
    yield takeLatest(register.type, handleRegister)

}

export function* watchLogin(){
    yield takeLatest(login.type, handleLogin)
}
export function* watchLogout(){
    yield takeLatest(logout.type, handleLogout)
}

export function* watchGetActiveUser(){
    yield takeLatest(getActiveUser.type, handleActiveUser)
}