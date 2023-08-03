const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockedNumberSchema = new Schema(
    {   
        blockedNumber:  {   type: String,
                            required: true,
                        },
        timeStamp:      {   type: Date,
                            required: true
                        }
    }
)

const WhiteListSchema = new Schema(
    {
        whiteListedNumber:  {   type: String,
                                require: false,
                            },
        timeStamp:          {   type: Date,
                                required: false
                            }
    }
)

const EntrySchema = new Schema(
    {
        emailAddress:   {   type: String,
                            unique: true,
                            lowercase: true,
                            trim: true,
                            required: true,
                            validate: {
                                validator: function(v) {
                                  return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+$/.test(v);
                                },
                                message: props => `${props.value} is not a valid email address!`
                            },
                            required: [true, 'User phone number required']
                        },
        password:       {   type: String,
                            required: true
                        },
        countryCode:    {   type: [String],
                            required: false,
                        },
        hpNumber:       {   type: String,
                            required: false,
                        },
        officeNumber:   {   type: String,
                            required: false
                        },
        homeNumber:     {   type: String,
                            required: false
                        },
        blockedNumbers: {   type: [BlockedNumberSchema],
                            required: false
                        },
        whiteList:      {   type: [WhiteListSchema],
                            required: false
                        }
    }
);


module.exports = mongoose.model("projectuser", EntrySchema)

// mongoose will lowercase and pluralize to find the matching collection which is 'projectusers', define the DB in MONGO_URL
// Schema with defined types will provide some degree of validation and sanitization

