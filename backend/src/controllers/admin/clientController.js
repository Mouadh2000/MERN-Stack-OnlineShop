const User = require('../../models/user');

class ClientController {

    static async getUserById(req, res) {
        try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    static async getAllUsers(req, res) {
        try {
        const users = await User.find();
        res.json(users);
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    static async disableUser(req, res) {
        try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.disabled = true;
        await user.save();
        res.json({ message: 'User disabled successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
    }

    static async enableUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            user.disabled = false;
            await user.save();
            res.json({ message: 'User enabled successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = ClientController;
