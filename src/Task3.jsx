import React, { useState } from 'react'

const Task3 = () => {
    let a=  [1,2,3,4,5]
    let b = [1,3,5,7,9]
  


  return (
    <div>
    {
        a.map((item,index)=>{
        return (
        item * b[index]
        )

    })
    }
      </div>
  )
}

export default Task3