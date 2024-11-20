import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateAnimeById } from 'api/animeApi';
import { getAllCategory } from 'api/categoryApi';

const UpdateAnimeModal = ({ open, closeModal, anime }) => {
  const initialFormData = {
    name: '',
    description: '',
    category: anime ? anime.category : '',
    status: 'Inactive',
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

  // Prefill form data when the modal opens and anime data is provided
  useEffect(() => {
    if (anime) {
      setFormData({
        name: anime.name || '',
        description: anime.description || '',
        status: anime.status || 'Inactive',
        images: [], // Reset images to empty array on new load
      });

      setPreviewImages(anime.images || []); // Assuming anime contains existing images
    }
  }, [anime]);

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

  // Handle anime toggle button
  const handleAnimeToggle = () => {
    setFormData({
      ...formData,
      anime: !formData.anime,
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
    formPayload.append('anime', formData.anime);
    formPayload.append('category', formData.category); // Ensure category is included


    // Append images to FormData
    formData.images.forEach((image) => {
      formPayload.append('images', image);
    });

    try {
      await updateAnimeById(anime._id, formPayload); // Assuming your API expects FormData
      resetFormAndCloseModal();
    } catch (error) {
      console.error('Error updating anime:', error);
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
          <h2>Update Anime</h2>
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
          <Form.Group controlId="formCategory" style={{ marginBottom: '15px' }}>
            <Form.Label>Category:</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category} // Ensure category is updated
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
          {/* Image Upload */}
          <Form.Group controlId="formImages" style={{ marginBottom: '15px' }}>
            <Form.Label>Upload Images :</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ width: '100%' }}
            />
          </Form.Group>

          {/* Image Previews */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {previewImages.map((image, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={image}
                  alt="Preview"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <Button
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                  }}
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetFormAndCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAnimeModal;
