const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        emailAddress:   {   type: String,
                            unique: [true, 'Email already in use'],
                            lowercase: true,
                            trim: true,
                            required: true,
                            validate: {
                                validator: function(v) {
                                return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+$/.test(v);
                                },
                                message: props => `${props.value} is not a valid email address!`
                            },
                            required: [true, 'User Email Address required']
                        }
    }
);

module.exports = mongoose.model("User", UserSchema);