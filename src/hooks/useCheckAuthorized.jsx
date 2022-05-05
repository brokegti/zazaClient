import { useEffect , useState } from 'react'
import { SESSIONIZE , GET_SESSIONIZED } from '../helpers/sessions'
const useCheckAuthorized = () => {

    let session_tkn = GET_SESSIONIZED('auth_tkn')
    const [token,setToken] = useState(session_tkn)
    useEffect(()=>{
        setToken(GET_SESSIONIZED("auth_tkn"))
        if(!token && window.location.pathname!=="/"){
            window.location.pathname="/"
        }
    },[token])

    if( token ) return token ;
    return false;


}

export default useCheckAuthorized