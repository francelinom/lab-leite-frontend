import {userKey} from '@/global'

function getHeaders () {
    const token = localStorage.getItem(userKey);
    return{
        'Content-Type':'application/json',
        ...token && {
            'Authorization': `JWT ${token}`
        }
    };
}
async function request (method, url, body){
    const options = {
        method,
        headers: getHeaders(),
        ...getHeaders(method !== 'GET') && {
            body: JSON.stringify(body)
        }
    };
    const response = await fetch (url, options);
    return await response.json();
    
}
export {request as default, request, getHeaders }