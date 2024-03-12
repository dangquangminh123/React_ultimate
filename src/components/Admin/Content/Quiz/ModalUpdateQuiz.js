import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { FcPlus } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import { putUpdateQuiz } from '../../../../services/apiService';
import _ from 'lodash';

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdateQuiz } = props;
  // const [planetData, setPlanetData] = useState([]);

  const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
  ];
  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setImage("");
    setType("");
    props.resetUpdateDataQuiz();
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!_.isEmpty(dataUpdateQuiz)) {
      setName(dataUpdateQuiz.name);
      setDescription(dataUpdateQuiz.description);
      setImage("");
      if (dataUpdateQuiz?.difficulty)
        setType({ label: dataUpdateQuiz?.difficulty ?? "", value: dataUpdateQuiz?.difficulty ?? "" })
      if (dataUpdateQuiz.image) {
        setImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
      }
    }
  }, [dataUpdateQuiz])

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    } else {
      // setPreviewImage("");
    }
  }

  // const handleChange = (event) => {
  //   let new_type = event.value;
  //   setType(new_type);
  //   return;
  // }

  const handSubmitUpdatedQuiz = async () => {
    if (!name) {
      toast.error('Invalid name')
      return;
  }

  if (!description) {
      toast.error('Invalid description')
      return;
  }
    // Submit data
    let data = await putUpdateQuiz(dataUpdateQuiz.id, name, description, type.value, image);
    console.log(">>> Check quiz data here:", data)
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await props.fetchQuiz();
      handleClose();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  console.log(">>>> check dataUpdateQuiz", type)
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Update quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input type="text" className="form-control"
                value={name} onChange={(event) => setName(event.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input type="text" className="form-control"
                value={description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div className='my-3'>
              <Select
                defaultValue={{ label: dataUpdateQuiz?.difficulty ?? "", value: dataUpdateQuiz?.difficulty ?? "" }}
                onChange={setType}
                options={options}
                placeholder={"Quiz type..."}
              />
            </div>

            <div className='col-md-12'>
              <label className='form-label label-upload' htmlFor='labelUpload'>
                <FcPlus /> Upload File Image
              </label>
              <input type="file" id="labelUpload" hidden
                onChange={(event) => handleUploadImage(event)} />
            </div>

            <div className='col-md-12 img-preview'>
              {image ? <img src={image} /> :
                <img src="https://img.freepik.com/premium-vector/quiz-comic-pop-art-style_175838-505.jpg" />
              }
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handSubmitUpdatedQuiz()}>
            Updated
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ModalUpdateQuiz