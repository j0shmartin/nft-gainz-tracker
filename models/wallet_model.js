const { default: mongoose } = require("mongoose");

const walletSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: [false]
    },
    address: {
        type: String,
        required: [true, 'come on...drop the addy']
    },
    
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;