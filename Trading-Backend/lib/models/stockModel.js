const mongoose = require('mongoose');
const constants = require('../constants');

const Schema = new mongoose.Schema({
    
})

const StockTemplate = mongoose.model(process.env.STOCK_COLLECTION, Schema);
module.exports = StockTemplate;