const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async (req, res) => {
    const buyRetail = await loadBuyRetailCollection();
    res.send(await buyRetail.find({}).toArray());
});

//Add new order
router.post('/edit-buy-retail', async (req, res) => {
    const buyRetail = await loadBuyRetailCollection();
    const id = req.body.id;
    buyRetail.findOneAndUpdate(
        {_id: new mongodb.ObjectID(id)},
        {$set: req.body}
    );
});

// Add product1
router.post('/add-buy-retail', async (req, res) => {
    const buyRetail = await loadBuyRetailCollection();
    buyRetail.insertOne({
        address: req.body.address
    })
});

async function loadBuyRetailCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/', {
            useNewUrlParser: true
        }
    );

    return client.db('plasticod').collection('buy-retail');
}


module.exports = router;