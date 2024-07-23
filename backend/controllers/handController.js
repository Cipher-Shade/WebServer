import HandRecognition from '../models/hand.js';

const createHandData = async (req, res) => {
    try {
        const newHandData = new HandRecognition({
            handDetected: req.body.handDetected,
        });

        const savedData = await newHandData.save();
        res.status(201).json(savedData);
    } catch (error) {
        console.error('Error creating hand recognition data:', error);
        res.status(400).json({ message: 'Failed to save handRecognition data. Please check your input.' });
    }
};

const getLatestHandData = async (req, res) => {
    try {
        // Assuming your model has a 'timestamp' field to sort by
        const latestHandData = await HandRecognition.findOne().sort({timestamp: -1});
        if (latestHandData) {
            res.status(200).json(latestHandData);
        } else {
            res.status(404).json({ message: 'No hand recognition data found.' });
        }
    } catch (error) {
        console.error('Error fetching latest hand recognition data:', error);
        res.status(500).json({ message: 'Failed to fetch latest handRecognition data.' });
    }
};

export { createHandData, getLatestHandData };