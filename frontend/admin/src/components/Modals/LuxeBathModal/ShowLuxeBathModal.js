import React from 'react';
import { Modal, Button } from "reactstrap";

const ShowLuxeBathModal = ({ isOpen, toggleModal, product, images }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} centered size="lg">
      <div className="modal-header">
        <h5 className="modal-title">{product ? product.name : ''}</h5>
        <button className="close" onClick={toggleModal}>
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index + 1}`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
        ))}
      </div>
      <div className="modal-footer">
        <Button color="secondary" onClick={toggleModal}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ShowLuxeBathModal;
