/**
 * 
 * @param {Number} start index to start range at
 * @param {Number} end index to end range at 
 * @param {Number} step how much to increment, default 1
 * @param {Boolean} inclusive default false, should range include end? 
 * @returns {[Number]} a range of numbers between start and end with given step
 */
const range = ( start , end , step=1 , inclusive = false) => { 
    let rangeCondition;
    let rng = []
    inclusive 
        ? rangeCondition = (i) => i <= end 
        : rangeCondition = (i) => i < end
    
    for(let i = 0; rangeCondition(i); i+=step) {
        rng.push(i)
    }

    return rng

}


const update = ( arr, condition , updates ) => {
    const rng = range(0,arr.length);
    rng.forEach(i=>{
      if(condition(arr[i])){
        Object.keys(updates).forEach( key => {
          arr[i][key] = updates[key]
        })
      }
      return condition(arr[i])
    })
}

const updateFirst = ( arr, condition , updates , n=1 ) => {
    const rng = range(0,arr.length);
    let count = 0
    rng.some(i=>{
      if(condition(arr[i])){
        Object.keys(updates).forEach( key => {
          arr[i][key] = updates[key]
        })
        count++
      }
      return condition(arr[i]) && count >= n
    })
}









// export { 
//     update , updateFirst, range
// }