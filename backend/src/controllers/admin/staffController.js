const Admin = require('../../models/admin');

class StaffController {

    async createStaff(req, res) {
        try {
            const { username, last_name, first_name, email, password, is_staff, is_admin } = req.body;

            const newAdmin = new Admin({
                username,
                last_name,
                first_name,
                email,
                password,
                is_staff,
                is_admin
            });

            const savedAdmin = await newAdmin.save();
            res.status(201).json({ message: 'Staff created successfully', staff: savedAdmin });
        } catch (err) {
            res.status(500).json({ message: 'Error creating staff', error: err.message });
        }
    }

    async getStaffById(req, res) {
        try {
            const staff = await Admin.findById(req.params.id);
            if (!staff) {
                return res.status(404).json({ message: 'Staff not found' });
            }
            res.status(200).json(staff);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving staff', error: err.message });
        }
    }

    async getAllStaff(req, res) {
        try {
            const staffList = await Admin.find({});
            res.status(200).json(staffList);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving staff list', error: err.message });
        }
    }

    async updateStaff(req, res) {
        try {
            const { username, last_name, first_name, email, is_staff, is_admin, is_active } = req.body;
            const staff = await Admin.findById(req.params.id);

            if (!staff) {
                return res.status(404).json({ message: 'Staff not found' });
            }

            staff.username = username || staff.username;
            staff.last_name = last_name || staff.last_name;
            staff.first_name = first_name || staff.first_name;
            staff.email = email || staff.email;
            staff.is_staff = is_staff !== undefined ? is_staff : staff.is_staff;
            staff.is_admin = is_admin !== undefined ? is_admin : staff.is_admin;
            staff.is_active = is_active !== undefined ? is_active : staff.is_active;

            const updatedStaff = await staff.save();
            res.status(200).json({ message: 'Staff updated successfully', staff: updatedStaff });
        } catch (err) {
            res.status(500).json({ message: 'Error updating staff', error: err.message });
        }
    }

    async deleteStaff(req, res) {
        try {
            const staff = await Admin.findById(req.params.id);
            if (!staff) {
                return res.status(404).json({ message: 'Staff not found' });
            }

            await Admin.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Staff deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting staff', error: err.message });
        }
    }
}

module.exports = new StaffController();
