import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";
import Colors from 'layouts/Colors';
import Header from "components/Headers/Header.js";
import { getAllCategory } from 'api/categoryApi';
import { getAllProduct } from 'api/productApi';
import { deleteClothesProductById } from 'api/clothesApi';
import AddClothesModal from './Modals/ClothesModal/AddClothesModal';
import ShowClothesModal from './Modals/ClothesModal/ShowClothesModal';
import UpdateClothesModal from './Modals/ClothesModal/UpdateClothesModal';
import DeleteConfirmationModal from './Modals/ClothesModal/DeleteClothesModal';

const Clothes = () => {
  const [categories, setCategories] = useState([]);
  const [clothesProducts, setClothesProducts] = useState([]);
  const [filteredClothesProducts, setFilteredClothesProducts] = useState([]);
  const [selectedClothesImages, setSelectedClothesImages] = useState([]);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [selectedClothesProduct, setSelectedClothesProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleImagesModal = () => setShowImagesModal(!showImagesModal);
  const openUpdateModal = (clothesProduct) => {
    setSelectedClothesProduct(clothesProduct);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setSelectedClothesProduct(null);
    setIsUpdateModalOpen(false);
  };
  const openDeleteModal = (clothesProduct) => {
    setSelectedClothesProduct(clothesProduct);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedClothesProduct(null);
    setIsDeleteModalOpen(false);
  };


  useEffect(() => {
    const fetchClothesProducts = async () => {
      const fetchedClothesProducts = await getAllProduct();
      if (fetchedClothesProducts) {
        setClothesProducts(fetchedClothesProducts);
      }
    };
    fetchClothesProducts();
  }, []);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response.data);
  
        // Filter categories for 'Men' and 'Women'
        const menCategory = response.data.find(category => category.name === 'Men');
        const womenCategory = response.data.find(category => category.name === 'Women');
        
        const filteredCategories = [];
        if (menCategory) filteredCategories.push(menCategory._id);
        if (womenCategory) filteredCategories.push(womenCategory._id);
  
        // Filter products that match either 'Men' or 'Women' category _id
        const filteredProducts = clothesProducts.filter(product => 
          filteredCategories.includes(product.category)
        );
        setFilteredClothesProducts(filteredProducts);  // Update filtered products
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, [clothesProducts]);
  

  const handleShowImages = (clothesProduct) => {
    setSelectedClothesProduct(clothesProduct);
    setSelectedClothesImages(clothesProduct.images);
    toggleImagesModal();
  };

  const handleDeleteClothesProduct = async () => {
    if (selectedClothesProduct) {
      try {
        await deleteClothesProductById(selectedClothesProduct._id);
        setClothesProducts(clothesProducts.filter(clothesProduct => clothesProduct._id !== selectedClothesProduct._id));  
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting clothes Product:', error);
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
                <h3 className="text-white mb-0">Clothes</h3>
                <div className="text-right" style={{ marginTop: '-30px' }}>
                  <Button
                    style={{ color: 'white', backgroundColor: '#1171ef', borderColor: 'transparent' }}
                    onClick={openModal}
                  >
                    Add Clothes
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Clothes Model</th>
                    <th scope="col">Description</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Stock quantity</th>
                    <th scope="col">Size</th>
                    <th scope="col">Images</th>
                    <th scope="col">Colors</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClothesProducts.length > 0 ? (
                    filteredClothesProducts.map((product, index) => {
                      const matchedCategory = categories.find(
                        (category) => category._id === product.category
                      );

                      return (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{matchedCategory ? matchedCategory.name : "N/A"}</td>
                          <td>{product.price} DT</td>
                          <td>{product.discount || "0"}%</td>
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
                          <td>
                          <Colors colors={product.colors || []} />
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
                          </td>
                          <td>
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
                        No Clothes Products Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <AddClothesModal open={isModalOpen} closeModal={closeModal} />
        <UpdateClothesModal open={isUpdateModalOpen} closeModal={closeUpdateModal} clothesProduct={selectedClothesProduct} />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          toggle={closeDeleteModal}
          onDelete={handleDeleteClothesProduct}
        />
        <ShowClothesModal
          isOpen={showImagesModal}
          toggleModal={toggleImagesModal}
          product={selectedClothesProduct}
          images={selectedClothesImages}
        />

      </Container>
    </>
  );
};

export default Clothes;
