import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateCategoryById } from 'api/categoryApi';
const UpdateCategoryModal = ({ open, closeModal, category }) => {
  const initialFormData = {
    name: '',
    description: '',
    status: 'Inactive',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prefill form data when the modal opens and category data is provided
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        status: category.status || 'Inactive',
      });
    }
  }, [category]);

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
      const result = await updateCategoryById(category._id, formData);
      resetFormAndCloseModal();
    } catch (error) {
      console.error('Error updating category:', error);
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
          <h2>Update Category</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Category Name */}
          <Form.Group controlId="formCategoryName" style={{ marginBottom: '15px' }}>
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
        <Button variant="secondary" onClick={resetFormAndCloseModal}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCategoryModal;
