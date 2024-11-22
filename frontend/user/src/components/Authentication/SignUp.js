import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import auth from '../../assets/img/authentication/authentication.jpg';
import { signup } from '../Api/userApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData);
      Swal.fire({
        title: 'Success!',
        text: 'Registered successfully! Check your mail to verify your account.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        gender: ''
      });
      navigate("/sign-in");
    } catch (err) {
      let errorMessages = ['An error occurred during registration.'];

      if (err.response && err.response.data) {
        if (Array.isArray(err.response.data.errors)) {
          errorMessages = err.response.data.errors;
        } else if (typeof err.response.data.errors === 'object') {
          errorMessages = Object.values(err.response.data.errors);
        } else if (typeof err.response.data.message === 'string') {
          errorMessages = [err.response.data.message];
        }
      }

      Swal.fire({
        title: 'Error!',
        text: errorMessages.join(', '),
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: '#f1f1f1' }}>
      <Row className="w-100">
        {/* Left Side - Image */}
        <Col md={6} className="d-none d-md-block p-0">
          <div
            style={{
              backgroundImage: `url(${auth})`,
              height: '100vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              marginTop: '55px',
              marginBottom: '55px',
              borderRadius: '20px'
            }}
          ></div>
        </Col>

        {/* Right Side - Form */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Card className="w-75 shadow-lg p-4" style={{ borderRadius: '15px', backgroundColor: '#e9ecef' }}>
            <h2 className="text-center mb-4" style={{ color: "#007bff" }}>Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formLast" className="mb-3">
                <Form.Label>Last name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your last name" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formFirst" className="mb-3">
                <Form.Label>First name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your first name" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Phone number</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your phone number" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter your password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formGender" className="mb-3">
                <Form.Label>Gender</Form.Label>
                <div className="d-flex">
                  <Form.Check 
                    type="radio" 
                    id="genderMale" 
                    label="Male" 
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    className="me-3"
                    style={{ paddingRight: '5px' }}
                  />
                  <Form.Check 
                    type="radio" 
                    id="genderFemale" 
                    label="Female" 
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    className="me-3"
                  />
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Sign Up
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
