
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
                setdata([...data, { ...values, subdata: [] }
                ])
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


    const Edit = (it, indtask) => {
        seteditindex(indtask)
        setValues(it)
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
    const Delete = (ind) => {
        setdata(data.filter((_, index) => (
            index !== ind

        )))
    }
    const newdata = (parentIndex, subIndex) => {
        setdata((prev) =>
            prev.map((item, index) => {
                if (index === parentIndex) {
                    return {
                        ...item,
                        subdata: item.subdata.filter(
                            (_, i) => i !== subIndex
                        ),
                    };
                }
                return item;
            })
        );
    };



    const { handleSubmit, handleBlur, handleChange, values, setValues } = formik
    const { fname } = values
    return (
        <div >
            <div className='d-flex justify-content-center ' style={{ background: "black" }}>

                <div className=' d-flex justify-content-center'>
                    <h1 style={{ color: "white", fontSize: "40px" }} className='px-5 py-3'>Enter Today Task Here....</h1>
                    <form onSubmit={handleSubmit} className='d-flex justify-content-between align-items-center'>
                        <div>
                            <label htmlFor="fname">Name</label>
                            <input
                                id='fname'
                                name='fname'
                                type="text"
                                className='inputset'
                                onBlur={handleBlur}
                                onSubmit={handleSubmit}
                                value={fname}
                                onChange={handleChange}
                            />
                            {formik.touched.fname && formik.errors.fname ? (
                                <div style={{ color: "white", textAlign: "center" }}>{formik.errors.fname}</div>
                            ) : null}

                        </div>

                        <div>
                            <button
                                type="submit"
                                className="btn w-100 mx-3  fw-semibold text-white"
                                style={{
                                    background: "linear-gradient(135deg,#6366f1,#06b6d4)",
                                    border: "none",
                                    borderRadius: "12px",
                                    padding: "12px",
                                    transition: "0.3s",
                                }}
                            >
                                {editindex !== null ? "Update User" : "Add User"}
                            </button>
                        </div>

                    </form>

                </div>
            </div>


            <div className=" d-flex" >
                <div className="  col-12  overflow-hidden card  scrolled" style={{ background: "#064857", color: "white" }}>
                     <h3 style={{ textAlign: "center",background:"#ffff",color:"#227c92ff",padding:"0",fontWeight:"700" }} className='py-3' >Main Task</h3>
                    <div className='d-flex justify-content-between px-3' style={{ color: "white" }} >
                        <h5>Name</h5>
                        <h5 className='text-center'>Action</h5>
                    </div>
                    <div className='px-3'>
                                  {data.length === 0 ? (
                        <h4 className="text-center">
                            No Tasks Found
                        </h4>
                    ) : (

                        data?.map((item, i) => (
                            <div

                                key={i}>
                               

                                <div className='d-flex justify-content-between align-items-center'>

                                    <div>
                                        <h5>{item.fname}</h5>
                                    </div>


                                    <div className='align-items-center h-100'>
                                        <button
                                            className="btn btn-warning  me-2"
                                            onClick={() =>
                                                Edit(item, i)
                                            }
                                        >
                                            <FaEdit style={{ fontSize: "25" }} />
                                        </button>

                                        <button
                                            className="btn btn-danger  me-2"
                                            onClick={() =>
                                                Delete(i)
                                            }
                                        >
                                            <MdDelete style={{ fontSize: "25" }} />
                                        </button>

                                        <button
                                            className="btn btn-success "
                                            onClick={() => { setdisplay(true); setSelectID(i) }
                                            }
                                        >
                                            <TbSubtask style={{ fontSize: "25" }} />
                                        </button>
                                    </div>
                                </div>


                                <h4 style={{ textAlign: "center" }}>Sub Tasks</h4>

                                {

                                    item.subdata.length === 0 ? (

                                        <p>No Sub Task</p>
                                    ) : (
                                        item.subdata.map((it, id) => (

                                            <div className='d-flex justify-content-between mx-2 my-2'>
                                                <span>{it}</span>

                                                <div>

                                                    <button
                                                        className="btn btn-warning btn-sm me-2"
                                                        onClick={() =>
                                                            Editsub(
                                                                it,
                                                                i,
                                                                id
                                                            )
                                                        }
                                                    >
                                                        <FaEdit />
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() =>
                                                            newdata(

                                                                i, id
                                                            )
                                                        }

                                                    >
                                                        <MdDelete />
                                                    </button>

                                                </div>

                                            </div>

                                        )
                                        )

                                    )

                                }
                                <hr />
                            </div>

                        ))
                    )}

                    {
                        display && (
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
                                        <h4 style={{ color: "black" }}>
                                            {editindexsub !== null
                                                ? "Edit Sub Task"
                                                : "Add Sub Task"}
                                        </h4>

                                        <FaWindowClose

                                            size={25}
                                            style={{ cursor: "pointer", color: "black" }}
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
                        )
                    }
                    </div>
                  





                </div >
            </div >


        </div >

    )
}

export default Task6copy