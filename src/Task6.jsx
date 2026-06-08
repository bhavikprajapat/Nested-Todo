import React, { useEffect, useState } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup';
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { TbSubtask } from 'react-icons/tb';


const Task6 = () => {

    const [data, setdata] = useState([])
    const [editindex, seteditindex] = useState(null)
    const [display, setdisplay] = useState(false)
    const [subdata, setsubdata] = useState([])

    useEffect(() => {
        localStorage.setItem("savedata", JSON.stringify(data))
    }, [data])

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("savedata"));
        if (stored) {
            setdata(stored);
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            fname: " ",
            sname: "",
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
            }
            resetForm();
        },
    })

    const Edit = (item, i) => {
        seteditindex(i)
        setValues(item)
    }
    const Delete = (i) => {
        setdata(data.filter((index) => (
            index !== i
        )))
        console.log(i)

    }

    function addtask() {
        setdisplay(true)
    }


    const { handleSubmit, handleBlur, handleChange, values, setValues, resetForm } = formik
    const { fname } = values
    return (
        <div>
            <div className='d-flex justify-content-center'>
                {/* for input ui  */}
                <div className='outer_box d-flex'>
                    <h1 style={{ color: "white", fontSize: "40px" }} className='px-5 py-3'>Enter Today Task Here....</h1>
                    <form onSubmit={handleSubmit}>
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
                            <div>{formik.errors.fname}</div>
                        ) : null}
                        <div> </div>

                        <button
                            type="submit"
                            className="btn w-100 mt-4 fw-semibold text-white"
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
                    </form>

                </div>
            </div>


            <div className="mt-5">
                <div className="table-responsive shadow-lg rounded-4 overflow-hidden scrolled">
                    <table className="table mb-0">
                        <thead style={{ background: "#111827", color: "white" }}>
                            <tr>
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

                                data.map((item, i) => (
                                    <tr key={i} style={{ verticalAlign: "middle" }}>
                                        <td>{i + 1}</td>
                                        <td>{item.fname}</td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => Edit(item, i)}
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
                                                onClick={addtask}
                                            >
                                                <TbSubtask style={{ fontSize: "30px" }} />
                                            </button>

                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>

                        {
                            display === false ? (
                                <tr></tr>
                            ) : (
                                <div className='d-flex justify-content-center'>
                                    {/* for SubTask Ui  */}
                                    <div className='outer_box1 d-flex p-1 '>
                                        <h1 style={{ color: "Black", fontSize: "40px" }} className='px-5 py-3'>Enter Today Task Here....</h1>
                                        <form onSubmit={handleSubmit} >
                                            <label htmlFor="sname"></label>
                                            <input
                                                id='sname'
                                                name='sname'
                                                type="text"
                                                className='inputset2'
                                                onBlur={handleBlur}
                                                onSubmit={handleSubmit}
                                                // value={sname}
                                                onChange={handleChange}
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
                                                {editindex !== null ? "Update User" : "Add User"}
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
                                                    onClick={() => setdisplay(false)}
                                                >
                                                    <FaWindowClose />
                                                </button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            )}


                    </table>
                </div>
            </div>

        </div>

    )
}

export default Task6