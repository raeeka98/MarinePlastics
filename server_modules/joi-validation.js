const joi = require("joi");

const bodySchema = joi.object({
    bID: joi.string().alphanum().required(),

});

const userDataSchema = joi.object({
    f: joi.string().min(1).max(50).trim().emp.required(),
    l: joi.string().min(1).max(50).trim().required()
});

const substraightTypeSchema = joi.object({

});

const reasonTypeSchema = joi.object({

})

const tideDataSchema = joi.object({

})

const majorUseSchema = joi.object({

})

const windDataSchema = joi.object({
    dir: joi.string().valid(["north", "south", "east", "west", "northeast", "northwest", "southeast", "southwest"]),
    spd: joi.number().min(0).required()
});

const debrisData = joi.array(joi.string().valid([]).required(), joi.number().required());

const surveyDataSchema = joi.object({
    user: userDataSchema,
    email: joi.string().email().required(),
    org: joi.string().trim().min(1).max(255).alphanum().replace(/\s\s+/g).required(),
    reason: ,
    survDate: joi.date().max('now').greater(1104580800).required(),
    st: ,
    slope: joi.string().valid(["winter,summer"]),
    cmpsDir: joi.number().max(360).min(0).required(),
    majorUse: ,
    NumOfP: joi.number().min(0).required(),
    SRSDebris: joi.array().items(joi.array(debrisData)).length(17),
    ASDebris: joi.array().items(joi.array(debrisData)).length(17)
});

const beachDataSchema = joi.object({
    n: joi.string().trim().required(),
    lat: joi.number().min(-85).max(85).required(),
    lon: joi.number().min(-180).max(180).required(),
    nroName: joi.string().min(0).max(255).required(),
    nroDist: joi.number().min(0).required()
})