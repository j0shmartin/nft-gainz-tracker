const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'what should we call our new fren?']
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'how will we contact our new fren?']
    },
    wallets:[{
        type:mongoose.Types.ObjectId,
        ref:"Wallet",
    }]
}, {timestamps:true}

);

// userSchema.pre('save',function(next){
//     if(!this.isModified('password'))
//         return next();

//     bcrypt.hash(this.password,10,(error,passwordHash)=>{
//         if(error)
//             return next(error);
//         this.password = passwordHash;
//             next();
//         });
// });

userSchema.methods.comparePassword = function(password,callback){
    bcrypt.compare(password,this.password,(error,isMatch)=>{
        if(error)
            return callback(error);
        else {
            if(!isMatch)
                return callback(null,isMatch)
            return callback(null,this);
        }
    })
}

const User = mongoose.model('User', userSchema);
module.exports = User;