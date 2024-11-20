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
import AddAnimeModal from './Modals/AnimeModal/AddAnimeModal';
import ShowAnimeModal from './Modals/AnimeModal/ShowAnimeModal';
import UpdateAnimeModal from './Modals/AnimeModal/UpdateAnimeModal';
import DeleteConfirmationModal from './Modals/AnimeModal/DeleteAnimeModal';
import { getAllAnimes, deleteAnimeById } from 'api/animeApi';
import { getAllCategory } from 'api/categoryApi';

const Animes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedAnimeImages, setSelectedAnimeImages] = useState([]);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleImagesModal = () => setShowImagesModal(!showImagesModal);

  const openDeleteModal = (anime) => {
    setSelectedAnime(anime);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedAnime(null);
    setIsDeleteModalOpen(false);
  };
  const openUpdateModal = (anime) => {
    setSelectedAnime(anime);
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setSelectedAnime(null);
    setIsUpdateModalOpen(false);
  };

  // Fetch all animes
  useEffect(() => {
    const fetchAnimes = async () => {
      const fetchedAnimes = await getAllAnimes();
      if (fetchedAnimes) {
        setAnimes(fetchedAnimes);
      }
    };
    fetchAnimes();
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

  const handleShowImages = (anime) => {
    setSelectedAnime(anime);
    setSelectedAnimeImages(anime.images); // Assuming `images` is an array in the anime object
    toggleImagesModal();
  };

  const handleDeleteAnime = async () => {
    if (selectedAnime) {
      try {
        await deleteAnimeById(selectedAnime._id);
        setAnimes(animes.filter(anime => anime._id !== selectedAnime._id));  
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting anime:', error);
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
                <h3 className="text-white mb-0">Animes</h3>
                <div className="text-right" style={{ marginTop: '-30px' }}>
                  <Button
                    style={{ color: 'white', backgroundColor: '#1171ef', borderColor: 'transparent' }}
                    onClick={openModal}
                  >
                    Add Anime
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Anime Character Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Anime Category</th>
                    <th scope="col">Images</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {animes.map((anime) => {
                    // Find the category that matches anime.category
                    const matchedCategory = categories.find(category => category._id === anime.category);
                    return (
                      <tr key={anime._id}>
                        <th scope="row">{anime.name}</th>
                        <td>{anime.description}</td>
                        <td>{matchedCategory ? matchedCategory.name : 'N/A'}</td> {/* Display category name */}
                        <td>
                          {anime.images.length > 0 && (
                            <>
                              <img
                                src={anime.images[0]} // Display the first image
                                alt={anime.name}
                                style={{ width: '40px', height: 'auto' }}
                              />
                              <Button
                                onClick={() => handleShowImages(anime)}
                                style={{ marginLeft: '5px', marginTop: '5px', padding: '5px 10px', fontSize: '9px' }}
                              >
                                Show All
                              </Button>
                            </>
                          )}
                        </td>
                        <td>
                          <span
                            style={{
                              backgroundColor: anime.status === 'Active' ? 'green' : 'red',
                              color: 'white',
                              padding: '5px 10px',
                              borderRadius: '5px',
                              fontWeight: 'bold',
                            }}
                          >
                            {anime.status}
                          </span>
                        </td>
                        <td>
                          <span
                            onClick={() => openUpdateModal(anime)}  // Open update modal with the selected anime
                            className="mr-3"
                            style={{ cursor: "pointer", color: "green" }}
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                          <span
                            onClick={() => openDeleteModal(anime)}  // Open delete modal with the selected anime
                            style={{ cursor: "pointer", color: "red" }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <AddAnimeModal open={isModalOpen} closeModal={closeModal} />
        <ShowAnimeModal
          isOpen={showImagesModal}
          toggleModal={toggleImagesModal}
          anime={selectedAnime}
          images={selectedAnimeImages}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          toggle={closeDeleteModal}
          onDelete={handleDeleteAnime}
        />
        <UpdateAnimeModal open={isUpdateModalOpen} closeModal={closeUpdateModal} anime={selectedAnime} />

      </Container>
    </>
  );
};

export default Animes;
