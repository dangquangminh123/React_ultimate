import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash';

const ModalUpdateUser = (props) => {

  const {show, setShow, dataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    props.resetUpdateData();
  };
  // const handleShow = () => setShow(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if(!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setUsername(dataUpdate.username);
            setRole("USER");
            setImage("");
            if(dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }
    }, [dataUpdate])

    const handleUploadImage = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0]);
        }else {
            // setPreviewImage("");
        }
    }

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const handSubmitUpdatedUser = async() => {
   
    // Submit data
    let data = await putUpdateUser(dataUpdate.id, username, role, image);
      // console.log(">>> Check your data here:", data)
      if(data && data.EC === 0) {
        toast.success(data.EM);
        handleClose();
        // await props.fetchListUsers();
        // props.setCurrentPage(1);
        await props.fetchListUsersWithPaginate(props.currentPage);
      }

      if(data && data.EC !== 0) {
        toast.error(data.EM)
      }
    }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Update New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
              <label  className="form-label">Email</label>
              <input type="email" className="form-control" disabled={true}
              value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>
            <div className="col-md-6">
              <label  className="form-label">Password</label>
              <input type="password" className="form-control" disabled={true}
              value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className="col-md-6">
              <label  className="form-label">Username</label>
              <input type="text" className="form-control"  placeholder="1234 Main St" 
              value={username} onChange={(event) => setUsername(event.target.value)}/>
            </div>
  
            <div className="col-md-6">
              <label for="inputState" className="form-label">Role</label>
              <select id="inputState" className="form-select" onChange={(event) => setRole(event.target.value)}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className='col-md-12'>
                <label className='form-label label-upload' htmlFor='labelUpload'>
                    <FcPlus/> Upload File Image
                </label>
              <input type="file" id="labelUpload" hidden 
              onChange={(event) =>  handleUploadImage(event)}/>
            </div>

            <div className='col-md-12 img-preview'>
                {previewImage ? <img src={previewImage} /> : 
                    <img src="https://img.freepik.com/premium-vector/quiz-comic-pop-art-style_175838-505.jpg" />
                }
            </div>

        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handSubmitUpdatedUser()}>
           Updated
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;