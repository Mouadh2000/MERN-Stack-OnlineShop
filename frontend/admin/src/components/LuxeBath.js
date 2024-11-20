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
import { getAllCategory } from 'api/categoryApi';
import { getAllLuxeBathProduct, deleteLuxeBathProductById } from 'api/luxeBathApi';
import AddLuxeBathModal from './Modals/LuxeBathModal/AddLuxeBathModal';
import ShowLuxeBathModal from './Modals/LuxeBathModal/ShowLuxeBathModal';
import UpdateLuxeBathModal from './Modals/LuxeBathModal/UpdateLuxeBathModal';
import DeleteConfirmationModal from './Modals/LuxeBathModal/DeleteLuxeBathModal';

const LuxeBath = () => {
  const [categories, setCategories] = useState([]);
  const [luxeBathProducts, setLuxeBathProducts] = useState([]);
  const [selectedLuxeBathProductsImages, setSelectedLuxeBathProductsImages] = useState([]);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [selectedLuxeBathProduct, setSelectedLuxeBathProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleImagesModal = () => setShowImagesModal(!showImagesModal);
  const openUpdateModal = (luxeBathProduct) => {
    setSelectedLuxeBathProduct(luxeBathProduct);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setSelectedLuxeBathProduct(null);
    setIsUpdateModalOpen(false);
  };
  const openDeleteModal = (luxeBathProduct) => {
    setSelectedLuxeBathProduct(luxeBathProduct);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedLuxeBathProduct(null);
    setIsDeleteModalOpen(false);
  };

  // Fetch all Luxe Bath Products
  useEffect(() => {
    const fetchLuxeBathProducts = async () => {
      const fetchedLuxeBathProducts = await getAllLuxeBathProduct();
      if (fetchedLuxeBathProducts) {
        setLuxeBathProducts(fetchedLuxeBathProducts);
      }
    };
    fetchLuxeBathProducts();
  }, []);
  
  // Fetch all categories
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

  const handleShowImages = (luxeBathProduct) => {
    setSelectedLuxeBathProduct(luxeBathProduct);
    setSelectedLuxeBathProductsImages(luxeBathProduct.images);
    toggleImagesModal();
  };

  const handleDeleteLuxeBathProduct = async () => {
    if (selectedLuxeBathProduct) {
      try {
        await deleteLuxeBathProductById(selectedLuxeBathProduct._id);
        setLuxeBathProducts(luxeBathProducts.filter(luxeBathProduct => luxeBathProduct._id !== selectedLuxeBathProduct._id));  
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting Luxe Bath Product:', error);
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
                <h3 className="text-white mb-0">LuxeBath</h3>
                <div className="text-right" style={{ marginTop: '-30px' }}>
                  <Button
                    style={{ color: 'white', backgroundColor: '#1171ef', borderColor: 'transparent' }}
                    onClick={openModal}
                  >
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Stock quantity</th>
                    <th scope="col">Size</th>
                    <th scope="col">Images</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {luxeBathProducts.length > 0 ? (
                    luxeBathProducts.map((product, index) => {
                      const matchedCategory = categories.find(
                        (category) => category._id === product.category
                      );

                      return (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{matchedCategory ? matchedCategory.name : "N/A"}</td>
                          <td>{product.price} DT</td>
                          <td>{product.discount || "0%"}</td>
                          <td>{product.stock_quantity}</td>
                          <td>{product.size}</td>
                          <td>
                          {product.images.length > 0 && (
                            <>
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                style={{ width: '40px', height: 'auto' }}
                              />
                              <Button
                                onClick={() => handleShowImages(product)}
                                style={{ marginLeft: '5px', marginTop: '5px', padding: '5px 10px', fontSize: '9px' }}
                              >
                                Show All
                              </Button>
                            </>
                          )}
                        </td>
                          <td>{product.rating || "N/A"}</td>
                          <td>
                            <span
                              style={{
                                backgroundColor: product.status === 'Active' ? 'green' : 'red',
                                color: 'white',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                fontWeight: 'bold',
                              }}
                            >
                              {product.status}
                            </span>
                          </td>                          <td>
                            <span
                              onClick={() => openUpdateModal(product)}
                              className="mr-3"
                              style={{ cursor: "pointer", color: "green" }}
                            >
                              <i className="fas fa-edit"></i>
                            </span>
                            <span
                              onClick={() => openDeleteModal(product)}
                              style={{ cursor: "pointer", color: "red" }}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No Luxe Bath Products Found
                      </td>
                    </tr>
                  )}
                </tbody>

              </Table>
            </Card>
          </div>
        </Row>
        <AddLuxeBathModal open={isModalOpen} closeModal={closeModal} />
        <ShowLuxeBathModal
          isOpen={showImagesModal}
          toggleModal={toggleImagesModal}
          product={selectedLuxeBathProduct}
          images={selectedLuxeBathProductsImages}
        />
        <UpdateLuxeBathModal open={isUpdateModalOpen} closeModal={closeUpdateModal} luxeBathProduct={selectedLuxeBathProduct} />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          toggle={closeDeleteModal}
          onDelete={handleDeleteLuxeBathProduct}
        />

      </Container>
    </>
  );
};

export default LuxeBath;
