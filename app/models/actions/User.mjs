const User = require('../model/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(204).json({ 'message': 'No users found' });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'message': 'An error occurred' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req?.body?.id;
  if (!userId) {
    return res.status(400).json({ "message": 'User ID required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(204).json({ 'message': `User ID ${userId} not found` });
    }
    await user.destroy();
    res.json({ 'message': 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'message': 'An error occurred' });
  }
};

const getUser = async (req, res) => {
  const userId = req?.params?.id;
  if (!userId) {
    return res.status(400).json({ "message": 'User ID required' });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(204).json({ 'message': `User ID ${userId} not found` });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 'message': 'An error occurred' });
  }
};

export {
  getAllUsers,
  deleteUser,
  getUser
};
