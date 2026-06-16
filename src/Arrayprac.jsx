import React from "react"

function Arrayprac(){
    let name = ["Bhavik","Rahul","Kishan","manish"]

    const fruits = ["Banana", "Orange", "Apple", "Mango"];
  const citrus = fruits.slice(2);
    console.log(citrus)


    
    
    


    // let details = name.concat(car,age,"venugopal")

    // let updates = name.toString()
    
    
    return(
        <div>
            {
        name.map((item,index)=>{
           return <h1 key={index}>{citrus}</h1>
        })
    }
        </div>
    
    )
}
export default Arrayprac


