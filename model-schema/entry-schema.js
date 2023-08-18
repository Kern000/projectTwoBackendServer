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
);

const WhiteListSchema = new Schema(
    {
        whiteListedNumber:  {   type: String,
                                require: false,
                            },
        timeStamp:          {   type: Date,
                                required: false
                            }
    }
);

const CountryCodeSchema = new Schema(
    {
        code:               {   type: String,
                                require: false,
                            },
        timeStamp:          {   type: Date,
                                required: false
                            }
    }
);

const EntrySchema = new Schema(
    {   
        user:            {
                            type: Schema.Types.ObjectId,
                            ref: "User",
                            required: true
                        },
        countryCode:    {   type: [CountryCodeSchema],
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

module.exports = mongoose.model("Entry", EntrySchema);