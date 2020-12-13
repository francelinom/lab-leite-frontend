import decode from 'jwt-decode';
import request from './request'
import {userKey} from "@/global"

export async function signIn (username, password){
    const {token} = await request ('POST', '/login/',{
        username,
        password
    });
    localStorage.set(userKey, token);
}

export function signOut () {
    localStorage.removeItem(userKey);
}

export function isSignedIn () {
    const token = localStorage.getItem(userKey);

    if(!token)
        return false;
    
    try {
        const {exp: experation} = decode(token);
        const isExpired = !!experation && Date.now() > experation *1000;
        if(isExpired)
            return false;
        
        return true;        
    }catch (_){
        return false;
    }
}
