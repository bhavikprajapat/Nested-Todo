import React from 'react'

const Task2 = () => {
    let a = [1,1,2,2,3,3,4,4,5,5,7,8,9]
    let update = [...new Set(a)]
    // console.log(update) 

    
  return (
    <div>a={update}</div>
  )
}

export default Task2