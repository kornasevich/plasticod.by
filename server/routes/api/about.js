const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async (req, res)=>{
    const about = await loadAboutCollection();
    res.send(await about.find({}).toArray());
});

//Add new order
router.post('/edit-about', async (req, res) => {
    const about = await loadAboutCollection();
    const id = req.body.id;
    about.findOneAndUpdate(
        {_id: new mongodb.ObjectID(id)},
        {$set : req.body}
    );
});

// Add product
router.post('/add-about', async (req, res) => {
    const about = await loadAboutCollection();
    about.insertOne({
        about: req.body.about
    })
});

async function loadAboutCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/', {
            useNewUrlParser: true
        }
    );

    return client.db('plasticod').collection('about');
}


module.exports = router;