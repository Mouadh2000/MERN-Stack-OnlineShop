import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addStaff } from 'api/staffApi'; // assuming this API function is defined

const AddStaffModal = ({ open, closeModal }) => {
  const initialFormData = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_staff: false,
    is_admin: false
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    closeModal();
  };

  const handleSave = async () => {
    try {
      await addStaff(formData); 
      resetFormAndCloseModal(); 
    } catch (err) {
      console.error('Error adding staff:', err);
    }
  };

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} aria-labelledby="ModalHeader" centered>
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
          <h2>Add Staff</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUsername" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          <Form.Group controlId="formLastName" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          <Form.Group controlId="formFirstName" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="First name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          <Form.Group controlId="formIsStaff" style={{ marginBottom: '15px' }}>
            <Form.Check
              type="checkbox"
              label="Is Staff User"
              name="is_staff"
              checked={formData.is_staff}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formIsAdmin" style={{ marginBottom: '15px' }}>
            <Form.Check
              type="checkbox"
              label="Is Admin User"
              name="is_admin"
              checked={formData.is_admin}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetFormAndCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddStaffModal;
