import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { Api } from "../../../../../backend";

const AdminUserUpdate = ({ modalShow, onHide, user }) => {
  // for user edit modal
  const [modalContainerClass, setModalContainerClass] = useState(
    "event-modal-container"
  );
  const [modalClass, setModalClass] = useState("event-modal");

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    id: user._id,
  });

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  //console.log("User Data -------> ", user);

  const updateUser = async (id) => {
    //console.log("Update User ======> ", id, formData);
    const authToken = localStorage.getItem("token");
    const { data } = await axios.post(
      `${Api}updateuser/${id}`,
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: `${formData.role}`,
      },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    //console.log(data);
    if (data.success) {
      window.location.reload();
    }
  };
  useEffect(() => {
    if (modalShow) {
      setModalContainerClass("event-modal-container show");
      setModalClass("event-modal modal-show");
      document.body.classList.add("modal-showed");
    } else {
      setModalContainerClass("event-modal-container");
      setModalClass("event-modal");
      document.body.classList.remove("modal-showed");
    }
  }, [modalShow]);

  return (
    <div className={`${modalContainerClass} admin-modal-container`}>
      {modalShow && (
        <div className={modalClass}>
          {
            //console.log("Modal Data: ", user)
          }
          <div className="modal-admin-header">
            <h3>Update User Details</h3>
            <FaTimes onClick={onHide} fontSize="1.25rem" fill="#d62828" />
          </div>
          <div className="input-wrapper">
            <label>
              First Name:
              <br />
              <input
                type="text"
                id="firstName"
                placeholder="Enter First Name ..."
                className="modal-inp"
                value={formData.firstName}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="input-wrapper">
            <label>
              Last Name:
              <br />
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name ..."
                className="modal-inp"
                value={formData.lastName}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="input-wrapper">
            <label>
              Email:
              <br />
              <input
                type="email"
                id="email"
                placeholder="Enter Email ..."
                className="modal-inp"
                value={formData.email}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="input-wrapper">
            <label>
              Role:
              <br />
              <input
                id="role"
                type="number"
                placeholder="Enter User Role ..."
                className="modal-inp"
                value={formData.role}
                onChange={onChange}
              />
            </label>
          </div>
          <button className="btn" onClick={() => updateUser(formData.id)}>
            Update User
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUserUpdate;
