import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';

const ModalViewUser = (props) => {

    const {show, setShow, dataView } = props;

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        props.resetViewData();
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if(!_.isEmpty(dataView)) {
            setEmail(dataView.email);
            setPassword(dataView.password);
            setUsername(dataView.username);
            setRole("USER");
            setImage("");
            if(dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
            }
        }
    }, [props.dataView])

    const handleUploadImage = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0]);
        }else {
            // setPreviewImage("");
        }
    }
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>View New User</Modal.Title>
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
              <input type="text" className="form-control"  placeholder="1234 Main St" disabled={true}
              value={username} onChange={(event) => setUsername(event.target.value)}/>
            </div>
  
            <div className="col-md-6">
              <label for="inputState" className="form-label">Role</label>
              <select id="inputState" className="form-select" onChange={(event) => setRole(event.target.value)} disabled={true}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className='col-md-12'>
                <label className='form-label label-upload' htmlFor='labelUpload' hidden>
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalViewUser;