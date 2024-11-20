import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { getAllCategory } from 'api/categoryApi';
import { addLuxeBathProduct } from 'api/luxeBathApi';

const AddLuxeBathModal = ({ open, closeModal }) => {
  const initialFormData = {
    name: '',
    description: '',
    category: '',
    status: 'Inactive',
    price: '',
    discount: '',
    stock_quantity: '',
    size: '',
    images: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));

    setFormData(prevData => ({
      ...prevData,
      images: [...prevData.images, ...files], // Concatenate new files with existing
    }));
    setPreviewImages(prevPreviews => [
      ...prevPreviews,
      ...newImages, // Concatenate new previews with existing
    ]);
  };

  const handleStatusToggle = () => {
    setFormData({
      ...formData,
      status: formData.status === 'Active' ? 'Inactive' : 'Active',
    });
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('description', formData.description);
    formDataToSubmit.append('status', formData.status);
    formDataToSubmit.append('category', formData.category);
    formDataToSubmit.append('price', formData.price);
    formDataToSubmit.append('discount', formData.discount);
    formDataToSubmit.append('stock_quantity', formData.stock_quantity);
    formDataToSubmit.append('size', formData.size);
    formDataToSubmit.append('uploadType', 'Product');

    formData.images.forEach((file) => {
      formDataToSubmit.append('images', file);
    });

    try {
      await addLuxeBathProduct(formDataToSubmit);
      resetFormAndCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    const newPreviews = [...previewImages];

    // Remove the image from both the form data and the preview images
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData({ ...formData, images: newImages });
    setPreviewImages(newPreviews);
  };

  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    setPreviewImages([]); // Clear image previews
    closeModal();
  };

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} aria-labelledby="ModalHeader" centered>
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
          <h2>Add LuxeBath Product</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Product Name */}
          <Form.Group controlId="formLuxeBathName" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="Product Name"
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

          {/* Category Selection */}
          <Form.Group controlId="formCategory" style={{ marginBottom: '15px' }}>
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Price */}
          <Form.Group controlId="formPrice" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          {/* Discount */}
          <Form.Group controlId="formDiscount" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="number"
              placeholder="Discount (%)"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              style={{ width: '100%' }}
              min={0}
              max={100}
            />
          </Form.Group>

          {/* Stock Quantity */}
          <Form.Group controlId="formStockQuantity" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="number"
              placeholder="Stock Quantity"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          {/* Size */}
          <Form.Group controlId="formSize" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="Size"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          {/* Status Toggle */}
          <Form.Group controlId="formStatus" style={{ marginBottom: '15px' }}>
            <Form.Label>Status:</Form.Label>
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

          {/* Image Upload */}
          <Form.Group controlId="formImages" style={{ marginBottom: '15px' }}>
            <Form.Label>Upload Images:</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ width: '100%' }}
            />
            <div className="mt-3">
              {previewImages.map((imgSrc, index) => (
                <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                  <img
                    src={imgSrc}
                    alt={`Preview ${index}`}
                    style={{ width: '100px', height: 'auto' }}
                  />
                  <Button variant="danger" size="sm" onClick={() => removeImage(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
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
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddLuxeBathModal;
