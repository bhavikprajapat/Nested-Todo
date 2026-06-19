import React from "react"

function Arrayprac(){
    let name = ["Bhavik","Rahul","Kishan","manish"]
    let number = [25,30,45,60,10,20,50,70]
    let cart = [
        {
            name:"Mobile",price:40000
        },
        {
            name:"Laptop",price:60000
        },
        {
            name:"Mouse",price:1000
        },
    ]

    const totalprice = cart.reduce((acc,item)=>{
        console.log(acc)
        return acc+item.price
    },0);
    console.log(totalprice)

   let newdata =  number.every((item,index)=>{
        return item > 5
    })
    console.log(newdata)
    // let results = number.toSorted((a,b)=>{
    //     return b-a;
    // })
    // let result = Math.random()
    // console.log(result)
    // console.log(results)
    // console.log(number)
//     const fruits = ["Banana", "Orange", "Apple", "Mango"];
//     const position = fruits.includes("Appl")
//     console.log(position) 
//   const citrus = fruits.slice(2);
   
//     let newdata = number.find((item,index)=>{
//        return item > 18;
//     })
//     console.log(newdata)
    
    
    


    // let details = name.concat(car,age,"venugopal")

    // let updates = name.toString()
    
    
    return(
        <div>
            {
        number.map((item,index)=>{
           return <h1 key={index}>{item}</h1>
        })
    }
        {/* {
            name.forEach((item,index)=>{
                console.log(item,index)
            })
        } */}
        </div>
    
    )
}
export default Arrayprac


