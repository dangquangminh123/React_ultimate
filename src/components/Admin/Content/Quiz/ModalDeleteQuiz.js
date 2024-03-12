import React from 'react'
import { deleteQuiz } from '../../../../services/apiService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDeleteQuiz } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuiz(dataDeleteQuiz.id);
    // console.log(">>> Check your data here:", data)
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM)
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this use. email =
          <b>{dataDeleteQuiz && dataDeleteQuiz.name ? dataDeleteQuiz.name : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => { handleSubmitDeleteQuiz() }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalDeleteQuiz