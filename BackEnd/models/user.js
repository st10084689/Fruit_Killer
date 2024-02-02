const mongoose = require('mongoose')

const usershema = mongoose.Schema(
    {
        username: {type: String, required:true},
        password: {type: String, require:true}
    }
)

module.exports = mongoose.model('User',usershema)