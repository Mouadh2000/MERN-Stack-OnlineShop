import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateLuxeBathProduct } from 'api/luxeBathApi';
import { getAllCategory } from 'api/categoryApi';

const UpdateLuxeBathModal = ({ open, closeModal, luxeBathProduct }) => {
  const initialFormData = {
    name: '',
    description: '',
    category: luxeBathProduct ? luxeBathProduct.category : '',
    status: 'Inactive',
    price: '',
    discount: '',
    stock_quantity: '',
    size: '',
    images: [], // Adding images for file uploads
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // To show image previews

  useEffect(() => {
    // Fetch categories when modal opens
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

  // Prefill form data when the modal opens and luxeBathProduct data is provided
  useEffect(() => {
    if (luxeBathProduct) {
      setFormData({
        name: luxeBathProduct.name || '',
        description: luxeBathProduct.description || '',
        price: luxeBathProduct.price || '',
        discount: luxeBathProduct.discount || 0,
        stock_quantity: luxeBathProduct.stock_quantity || '',
        size: luxeBathProduct.size || '',
        status: luxeBathProduct.status || 'Inactive',
        category: luxeBathProduct.category || '',
        images: [], // Reset images to empty array on new load
      });

      setPreviewImages(luxeBathProduct.images || []); // Assuming luxeBathProduct contains existing images
    }
  }, [luxeBathProduct]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle status toggle button
  const handleStatusToggle = () => {
    setFormData({
      ...formData,
      status: formData.status === 'Active' ? 'Inactive' : 'Active',
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Preview the new images
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Remove a preview image
  const handleRemoveImage = (index) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    const updatedFormFiles = formData.images.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    setFormData({ ...formData, images: updatedFormFiles });
  };

  // Handle form submission
  const handleSave = async () => {
    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('description', formData.description);
    formPayload.append('status', formData.status);
    formPayload.append('category', formData.category);
    formPayload.append('price', formData.price);
    formPayload.append('discount', formData.discount);
    formPayload.append('stock_quantity', formData.stock_quantity);
    formPayload.append('size', formData.size);

    // Append images to FormData
    formData.images.forEach((image) => {
      formPayload.append('images', image);
    });

    try {
      await updateLuxeBathProduct(luxeBathProduct._id, formPayload); // Assuming your API expects FormData
      resetFormAndCloseModal();
    } catch (error) {
      console.error('Error updating luxeBathProduct product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form and close modal
  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    setPreviewImages([]); // Reset image previews
    closeModal();
  };

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} aria-labelledby="ModalHeader" centered>
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
          <h2>Update LuxeBath Product</h2>
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
              onChange={handleImageChange}
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
                  <Button variant="danger" size="sm" onClick={() => handleRemoveImage(index)}>
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
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateLuxeBathModal;
