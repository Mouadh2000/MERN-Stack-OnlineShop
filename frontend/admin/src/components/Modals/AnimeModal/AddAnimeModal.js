import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { getAllCategory } from 'api/categoryApi';
import { addAnime } from 'api/animeApi';

const AddAnimeModal = ({ open, closeModal }) => {
  const initialFormData = {
    name: '',
    description: '',
    category: '',
    status: 'Inactive',
    images: []
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
    formDataToSubmit.append('uploadType', 'anime');

    // Append each image file to the FormData
    formData.images.forEach((file) => {
      formDataToSubmit.append('images', file);
    });

    try {
      await addAnime(formDataToSubmit);
      resetFormAndCloseModal();
    } catch (error) {
      // Handle error (you can add an alert or any error message here)
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
          <h2>Add Anime</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Anime Name */}
          <Form.Group controlId="formAnimeName" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              placeholder="Anime Name"
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
              {categories.filter(category => category.anime).map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Status Toggle Button */}
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
            {/* Preview Images */}
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

export default AddAnimeModal;
