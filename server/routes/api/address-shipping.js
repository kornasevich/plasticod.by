const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async (req, res)=>{
    const addressShipping = await loadAddressShippingCollection();
    res.send(await addressShipping.find({}).toArray());
});

//Add new order
router.post('/edit-address-shipping', async (req, res) => {
    const addressShipping = await loadAddressShippingCollection();
    const id = req.body.id;
    addressShipping.findOneAndUpdate(
        {_id: new mongodb.ObjectID(id)},
        {$set : req.body}
    );
});

// Add product1
router.post('/add-address-shipping', async (req, res) => {
    const addressShipping = await loadAddressShippingCollection();
    addressShipping.insertOne({
        images: req.body.images,
        address: req.body.address
    })
});

async function loadAddressShippingCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/', {
            useNewUrlParser: true
        }
    );

    return client.db('plasticod').collection('address-shipping');
}


module.exports = router;