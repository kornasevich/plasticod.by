const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Get user
router.post('/', async (req, res) => {
    const users = await loadUserCollection();
    const {email, password} = req.body;
    users.findOne({
        email
    }).then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
            res.status(200).send({
                nameCompany: user.nameCompany,
                legalAddress: user.legalAddress,
                postAddress: user.postAddress,
                postcode: user.postcode,
                email: user.email,
                unp: user.unp,
                whoIssued: user.whoIssued,
                paymentAccount: user.paymentAccount,
                nameBank: user.nameBank,
                codeBank: user.codeBank,
                addressBank: user.addressBank,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                country: user.country,
                region: user.region,
                city: user.city,
                street: user.street,
                home: user.home,
                body: user.body,
                apartment: user.apartment,
                comment: user.comment,
                id: user._id,
                token: user.token
            })
        } else {
            res.status(401).send({
                status: 'UNAUTORIZED',
                code: 401
            });
        }
    }).catch(() => {
        res.status(401).send();
    })
});// Get user
router.post('/login', async (req, res) => {
    const users = await loadUserCollection();
    const token = req.body.token;
    users.findOne({
        token
    }).then((user) => {
            res.status(200).send({
                nameCompany: user.nameCompany,
                legalAddress: user.legalAddress,
                postAddress: user.postAddress,
                postcode: user.postcode,
                email: user.email,
                unp: user.unp,
                whoIssued: user.whoIssued,
                paymentAccount: user.paymentAccount,
                nameBank: user.nameBank,
                codeBank: user.codeBank,
                addressBank: user.addressBank,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                country: user.country,
                region: user.region,
                city: user.city,
                street: user.street,
                home: user.home,
                body: user.body,
                apartment: user.apartment,
                comment: user.comment,
                id: user._id
            })
        }
    ).catch(() => {
        res.status(401).send();
    })
});

//Add new order
router.post('/add-order', async (req, res) => {
    const users = await loadUserCollection();
    const token = req.body.token;
    const order = req.body.order;
    let orders = [];
    users.findOne({
        token
    }).then((user) => {
            orders = [...user.orders];
            orders.push({...order, id: new mongodb.ObjectID(), createdAt: new Date()});
        }
    ).then(() => {
        users.findOneAndUpdate(
            {token: req.body.token},
            {$set: {orders: orders}},
        )
    }).catch(() => {
        res.status(401).send();
    });
});

// Add product
router.post('/register', async (req, res) => {
    const users = await loadUserCollection();
    const password = req.body.user.password;
    users.findOne({
        email: req.body.user.email
    }).then((user) => {
        if (!user) {
            bcrypt.hash(password, null, null, (error, hash) => {
                const token = jwt.sign(
                    {userId: req.body.user.email},
                    password,
                    {expiresIn: '24h'});
                users.insertOne({
                    ...req.body.user,
                    password: hash,
                    token,
                    createdAt: new Date()
                }).then((user) => {
                    res.status(201).send();
                }).catch((error) => {
                    console.log(error)
                })
            });
        } else {
            res.status(401).send();
        }
    })
});

// Delete product
router.delete("/:id", async (req, res) => {
    const posts = await loadUserCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// Change product
router.put("/:token", async (req, res) => {
    const users = await loadUserCollection();
    await users.findOneAndUpdate(
        {token: req.params.token},
        {$set: req.body}
    );
    res.status(200).send();
});


// Change product
router.post("/get-orders", async (req, res) => {
    const users = await loadUserCollection();
    users.findOne({
        token: req.body.token
    }).then((user) => {
        res.status(200).send({
            orders: user.orders
        })
    });
});


router.post("/update-orders", async (req, res) => {
    const users = await loadUserCollection();
    const userList = [...req.body.users];
    userList.forEach((user) => {
        users.updateMany(
            {_id: new mongodb.ObjectID(user._id)},
            {$set: {orders: user.orders}}
        ).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    });
});

// Change product
router.get("/get-all-users", async (req, res) => {
    const users = await loadUserCollection();
    users.find({}).toArray(function (err, results) {
        res.status(200).send({
            users: results
        })
    });
});

async function loadUserCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://localhost:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    return client.db('plasticod').collection('users');
}


module.exports = router;
