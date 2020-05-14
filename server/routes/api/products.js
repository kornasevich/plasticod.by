const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get product
router.get('/', async (req, res)=>{
    const posts = await loadProductsCollection();
    res.send(await posts.find({}).toArray());
});

// Add product
router.post('/', async (req, res)=>{
    const posts = await loadProductsCollection();
    await posts.insertOne({
        ...req.body.product,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete product
router.delete("/:id", async (req, res)=>{
    const posts = await loadProductsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// Change product
router.put("/:id", async (req, res)=>{
    const posts = await loadProductsCollection();
    await posts.findOneAndUpdate(
        {_id: new mongodb.ObjectID(req.params.id)},
        {$set : req.body}
        );
    res.status(200).send();
});


async function loadProductsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/', {
            useNewUrlParser: true
        }
    );

    return client.db('plasticod').collection('products');
}


module.exports = router;


