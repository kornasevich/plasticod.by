const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async (req, res)=>{
    const general = await loadGeneralCollection();
    res.send(await general.find({}).toArray());
});

//Add new order
router.post('/edit-general', async (req, res) => {
    const general = await loadGeneralCollection();
    const id = req.body.id;
    general.findOneAndUpdate(
        {_id: new mongodb.ObjectID(id)},
        {$set : req.body}
    );
});

// Add product
router.post('/number-order', async (req, res) => {
    const general = await loadGeneralCollection();
    general.insertOne({
        numberOrder: '0231',
        images: [],
        numberPhone: '(+375) 29 103-15-86',
        socials: []
    })
});

async function loadGeneralCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/', {
            useNewUrlParser: true
        }
    );

    return client.db('plasticod').collection('general');
}


module.exports = router;