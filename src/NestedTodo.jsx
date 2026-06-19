import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { FaWindowClose } from 'react-icons/fa';
import * as Yup from 'yup';

const NestedTodo = () => {
    const [data, setdata] = useState([])
    const [editindex, seteditindex] = useState(null)
    const [editsubindex, seteditsubindex] = useState(null)
    const [display, setdisplay] = useState(false)
    const [selectID, setSelectID] = useState(null);
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-ž\s\-'\.]+$/, 'Please enter a valid name')
                .required('Name is required'),
        }),
        onSubmit: (values, { resetForm }) => {

            if (editindex !== null) {
                let temp = [...data]
                temp[editindex] = values
                setdata(temp)
                seteditindex(null)
            }
            else {
                setdata([...data, { values, subdata: [] }])
            }

            resetForm();
        }

    })

    const formiksub = useFormik({
        initialValues: {
            subname: ""
        },
        validationSchema: Yup.object({
            subname: Yup.string()
                .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-ž\s\-'\.]+$/, 'Please enter a valid name')
                .required('Name is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            if (editsubindex !== null) {
                setdata((prev) =>
                    prev.map((item, index) => {
                        console.log(item)
                        if (index === selectID) {
                            return {
                                ...item,
                                subdata: item.subdata.map((it, id) => {
                                    return id === editsubindex ? values.subname : it
                                })
                            };
                        }
                        return item;
                    }

                    )
                )
            }
            else {
                let newData = data.map((item, index) => {
                    let subData = item.setdata || []

                    if (index === selectID) {
                        return { ...item, subdata: [...subData, values.subname] }
                    }
                    else {
                        return item;
                    }

                })
                setdata(newData)

                resetForm();
            }

        }
    });



    const deletetask = (id) => {
        setdata(data.filter((_, index) => (
            index !== id
        )))

    }
    const Edit = (item, id) => {
        console.log(item)
        seteditindex(id)
        setValues(item)

    }
    const { handleSubmit, handleBlur, handleChange, setValues } = formik
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Enter Your Today Task here</label>
                    <input type="text"
                        id='name'
                        name='name'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={formik.values.name}
                    />
                    {
                        formik.touched.name && formik.errors.name ? (
                            <div style={{ color: "black" }}>{formik.errors.name}</div>
                        ) : null
                    }
                    <div>
                        <button type='submit'>{
                            editindex === null ? "add" : "Update"
                        }</button>
                    </div>
                </form>
            </div>
            <div>
                {
                    data.map((item, index) => {

                        return (
                            <div key={index} className='d-flex'>
                                <div>
                                    <div>
                                        <h3>{item.values.name}</h3>
                                    </div>
                                    <div>
                                        <button className='px-2 mx-2' onClick={() => deletetask(index)}>Delete</button>
                                        <button className='px-2 mx-2' onClick={() => Edit(item, index)}>Edit</button>
                                        <button className='px-2 mx-2' onClick={() => setdisplay(true)} >Subtask</button>
                                    </div>
                                </div>
                                {
                                    item.subdata.length === 0 ? (

                                        <h6>No Data Found</h6>
                                    ) :
                                        (
                                            item.subdata.map((item, index) => {

                                                return (
                                                    <h6>{item}</h6>
                                                )
                                            })
                                        )
                                }

                            </div>




                        )
                    })
                }
                {
                    display && (
                        <div>
                            <div className='d-flex justify-content-center '>
                                <div className='card w-25 p-5' style={{ background: "#51b7d6ff" }}>
                                    <div className='d-flex justify-content-end'>
                                        <FaWindowClose

                                            size={25}
                                            style={{ cursor: "pointer", color: "black" }}
                                            onClick={() => {
                                                setdisplay(false);

                                            }}
                                        />
                                    </div>

                                    <h3>Enter Your Sub Task....</h3>
                                    <form onSubmit={formiksub.handleSubmit}>
                                        <label htmlFor="subname"></label>
                                        <input type="text"
                                            id='subname'
                                            name='subname'
                                            value={formiksub.values.subname}
                                            onBlur={formiksub.handleBlur}
                                            onChange={formiksub.handleChange}
                                        />
                                        {
                                            formiksub.touched.subname && formiksub.errors.subname ? (
                                                <div style={{ color: "black" }}>{formiksub.errors.subname}</div>
                                            ) : null
                                        }
                                        <button type='submit' className="mt-3">
                                            {editsubindex !== null
                                                ? "Update Sub Task"
                                                : "Add Sub Task"}
                                        </button>
                                    </form>




                                </div>
                            </div>
                        </div>
                    )
                }



            </div>


        </div>

    )
}

export default NestedTodo