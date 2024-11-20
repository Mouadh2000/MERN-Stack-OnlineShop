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

const Clothes = () => {
  const [categories, setCategories] = useState([]);
  
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
                    onClick={{}}
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
                    <th scope="col">Images</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Stock quantity</th>
                    <th scope="col">Size</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                     <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <span
                            onClick={{}} 
                            className="mr-3"
                            style={{ cursor: "pointer", color: "green" }}
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                          <span
                            onClick={{}}  
                            style={{ cursor: "pointer", color: "red" }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Clothes;
