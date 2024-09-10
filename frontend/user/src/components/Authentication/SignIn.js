import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import auth from '../../assets/img/authentication/authentication.jpeg';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Use AuthContext


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password',
      });
    } finally {
      setLoading(false);
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
          <div className="w-75" style={{ 'margin-top': '-180px' }}>
            <h2 className="text-center mb-4">Sign In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <div className="text-center">
                <p>
                  Don't have an account?{' '}
                  <a href="/sign-up" className="text-primary">
                    Sign up
                  </a>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
