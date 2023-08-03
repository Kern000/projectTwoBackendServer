const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockedNumberSchema = new Schema(
    {   
        blockedNumber:  {   type: String,
                            required: false
                        },
        timeStamp:      {   type: Date,
                            required: false
                        }
    }
)

const WhiteListSchema = new Schema(
    {
        whiteListedNumber:  {   type: String,
                                require: false
                            },
        timeStamp:          {   type: Date,
                                required: false
                            }
    }
)

const EntrySchema = new Schema(
    {
        emailAddress:   {   type: String,
                            required: true,
                            unique: true,
                            lowercase: true,
                            trim: true
                        },
        password:       {   type: String,
                            required: true
                        },
        countryCode:    {   type: [String],
                            required: false,
                        },
        hpNumber:       {   type: Number,
                            required: false
                        },
        officeNumber:   {   type: Number,
                            required: false
                        },
        homeNumber:     {   type: Number,
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

// mongoose will lowercase and pluralize to find the matching collection which is 'projectusers'
// Schema with defined types will provide some degree of validation and sanitization
// mongoose allows custom validate functions thru 'validate' in schema, but not necessary at current
// to add a validator as necessary

