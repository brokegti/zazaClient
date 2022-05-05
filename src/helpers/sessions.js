const SESSIONIZE = ( name , val ) => { 
    console.log(`sessionize: {${name}:${val}}`)
    if(!val) return 
    sessionStorage.setItem( name , JSON.stringify(val))
}
const GET_SESSIONIZED = ( name ) => { 
    if( sessionStorage.getItem(name ))
        return JSON.parse(sessionStorage.getItem(name))
    else return null
}

export { SESSIONIZE , GET_SESSIONIZED}