const Disaster = require('../models/DisasterModel');
const { getIO } = require('../socket'); // Import Socket.io instance

const reportDisaster = async (req, res) => {
  try {
    const newDisaster = new Disaster(req.body);
    await newDisaster.save();

    // Emit real-time update to all connected clients
    const io = getIO();
    io.emit('updateDisasters', newDisaster);

    res.status(201).json({ message: 'Disaster reported successfully', data: newDisaster });
  } catch (error) {
    console.error('Error reporting disaster:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find().sort({ createdAt: -1 });
    res.status(200).json(disasters);
  } catch (error) {
    console.error('Error fetching disasters:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteDisaster = async (req, res) => {
  try {
    const { id } = req.params;
    await Disaster.findByIdAndDelete(id);

    // Emit updated data to all clients
    const io = getIO();
    io.emit('disasterDeleted', id);

    res.status(200).json({ message: 'Disaster deleted successfully' });
  } catch (error) {
    console.error('Error deleting disaster:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { reportDisaster, getAllDisasters, deleteDisaster };
