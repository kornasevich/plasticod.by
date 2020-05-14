const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        nameCompany: {
            type: String,
        },
        legalAddress: {
            type: String,
        },
        postAddress: {
            type: String,
        },
        postcode: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        unp: {
            type: String,
        },
        whoIssued: {
            type: String,
        },
        paymentAccount: {
            type: String,
        },
        nameBank: {
            type: String,
        },
        codeBank: {
            type: String,
        },
        addressBank: {
            type: String,
        },
        fullName: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        country: {
            type: String,
        },
        region: {
            type: String,
        },
        city: {
            type: String,
        },
        street: {
            type: String,
        },
        home: {
            type: String,
        },
        body: {
            type: String,
        },
        apartment: {
            type: String,
        },
        comment: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        orders: {
            type: Array
        }
    },
    {
        timestamps: true
    }
);

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('User', schema);