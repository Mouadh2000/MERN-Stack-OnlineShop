import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import AddCategoryModal from './Modals/CategoryModal/AddCategoryModal';
import UpdateCategoryModal from './Modals/CategoryModal/UpdateCategoryModal';
import DeleteConfirmationModal from './Modals/CategoryModal/DeleteCategoryModal';
import { getAllCategory, deleteCategoryById } from 'api/categoryApi';  

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openUpdateModal = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setSelectedCategory(null);
    setIsUpdateModalOpen(false);
  };

  // Delete modal open and close
  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedCategory(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();  
        setCategories(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);  

  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      try {
        await deleteCategoryById(selectedCategory._id);
        setCategories(categories.filter(category => category._id !== selectedCategory._id));  // Update list after deletion
        closeDeleteModal();  // Close the modal
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Categories</h3>
                <div className="text-right" style={{ marginTop: '-30px' }}>
                  <Button
                    style={{ color: 'white', backgroundColor: '#1171ef', borderColor: 'transparent' }}
                    onClick={openModal}
                  >
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Is Anime</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <tr key={category._id}>
                        <th scope="row">{category.name}</th>
                        <td>{category.description}</td>
                        <td>
                          <span
                            style={{
                              backgroundColor: category.status === 'Active' ? 'green' : 'red',
                              color: 'white',
                              padding: '5px 10px',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                            }}
                          >
                            {category.status}
                          </span>
                        </td>
                        <td>{new Date(category.created_at).toLocaleDateString()}</td>
                        <td>{new Date(category.updated_at).toLocaleDateString()}</td>
                        <td>
                          <span
                            style={{
                              backgroundColor: category.anime ? 'green' : 'red',
                              color: 'white',
                              padding: '5px 10px',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                            }}
                          >
                            {category.anime ? 'True' : 'False'}
                          </span>
                        </td>

                        <td>
                          <span
                            onClick={() => openUpdateModal(category)}  // Open update modal with the selected category
                            className="mr-3"
                            style={{ cursor: "pointer", color: "green" }}
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                          <span
                            onClick={() => openDeleteModal(category)}  // Open delete modal with the selected category
                            style={{ cursor: "pointer", color: "red" }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No categories available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>

        <AddCategoryModal open={isModalOpen} closeModal={closeModal} />
        <UpdateCategoryModal open={isUpdateModalOpen} closeModal={closeUpdateModal} category={selectedCategory} />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          toggle={closeDeleteModal}
          onDelete={handleDeleteCategory}
        />
      </Container>
    </>
  );
};

export default Categories;
