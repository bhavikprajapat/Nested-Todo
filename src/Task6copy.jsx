
import React, { useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup';
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { TbSubtask } from 'react-icons/tb';

const Task6copy = () => {
    const [data, setdata] = useState([])
    // const [subdata, setsubdata] = useState([])
    const [editindex, seteditindex] = useState(null)
    const [display, setdisplay] = useState(false)
    const [selectID, setSelectID] = useState(null);
<<<<<<< HEAD
    const [editindexsub, seteditindexsub] = useState(null)


=======
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af
    // useEffect(() => {
    //     localStorage.setItem("savedata", JSON.stringify(data))
    // }, [data])



    // useEffect(() => {
    //     const stored = JSON.parse(localStorage.getItem("savedata"));
    //     if (stored) {
    //         setdata(stored);
    //     }
    // }, []);

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

<<<<<<< HEAD
    const formiksubvalue = useFormik({
=======
    const formiksub = useFormik({
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af
        initialValues: {
            sname: "",
        },
        validationSchema: Yup.object().shape({
            sname: Yup.string()
                .matches(/^[A-Za-z\s]+$/, 'Only Latter use')
                .required('Required')
        }),
<<<<<<< HEAD
        onSubmit: (values, { resetForm }) => {
            let newData = data.map((item, ind) => {
                let subData = item.subdata ? item.subdata : []

=======
        onSubmit: (values,{ resetForm }) => {
            let newData = data.map((item, ind) => {
                let subData = item.subdata ? item.subdata : []
                console.log({ ...item, subdata: [...subData, values.sname] });
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af
                if (ind === selectID) {
                    return { ...item, subdata: [...subData, values.sname] }
                }
                else {
                    return item
                };
            })
<<<<<<< HEAD
            setdata(newData)
            console.log(data)
            resetForm()
        },

=======
            setdata(newData);
            resetForm()
            // console.log(newData);
        },
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af
    })


    const Edit = (item, i) => {
        seteditindex(i)
        setValues(item)
    }

    const Editsub = (it, i) => {
        console.log(it)
        seteditindexsub(i)
        setValues(it)
    }
    const Delete = (i) => {
        setdata(data.filter((_, index) => (
            index !== i

        )))


    }

<<<<<<< HEAD
    // function addtask(item) {
    //     console.log(item)
    // }
=======
    function addtask() {
        console.log(sname);
    }
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af

    // function handelsubdata(){
    //     setdata([...data,setsubdata])
    //     console.log(data)
    // }
    const { handleSubmit, handleBlur, handleChange, values, setValues } = formik
<<<<<<< HEAD
    const { fname } = values
=======

    const { fname, sname } = values
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af
    return (
        <div>
            <div className='d-flex justify-content-center '>
                {/* for input ui  */}
                <div className='outer_box d-flex justify-content-center'>
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


            <div className="mt-5 ">
                <div className="table-responsive shadow-lg rounded-4 overflow-hidden scrolled">
                    <table className="table mb-0">
                        <thead style={{ background: "#ffffffff", color: "white" }}>
                            <tr className='d-flex justify-content-between' >
                                <th>ID</th>
                                <th>Task</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody style={{ background: "#fff" }}>

                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        😴 No Data Found
                                    </td>
                                </tr>
                            ) : (

<<<<<<< HEAD
                                data?.map((item, i) => (
                                    <tr key={i} style={{ verticalAlign: "middle" }} >
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.fname}
=======
                                data.map((item, i) => (
                                    <tr key={i} style={{ verticalAlign: "middle" }}>
                                        <td>{i + 1}</td>
                                        <td>{item.fname}
                                            {item.subdata &&(
                                            item.subdata.map((it,id)=>{
                                                return (
                                                    <li>{it}</li>
                                                )
                                            })
                                        )}
                                        </td>
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af

                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning"
                                                    onClick={() => Edit(item, i)}
                                                >
                                                    <FaEdit style={{ fontSize: "30px" }} />

<<<<<<< HEAD
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger ms-2"
                                                    onClick={() => Delete(i)}
                                                >
                                                    <MdDelete style={{ fontSize: "30px" }} />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-success ms-2"
                                                    onClick={() => { setdisplay(true); setSelectID(i) }}
                                                >
                                                    <TbSubtask style={{ fontSize: "30px" }} />
                                                </button>

                                            </td>
                                        </tr>

                                        <tr>
                                            {

                                                item.subdata &&
                                                item.subdata.map((id, it) => (
                                                    <div className='d-flex justify-content-between'>
                                                        <tr>{it + 1}</tr>
                                                        <tr>{id}</tr>
                                                        <tr>
                                                            <tr>
                                                                <button
                                                                    className="btn btn-sm btn-warning"
                                                                    onClick={() => Editsub(it, i)}
                                                                >
                                                                    <FaEdit style={{ fontSize: "30px" }} />

                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-danger ms-2"
                                                                    onClick={() => Delete(i)}
                                                                >
                                                                    <MdDelete style={{ fontSize: "30px" }} />
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm btn-success ms-2"
                                                                    onClick={() => { setdisplay(true); setSelectID(i) }}
                                                                >
                                                                    <TbSubtask style={{ fontSize: "30px" }} />
                                                                </button>

                                                            </tr>
                                                        </tr>
                                                    </div>

                                                ))
                                            }
                                        </tr>
=======
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger ms-2"
                                                onClick={() => Delete(i)}
                                            >
                                                <MdDelete style={{ fontSize: "30px" }} />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-success ms-2"
                                                onClick={() => { setdisplay(true); setSelectID(i) }}
                                            >
                                                <TbSubtask style={{ fontSize: "30px" }} />
                                            </button>
                                        </td>
                                        
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af

                                    </tr>








                                ))
                            )}

                            {
                                display === false ? (
                                    <tr></tr>
                                ) : (
                                    <div className='d-flex justify-content-center'>
                                        {/* for SubTask Ui  */}
                                        <div className='outer_box1 d-flex p-1 '>
                                            <h1 style={{ color: "Black", fontSize: "40px" }} className='px-5 py-3'>Enter Today Task Here....</h1>
<<<<<<< HEAD
                                            <form onSubmit={formiksubvalue.handleSubmit}>
=======
                                            <form onSubmit={formiksub.handleSubmit} >
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af
                                                <label htmlFor="sname"></label>
                                                <input
                                                    id='sname'
                                                    name='sname'
                                                    type="text"

                                                    className='inputset2'
<<<<<<< HEAD
                                                    onBlur={formiksubvalue.handleBlur}
                                                    value={formiksubvalue.values.sname}
                                                    onChange={formiksubvalue.handleChange}
=======
                                                    onBlur={formiksub.handleBlur}
                                                    value={formiksub.values.sname}
                                                    onChange={formiksub.handleChange}
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af
                                                />


                                                <div></div>

                                                <button
                                                    type="submit"
                                                    className="btn w-100 mt-2 fw-semibold text-white"

                                                    style={{
                                                        background: "linear-gradient(135deg,#6366f1,#06b6d4)",
                                                        border: "none",
                                                        borderRadius: "12px",
                                                        padding: "10px",
                                                        transition: "0.3s",

                                                    }}
                                                >
                                                    {editindexsub !== null ? "Update User" : "Add User"}
                                                </button>
                                                <div className='d-flex w-100'>
                                                    <button
                                                        style={{
                                                            background: "linear-gradient(125deg,#6366f1,#06b6d5)",
                                                            border: "none",
                                                            borderRadius: "12px",
                                                            padding: "10px",
                                                            transition: "0.3s",
                                                            color: "white",
                                                            width: "50%",
                                                            margin: "auto",
                                                            marginTop: "5px"
                                                        }}
<<<<<<< HEAD

=======
>>>>>>> 32602a904d1a6e10f93a5f802ef1a70465eb34af
                                                    >
                                                        <FaWindowClose />
                                                    </button>
                                                </div>

                                            </form>

                                            {/* <form>
                                                <input type="text" value={subdata} placeholder='Enter Your Name' onChange={(e)=> setsubdata(e.target.value)}/>
                                                <button onClick={handelsubdata()}>Submit</button>
                                            </form> */}

                                        </div>
                                    </div>
                                )}
                        </tbody>




                    </table>
                </div>
            </div>

        </div>
    )
}

export default Task6copy