import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { updateClothesProduct } from 'api/clothesApi';
import { getAllCategory } from 'api/categoryApi';

const UpdateClothesModal = ({ open, closeModal, clothesProduct }) => {
  const initialFormData = {
    name: '',
    description: '',
    category: clothesProduct ? clothesProduct.category : '',
    status: 'Inactive',
    price: '',
    discount: '',
    stock_quantity: '',
    size: '',
    images: [],
    colors: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [newColor, setNewColor] = useState('');

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

  useEffect(() => {
    if (clothesProduct) {
      setFormData({
        name: clothesProduct.name || '',
        description: clothesProduct.description || '',
        price: clothesProduct.price || '',
        discount: clothesProduct.discount || 0,
        stock_quantity: clothesProduct.stock_quantity || '',
        size: clothesProduct.size || '',
        status: clothesProduct.status || 'Inactive',
        category: clothesProduct.category || '',
        images: [],
        colors: clothesProduct.colors || [],
    });
      setPreviewImages(clothesProduct.images || []);
    }
  }, [clothesProduct]);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...formData.images, ...files];
    setFormData({ ...formData, images: updatedImages });
    const previews = [...previewImages, ...files.map((file) => URL.createObjectURL(file))];
    setPreviewImages(previews);
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    const updatedFormFiles = formData.images.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviews);
    setFormData({ ...formData, images: updatedFormFiles });
  };

  const handleAddColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData({ ...formData, colors: [...formData.colors, newColor] });
      setNewColor('');
    }
  };

  const handleRemoveColor = (color) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((existingColor) => existingColor !== color),
    });
  };

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
    formPayload.append('uploadType', 'Product');

    formData.colors.forEach(color => {
        formPayload.append('colors[]', color);
    });
    formData.images.forEach((file) => {
        formPayload.append('images', file);
      });

    try {
      await updateClothesProduct(clothesProduct._id, formPayload);
      resetFormAndCloseModal();
    } catch (error) {
      console.error('Error updating clothesProduct:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormAndCloseModal = () => {
    setFormData(initialFormData);
    setPreviewImages([]);
    closeModal();
  };

  return (
    <Modal show={open} onHide={resetFormAndCloseModal} aria-labelledby="ModalHeader" centered>
      <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
          <h2>Update clothes Product</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Product Name */}
          <Form.Group controlId="formclothesName" style={{ marginBottom: '15px' }}>
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
          {/* Colors */}
          <Form.Group controlId="formColors" style={{ marginBottom: '15px' }}>
            <Form.Label>Colors:</Form.Label>
            <div style={{ marginBottom: '10px' }}>
                {formData.colors.map((color, index) => (
                <div key={index} style={{ display: 'inline-block', margin: '5px', padding: '5px' }}>
                <Button
                    key={index}
                    variant="secondary"
                    style={{
                    margin: '5px',
                    backgroundColor: color,
                    color: 'white',
                    }}
                    onClick={() => handleRemoveColor(color)}
                >
                    {color}
                </Button>
                <Button
                variant="danger"
                size="sm"
                style={{ marginLeft: '5px', backgroundColor: 'red', borderColor: 'red' }}
                onClick={() => handleRemoveColor(color)}
              >
                X
              </Button>
              </div>
                ))}
            </div>
            {/* Color Picker */}
            <SketchPicker
                color={newColor || '#fff'}
                onChangeComplete={(color) => setNewColor(color.hex)}
                disableAlpha
            />
            <Button variant="primary" onClick={handleAddColor} style={{ marginTop: '10px' }}>
                Add Color
            </Button>
          </Form.Group>
          {/* Status Toggle */}
          <Form.Group controlId="formStatus" style={{ marginBottom: '15px' }}>
            <Form.Label>Status:</Form.Label>
            <Button
              onClick={handleStatusToggle}
              style={{
                width: '100%',
                backgroundColor: formData.status === 'Active' ? 'green' : 'red',
              }}
            >
              {formData.status === 'Active' ? 'Active' : 'Inactive'}
            </Button>
          </Form.Group>
          {/* Image Upload */}
          <Form.Group controlId="formImage" style={{ marginBottom: '15px' }}>
            <Form.Label>Upload Images:</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleImageChange}
              style={{ marginBottom: '10px' }}
            />
            <div>
              {previewImages.map((image, index) => (
                <div key={index} style={{ display: 'inline-block', margin: '5px' }}>
                  <img
                    src={image}
                    alt="Preview"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                    style={{ position: 'absolute', marginTop: '-20px', marginLeft: '-15px' }}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetFormAndCloseModal} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateClothesModal;
