const LOCALIZE = ( name , val ) => { 
    
    sessionStorage.setItem( name , JSON.stringify(val))
}
const GET_LOCALIZED = ( name ) => { 
    if( sessionStorage.getItem(name ))
        return JSON.parse(sessionStorage.getItem(name))
    else return null
}

export { LOCALIZE , GET_LOCALIZED }
