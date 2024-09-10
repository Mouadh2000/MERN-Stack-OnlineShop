import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addCategory } from 'api/categoryApi';

const AddCategoryModal = ({ open, closeModal }) => {
  const initialFormData = {
    name: '',
    description: '',
    status: 'Inactive',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleInputChange = e => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? parseInt(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleStatusToggle = () => {
    setFormData({
      ...formData,
      status: formData.status === 'Active' ? 'Inactive' : 'Active',
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true); 

    try {
      const result = await addCategory(formData);
      resetFormAndCloseModal(); 
      
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    closeModal();
  };

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} aria-labelledby="ModalHeader" centered>
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
          <h2>Add Category</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Product Name */}
          <Form.Group controlId="formProductName" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="Category Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group controlId="formDescription" style={{ marginBottom: '15px' }}>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          {/* Status Toggle Button */}
          <Form.Group controlId="formStatus" style={{ marginBottom: '15px' }}>
            <Button
              onClick={handleStatusToggle}
              style={{
                width: '100%',
                backgroundColor: formData.status === 'Active' ? 'green' : 'red',
                color: 'white',
              }}
            >
              {formData.status === 'Active' ? 'Active' : 'Inactive'}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Cancel Button */}
        <Button variant="secondary" onClick={resetFormAndCloseModal}>
          Cancel
        </Button>

        {/* Save Button */}
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSubmitting} // Disable the button during submission
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCategoryModal;
