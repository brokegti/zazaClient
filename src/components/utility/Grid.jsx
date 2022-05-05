import styled from 'styled-components'
import React, { useEffect , useState } from 'react'


const G = styled.section`
    display: grid;
    grid-template-columns: repeat(1,1fr);
    place-items: center;


    @media ( min-width: 750px){
        grid-template-columns: repeat(2,1fr);
    }
    @media ( min-width: 950px ){
        grid-template-columns: repeat(3,1fr);
    }
    @media ( min-width: 1250px) { 
        grid-template-columns: repeat(4,1fr);
    }


`

const Grid = ( children ) => {
  console.log(children)
  const [error, setError] = useState("")
  useEffect(()=>{
    let result = true;
    children.forEach(child=>{
      if(Object.keys(child).length > 0) {
        setError("Invalid child")
      }
    })

  })
  if( error ) return <span>{error}</span>
  return  (
    <G>
    {
     children
    }
    </G>
  )
}

export default Grid