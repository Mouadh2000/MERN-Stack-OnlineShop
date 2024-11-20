import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addCategory } from 'api/categoryApi';

const AddCategoryModal = ({ open, closeModal }) => {
  const initialFormData = {
    name: '',
    description: '',
    status: 'Inactive',
    anime: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusToggle = () => {
    setFormData({
      ...formData,
      status: formData.status === 'Active' ? 'Inactive' : 'Active',
    });
  };

  const handleAnimeToggle = () => {
    setFormData({
      ...formData,
      anime: !formData.anime,
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      await addCategory(formData);
      resetFormAndCloseModal();
    } catch (error) {
      // Handle error (you can add an alert or any error message here)
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
          <Form.Label>Status :</Form.Label>
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

          {/* Anime Toggle Button */}
          <Form.Group controlId="formAnime" style={{ marginBottom: '15px' }}>
          <Form.Label>Is Anime :</Form.Label>

            <Button
              onClick={handleAnimeToggle}
              style={{
                width: '100%',
                backgroundColor: formData.anime ? 'green' : 'red',
                color: 'white',
              }}
            >
              {formData.anime ? 'True' : 'False'}
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
