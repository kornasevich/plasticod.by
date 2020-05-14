const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async (req, res)=>{
    const exampleUsing = await loadExampleUsingCollection();
    res.send(await exampleUsing.find({}).toArray());
});

//Add new order
router.post('/edit-example-using', async (req, res) => {
    const exampleUsing = await loadExampleUsingCollection();
    const id = req.body.id;
    exampleUsing.findOneAndUpdate(
        {_id: new mongodb.ObjectID(id)},
        {$set : req.body}
    );
});

// Add product1
router.post('/add-example-using', async (req, res) => {
    const exampleUsing = await loadExampleUsingCollection();
    exampleUsing.insertOne({
        images: req.body.images
    })
});

async function loadExampleUsingCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/', {
            useNewUrlParser: true
        }
    );

    return client.db('plasticod').collection('example-using');
}


module.exports = router;