import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Badge,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import AddStaffModal from "./Modals/StaffModal/AddStaffModal";
import UpdateStaffModal from "./Modals/StaffModal/UpdateStaffModal";
import DeleteConfirmationModal from './Modals/StaffModal/DeleteStaffModal';
import { getAllStaff, deleteStaffById } from 'api/staffApi';

const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [staffs, setStaffs] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openUpdateModal = (staff) => {
    setSelectedStaff(staff);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedStaff(null);
    setIsUpdateModalOpen(false);
  };

  const openDeleteModal = (staff) => {
    setSelectedStaff(staff);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedStaff(null);
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const response = await getAllStaff();
        if (Array.isArray(response)) {
          setStaffs(response);
        } else {
          console.error("Unexpected data format:", response);
        }
      } catch (error) {
        console.error("Error fetching staffs:", error);
      }
    };

    fetchStaffs();
  }, []);

  const handleDeleteStaff = async () => {
    if (selectedStaff) {
      try {
        await deleteStaffById(selectedStaff._id);
        setStaffs(staffs.filter(staff => staff._id !== selectedStaff._id));
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting staff:', error);
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
                <h3 className="text-white mb-0">Staff Users</h3>
                <div className="text-right" style={{ marginTop: '-30px' }}>
                  <Button style={{ color: 'white', backgroundColor: '#1171ef', borderColor: 'transparent' }} onClick={openModal}>Add Staff user</Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Is Active</th>
                    <th scope="col">Is Staff</th>
                    <th scope="col">Is Admin</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {staffs.length > 0 ? (
                    staffs.map((staff) => (
                      <tr key={staff._id}>
                        <th scope="row">{staff.username}</th>
                        <td>{staff.last_name}</td>
                        <td>{staff.first_name}</td>
                        <td>{staff.email}</td>
                        
                        <td>
                          <Badge
                            style={{
                              backgroundColor: staff.is_active ? "green" : "red",
                              color: "white",
                            }}
                            className="text-uppercase"
                          >
                            {staff.is_active ? "Activate" : "Inactive"}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            style={{
                              backgroundColor: staff.is_staff ? "#c30db5" : "orange",
                              color: "white",
                            }}
                            className="text-uppercase"
                          >
                            {staff.is_staff ? "Staff" : "Regular user"}
                          </Badge>
                        </td>
                        <td>
                          <Badge
                            style={{
                              backgroundColor: staff.is_admin ? "blue" : "orange",
                              color: "white",
                            }}
                            className="text-uppercase"
                          >
                            {staff.is_admin ? "admin" : "Staff"}
                          </Badge>
                        </td>
                        <td>
                          <span
                            onClick={() => openUpdateModal(staff)}
                            className="mr-3"
                            style={{ cursor: "pointer", color: "green" }}
                          >
                            <i className="fas fa-edit"></i>
                          </span>
                          <span
                            onClick={() => openDeleteModal(staff)} 
                            style={{ cursor: "pointer", color: "red" }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No staff users found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>

      <AddStaffModal open={isModalOpen} closeModal={closeModal} />
      <UpdateStaffModal open={isUpdateModalOpen} closeModal={closeUpdateModal} staffData={selectedStaff} />
      <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          toggle={closeDeleteModal}
          onDelete={handleDeleteStaff}
        />
      </>
  );
};

export default Staff;
