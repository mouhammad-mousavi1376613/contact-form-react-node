const Contact = require('../models/contact');

exports.submitContact = async (req, res)=>{
    try {
        const {name, email, message} = req.body;
        if(!name || !email || !message) return res.status(400).jeson({error: "please fill all fields"});

        const newMessage = new Contact({name, email, message});
        await newMessage.save();

        res.status(201).json({success: true, message: "successfuly saved message"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "server inline error"});;
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({createAt: -1});
        res.status(200).json(messages);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "error to get messages"});
    }
}