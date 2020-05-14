const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async (req, res)=>{
    const contacts = await loadContactsCollection();
    res.send(await contacts.find({}).toArray());
});

//Add new order
router.post('/edit-contacts', async (req, res) => {
    const contacts = await loadContactsCollection();
    const id = req.body.id;
    contacts.findOneAndUpdate(
        {_id: new mongodb.ObjectID(id)},
        {$set : req.body}
    );
});

// Add product1
router.post('/add-contacts', async (req, res) => {
    const contacts = await loadContactsCollection();
    contacts.insertOne({
        contacts: req.body.contacts
    })
});

async function loadContactsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/', {
            useNewUrlParser: true
        }
    );

    return client.db('plasticod').collection('contacts');
}


module.exports = router;