const joi = require("joi");

const bodySchema = joi.object({
    bID: joi.string().alphanum().required(),

});

const userDataSchema = joi.object({
    f: joi.string().min(1).max(50).trim().required(),
    l: joi.string().min(1).max(50).trim().required()
});

const substraightTypeSchema = joi.object({
    sand: joi.bool(),
    pebble: joi.bool(),
    rip_rap: joi.bool(),
    seaweed: joi.bool(),
    other: joi.string().regex(/^[a-zA-Z\s]*$/g).lowercase()
}).or(["sand", "pebble", "rr", "seaweed", "other"]);

const reasonTypeSchema = joi.object({
    prox: joi.bool(),
    debris: joi.bool(),
    other: joi.string().regex(/^[a-zA-Z\s]*$/g).lowercase()
}).or(["prox", "debirs", "other"]);

const tideDataSchema = joi.object({
    type: joi.string().valid(['low', 'high']).valid().required(),
    time: joi.string().regex(/^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/g).required(),
    height: joi.number().integer().min(0).required()
});

const majorUseSchema = joi.object({
    rec: joi.bool(),
    com: joi.bool(),
    other: joi.string()
}).or(["rec", "com", "other"]);

const windDataSchema = joi.object({
    dir: joi.string().valid(["north", "south", "east", "west", "northeast", "northwest", "southeast", "southwest"]).required(),
    spd: joi.number().min(0).required()
});

const debrisData = joi.array(joi.string().required(), joi.object({
    fresh: joi.number().integer().min(0).required(),
    weathered: joi.number().integer().min(0).required()
}));

const surveyDataSchema = joi.object({
    user: userDataSchema,
    email: joi.string().email().required(),
    org: joi.string().trim().min(1).max(255).alphanum().replace(/\s\s+/g).required(),
    reason:reasonTypeSchema ,
    survDate: joi.date().max('now').greater(1104580800).required(),
    st: substraightTypeSchema,
    slope: joi.string().valid(["winter,summer"]),
    cmpsDir: joi.number().max(360).min(0).required(),
    majorUse: majorUseSchema,
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
});