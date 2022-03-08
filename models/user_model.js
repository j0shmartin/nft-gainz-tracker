const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'what should we call our new fren?']
    },
    email: {
        type: String,
        required: [true, 'how will we contact our new fren?']
    },
    wallets:[{
        type:mongoose.Types.ObjectId,
        ref:"Wallet",
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;