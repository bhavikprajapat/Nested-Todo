import React from 'react'

const Task5 = () => {
  let  a = [1,2,3,[1,2],4,5,[3,4],6]
    let newarr = a.flat();
    console.log(newarr)
  return (
    <div>
       {newarr} 
    </div>
  )
}

export default Task5