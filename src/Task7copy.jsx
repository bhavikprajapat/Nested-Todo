import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEdit, FaWindowClose } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbSubtask } from "react-icons/tb";

const Task7copy = () => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [display, setDisplay] = useState(false);
  const [selectID, setSelectID] = useState(null);
  const [editSubIndex, setEditSubIndex] = useState(null);

  // Main Task Form
  const formik = useFormik({
    initialValues: {
      fname: "",
    },

    validationSchema: Yup.object({
      fname: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
        .required("Required"),
    }),

    onSubmit: (values, { resetForm }) => {
      if (editIndex !== null) {
        const temp = [...data];
        temp[editIndex].fname = values.fname;
        setData(temp);
        setEditIndex(null);
      } else {
        setData([
          ...data,
          {
            fname: values.fname,
            subdata: [],
          },
        ]);
      }

      resetForm();
    },
  });

  // Sub Task Form
  const subFormik = useFormik({
    initialValues: {
      sname: "",
    },

    validationSchema: Yup.object({
      sname: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Only letters allowed")
        .required("Required"),
    }),

    onSubmit: (values, { resetForm }) => {
      if (editSubIndex !== null) {
        setData((prev) =>
          prev.map((item, index) => {
            if (index === selectID) {
              return {
                ...item,
                subdata: item.subdata.map((sub, i) =>
                  i === editSubIndex ? values.sname : sub
                ),
              };
            }
            return item;
          })
        );

        setEditSubIndex(null);
      } else {
        setData((prev) =>
          prev.map((item, index) => {
            if (index === selectID) {
              return {
                ...item,
                subdata: [...item.subdata, values.sname],
              };
            }
            return item;
          })
        );
      }

      resetForm();
      setDisplay(false);
    },
  });

  // Edit Task
  const editTask = (item, index) => {
    setEditIndex(index);

    formik.setValues({
      fname: item.fname,
    });
  };

  // Delete Task
  const deleteTask = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  // Open SubTask Modal
  const openSubTask = (index) => {
    setSelectID(index);
    setDisplay(true);

    subFormik.resetForm();
    setEditSubIndex(null);
  };

  // Edit SubTask
  const editSubTask = (subTask, taskIndex, subIndex) => {
    setSelectID(taskIndex);
    setEditSubIndex(subIndex);

    subFormik.setValues({
      sname: subTask,
    });

    setDisplay(true);
  };

  // Delete SubTask
  const deleteSubTask = (taskIndex, subIndex) => {
    setData((prev) =>
      prev.map((item, index) => {
        if (index === taskIndex) {
          return {
            ...item,
            subdata: item.subdata.filter((_, i) => i !== subIndex),
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="container py-5">
      {/* Main Form */}

      <div className="card shadow-lg p-4 border-0 rounded-4">
        <h2 className="text-center mb-4">Task Manager</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <input
                type="text"
                name="fname"
                className="form-control"
                placeholder="Enter Task"
                value={formik.values.fname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.fname && formik.errors.fname && (
                <small className="text-danger">
                  {formik.errors.fname}
                </small>
              )}
            </div>

            <div className="col-md-3">
              <button className="btn btn-primary w-100">
                {editIndex !== null ? "Update Task" : "Add Task"}
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
                          editTask(item, taskIndex)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() =>
                          deleteTask(taskIndex)
                        }
                      >
                        <MdDelete />
                      </button>

                      <button
                        className="btn btn-success btn-sm"
                        onClick={() =>
                          openSubTask(taskIndex)
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
                              editSubTask(
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
                              deleteSubTask(
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
                {editSubIndex !== null
                  ? "Edit Sub Task"
                  : "Add Sub Task"}
              </h4>

              <FaWindowClose
                size={25}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setDisplay(false);
                  setEditSubIndex(null);
                }}
              />
            </div>

            <form onSubmit={subFormik.handleSubmit}>
              <input
                type="text"
                name="sname"
                className="form-control"
                placeholder="Enter Sub Task"
                value={subFormik.values.sname}
                onChange={subFormik.handleChange}
                onBlur={subFormik.handleBlur}
              />

              {subFormik.touched.sname &&
                subFormik.errors.sname && (
                  <small className="text-danger">
                    {subFormik.errors.sname}
                  </small>
                )}

              <button className="btn btn-primary w-100 mt-3">
                {editSubIndex !== null
                  ? "Update Sub Task"
                  : "Add Sub Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task7copy;