
import React, { useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup';
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { TbSubtask } from 'react-icons/tb';

const Task6copy = () => {
    const [data, setdata] = useState([])
    const [editindex, seteditindex] = useState(null)
    const [display, setdisplay] = useState(false)
    const [selectID, setSelectID] = useState(null);
    const [editindexsub, seteditindexsub] = useState(null)




    const formik = useFormik({
        initialValues: {
            fname: "",
        },
        validationSchema: Yup.object().shape({
            fname: Yup.string()
                .matches(/^[A-Za-z\s]+$/, 'Only Latter use')
                .required('Required')
        }),
        onSubmit: (values, { resetForm }) => {

            if (editindex !== null) {
                let temp = [...data]
                temp[editindex] = values
                setdata(temp)
                seteditindex(null)
            }
            else {
                setdata([...data, values])
                // localStorage.setItem("savedata", JSON.stringify(data))
            }
            resetForm();
        },
    })

    const formiksubvalue = useFormik({
        initialValues: {
            sname: "",
        },
        validationSchema: Yup.object().shape({
            sname: Yup.string()
                .matches(/^[A-Za-z\s]+$/, 'Only Latter use')
                .required('Required')
        }),
        onSubmit: (values, { resetForm }) => {
            // console.log(selectID || editindexsub, selectID, editindexsub)
            if (editindexsub !== null) {
                setdata((prev) =>
                    prev.map((item, i) => {
                        if (i === selectID) {
                            return {
                                ...item,
                                subdata: item.subdata.map((sub, id) =>
                                    id === editindexsub ? values.sname : sub
                                ),
                            };
                        }
                        return item;
                    })
                );
            }
            else {
                let newData = data.map((item, ind) => {
                    let subData = item.subdata ? item.subdata : []

                    if (ind === selectID) {
                        return { ...item, subdata: [...subData, values.sname] }
                    }
                    else {
                        return item
                    };
                })
                setdata(newData)
                // console.log(data)
                resetForm();
            }

        },

    })


    const Edit = (item, i) => {
        seteditindex(i)
        setValues(item)
    }

    const Editsub = (it, i, id) => {
        // console.log(it, i, id)
        setSelectID(i)
        seteditindexsub(id)
        formiksubvalue.setValues({
            sname: it
        })
        setdisplay(true);
    }
    const Delete = (id) => {
        setdata(data.filter((_, index) => (
            index !== id

        )))
    }
    const newdata = (it, id) => {
        setdata((prev) =>
            prev.map((item, index) => {
                if (index === it) {
                    return {
                        ...item,
                        subdata: item.subdata.filter((_, i) => i !== id),
                    };
                }
                return item;
            })
        );
    };


    // function addtask(item) {
    //     console.log(item)
    // }

    // function handelsubdata(){
    //     setdata([...data,setsubdata])
    //     console.log(data)
    // }
    const { handleSubmit, handleBlur, handleChange, values, setValues } = formik
    const { fname } = values
    return (
        // <div>
        //     <div className='d-flex justify-content-center '>
        //         {/* for input ui  */}
        //         <div className='outer_box d-flex justify-content-center'>
        //             <h1 style={{ color: "white", fontSize: "40px" }} className='px-5 py-3'>Enter Today Task Here....</h1>
        //             <form onSubmit={handleSubmit} className='d-flex justify-content-between align-items-center'>
        //                 <div>
        //                     <label htmlFor="fname">Name</label>
        //                     <input
        //                         id='fname'
        //                         name='fname'
        //                         type="text"
        //                         className='inputset'
        //                         onBlur={handleBlur}
        //                         onSubmit={handleSubmit}
        //                         value={fname}
        //                         onChange={handleChange}
        //                     />
        //                     {formik.touched.fname && formik.errors.fname ? (
        //                         <div style={{ color: "white", textAlign: "center" }}>{formik.errors.fname}</div>
        //                     ) : null}

        //                 </div>

        //                 <div>
        //                     <button
        //                         type="submit"
        //                         className="btn w-100 mx-3  fw-semibold text-white"
        //                         style={{
        //                             background: "linear-gradient(135deg,#6366f1,#06b6d4)",
        //                             border: "none",
        //                             borderRadius: "12px",
        //                             padding: "12px",
        //                             transition: "0.3s",
        //                         }}
        //                     >
        //                         {editindex !== null ? "Update User" : "Add User"}
        //                     </button>
        //                 </div>

        //             </form>

        //         </div>
        //     </div>


        //     <div className="mt-5 ">
        //         <div className="table-responsive shadow-lg rounded-4 overflow-hidden scrolled">
        //             <table className="table mb-0">
        //                 <thead style={{ background: "#ffffffff", color: "white" }}>
        //                     <tr className='d-flex justify-content-between' >
        //                         <th>ID</th>
        //                         <th>Task</th>
        //                         <th>Action</th>
        //                     </tr>

        //                 </thead>

        //                 <tbody style={{ background: "#fff" }}>
        //                     {/* {console.log(data)} */}
        //                     {data.length === 0 ? (
        //                         <h4 className="text-center text-muted">
        //                             No Tasks Found
        //                         </h4>
        //                     ) : (

        //                         data?.map((item, i) => (
        //                             <div className="col-lg-4 col-md-6 mb-4"
        //                                 key={i}>
        //                                 <h5>{item.fname}</h5>

        //                                 <div>
        //                                     <button
        //                                         className="btn btn-warning btn-sm me-2"
        //                                         onClick={() =>
        //                                             Edit(item, i)
        //                                         }
        //                                     >
        //                                         <FaEdit />
        //                                     </button>

        //                                     <button
        //                                         className="btn btn-danger btn-sm me-2"
        //                                         onClick={() =>
        //                                             Delete(i)
        //                                         }
        //                                     >
        //                                         <MdDelete />
        //                                     </button>

        //                                     <button
        //                                         className="btn btn-success btn-sm"
        //                                         onClick={() => { setdisplay(true); setSelectID(i) }
        //                                         }
        //                                     >
        //                                         <TbSubtask />
        //                                     </button>
        //                                 </div>
        //                                 <hr />
        //                                 <h6>Sub Tasks</h6>
        //                                 {

        //                                     item.subdata.length === 0 ? (

        //                                         <p>No Sub Task</p>
        //                                     ) : (
        //                                         item.subdata.map((it, id) => (

        //                                             <div className='d-flex justify-content-between'>
        //                                                 <span>{it}</span>

        //                                                 <div>
        //                                                     <button
        //                                                         className="btn btn-warning btn-sm me-2"
        //                                                         onClick={() =>
        //                                                             Editsub(
        //                                                                 it,
        //                                                                 i,
        //                                                                 id
        //                                                             )
        //                                                         }
        //                                                     >
        //                                                         <FaEdit />
        //                                                     </button>

        //                                                     <button
        //                                                         className="btn btn-danger btn-sm"
        //                                                         onClick={() =>
        //                                                             newdata(
        //                                                                 it,
        //                                                                 i
        //                                                             )
        //                                                         }
        //                                                     >
        //                                                         <MdDelete />
        //                                                     </button>
        //                                                 </div>
        //                                             </div>

        //                                         ))
        //                                     )

        //                                 }



        //                             </div>









        //                         ))
        //                     )}

        //                     {
        //                         display === false ? (
        //                             <tr></tr>
        //                         ) : (
        //                             <div className='d-flex justify-content-center'>
        //                                 {/* for SubTask Ui  */}
        //                                 <div className='outer_box1 d-flex p-1 '>
        //                                     <h1 style={{ color: "Black", fontSize: "40px" }} className='px-5 py-3'>Enter Today Task Here....</h1>
        //                                     <form onSubmit={formiksubvalue.handleSubmit}>
        //                                         <label htmlFor="sname"></label>
        //                                         <input
        //                                             id='sname'
        //                                             name='sname'
        //                                             type="text"
        //                                             className='inputset2'
        //                                             onBlur={formiksubvalue.handleBlur}
        //                                             value={formiksubvalue.values.sname}
        //                                             onChange={formiksubvalue.handleChange}
        //                                         />


        //                                         <div></div>

        //                                         <button
        //                                             type="submit"
        //                                             className="btn w-100 mt-2 fw-semibold text-white"
        //                                             style={{
        //                                                 background: "linear-gradient(135deg,#6366f1,#06b6d4)",
        //                                                 border: "none",
        //                                                 borderRadius: "12px",
        //                                                 padding: "10px",
        //                                                 transition: "0.3s",

        //                                             }}
        //                                         >
        //                                             {editindexsub !== null ? "Update User" : "Add User"}
        //                                         </button>
        //                                         <div className='d-flex w-100'>
        //                                             <button
        //                                                 style={{
        //                                                     background: "linear-gradient(125deg,#6366f1,#06b6d5)",
        //                                                     border: "none",
        //                                                     borderRadius: "12px",
        //                                                     padding: "10px",
        //                                                     transition: "0.3s",
        //                                                     color: "white",
        //                                                     width: "50%",
        //                                                     margin: "auto",
        //                                                     marginTop: "5px"
        //                                                 }}
        //                                                 onClick={() => setdisplay(false)}
        //                                             >
        //                                                 <FaWindowClose />
        //                                             </button>
        //                                         </div>

        //                                     </form>

        //                                     {/* <form>
        //                                         <input type="text" value={subdata} placeholder='Enter Your Name' onChange={(e)=> setsubdata(e.target.value)}/>
        //                                         <button onClick={handelsubdata()}>Submit</button>
        //                                     </form> */}

        //                                 </div>
        //                             </div>
        //                         )}
        //                 </tbody>




        //             </table>
        //         </div >
        //     </div >
        //     {display && (
        //         <div
        //             className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        //             style={{
        //                 background: "rgba(0,0,0,0.5)",
        //                 zIndex: 999,
        //             }}
        //         >
        //             <div
        //                 className="bg-white p-4 rounded-4 shadow"
        //                 style={{
        //                     width: "400px",
        //                     maxWidth: "90%",
        //                 }}
        //             >
        //                 <div className="d-flex justify-content-between align-items-center mb-3">
        //                     <h4>
        //                         {editindexsub !== null
        //                             ? "Edit Sub Task"
        //                             : "Add Sub Task"}
        //                     </h4>

        //                     <FaWindowClose
        //                         size={25}
        //                         style={{ cursor: "pointer" }}
        //                         onClick={() => {
        //                             setdisplay(false);
        //                             seteditindexsub(null);
        //                         }}
        //                     />
        //                 </div>

        //                 <form onSubmit={formiksubvalue.handleSubmit}>
        //                     <input
        //                         type="text"
        //                         name="sname"
        //                         className="form-control"
        //                         placeholder="Enter Sub Task"
        //                         value={formiksubvalue.values.sname}
        //                         onChange={formiksubvalue.handleChange}
        //                         onBlur={formiksubvalue.handleBlur}
        //                     />

        //                     {formiksubvalue.touched.sname &&
        //                         formiksubvalue.errors.sname && (
        //                             <small className="text-danger">
        //                                 {formiksubvalue.errors.sname}
        //                             </small>
        //                         )}

        //                     <button className="btn btn-primary w-100 mt-3">
        //                         {editindexsub !== null
        //                             ? "Update Sub Task"
        //                             : "Add Sub Task"}
        //                     </button>
        //                 </form>
        //             </div>
        //         </div>
        //     )}

        // </div >
        <div className="container py-5">
            {/* Main Form */}

            <div className="card shadow-lg p-4 border-0 rounded-4">
                <h2 className="text-center mb-4">Task Manager</h2>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-9">
                            <input
                                type="text"
                                name="fname"
                                className="form-control"
                                placeholder="Enter Task"
                                value={fname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            {formik.touched.fname && formik.errors.fname && (
                                <small className="text-danger">
                                    {formik.errors.fname}
                                </small>
                            )}
                        </div>

                        <div className="col-md-3">
                            <button className="btn btn-primary w-100">
                                {editindexsub !== null ? "Update Task" : "Add Task"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Task Cards */}

            <div className="row mt-5">
                {data.length === 0 ? (
                    <h4 className="text-center text-muted">
                        No Tasks Found
                    </h4>
                ) : (
                    data.map((item, taskIndex) => (
                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={taskIndex}
                        >
                            <div className="card shadow border-0 rounded-4 h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5>{item.fname}</h5>

                                        <div>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    editindexsub(item, taskIndex)
                                                }
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() =>
                                                    Delete(id)
                                                }
                                            >
                                                <MdDelete />
                                            </button>

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => { setdisplay(true); setSelectID(i) }
                                                }
                                            >
                                                <TbSubtask />
                                            </button>
                                        </div>
                                    </div>

                                    <hr />

                                    <h6>Sub Tasks</h6>

                                    {item.subdata.length === 0 ? (
                                        <p className="text-muted">
                                            No Sub Tasks
                                        </p>
                                    ) : (
                                        item.subdata.map((sub, subIndex) => (
                                            <div
                                                key={subIndex}
                                                className="bg-light rounded p-2 mb-2 d-flex justify-content-between align-items-center"
                                            >
                                                <span>{sub}</span>

                                                <div>
                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() =>
                                                            editindexsub(
                                                                sub,
                                                                taskIndex,
                                                                subIndex
                                                            )
                                                        }
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            newdata(
                                                                taskIndex,
                                                                subIndex
                                                            )
                                                        }
                                                    >
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}

            {display && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        background: "rgba(0,0,0,0.5)",
                        zIndex: 999,
                    }}
                >
                    <div
                        className="bg-white p-4 rounded-4 shadow"
                        style={{
                            width: "400px",
                            maxWidth: "90%",
                        }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4>
                                {editindexsub !== null
                                    ? "Edit Sub Task"
                                    : "Add Sub Task"}
                            </h4>

                            <FaWindowClose
                                size={25}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setdisplay(false);
                                    seteditindexsub(null);
                                }}
                            />
                        </div>

                        <form onSubmit={formiksubvalue.handleSubmit}>
                            <input
                                type="text"
                                name="sname"
                                className="form-control"
                                placeholder="Enter Sub Task"
                                value={formiksubvalue.values.sname}
                                onChange={formiksubvalue.handleChange}
                                onBlur={formiksubvalue.handleBlur}
                            />

                            {formiksubvalue.touched.sname &&
                                formiksubvalue.errors.sname && (
                                    <small className="text-danger">
                                        {formiksubvalue.errors.sname}
                                    </small>
                                )}

                            <button className="btn btn-primary w-100 mt-3">
                                {editindexsub !== null
                                    ? "Update Sub Task"
                                    : "Add Sub Task"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Task6copy