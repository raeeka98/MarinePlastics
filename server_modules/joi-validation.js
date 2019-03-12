let joi = require("joi");



const userDataSchema = joi.object({
    f: joi.string().regex(/^[a-zA-Z]*$/).min(1).max(30).trim().required(),
    l: joi.string().regex(/^[a-zA-Z]*$/).min(1).max(30).trim().required()
});

const substraightTypeSchema = joi.object({
    s: joi.bool(),
    p: joi.bool(),
    rr: joi.bool(),
    sea: joi.bool(),
    other: joi.string().trim().regex(/^[a-zA-Z\s]*$/).replace(/\s\s+/, " ").lowercase()
}).or(["s", "p", "rr", "sea", "other"]);

const reasonTypeSchema = joi.object({
    prox: joi.bool(),
    debris: joi.bool(),
    other: joi.string().trim().regex(/^[a-zA-Z\s]*$/).replace(/\s\s+/, " ").lowercase()
}).or(["prox", "debris", "other"]).error(new Error("Please select one option"));

const tideDataSchema = joi.object({
    type: joi.string().valid(['low', 'high']).valid().required(),
    time: joi.string().regex(/^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/).required(),
    height: joi.number().integer().min(0).required()
});

const majorUseSchema = joi.object({
    rec: joi.bool(),
    com: joi.bool(),
    other: joi.string().trim().regex(/^[a-zA-Z\s]*$/).replace(/\s\s+/, " ").lowercase()
}).or(["rec", "com", "other"]);

const windDataSchema = joi.object({
    dir: joi.string().valid(["n", "s", "e", "w", "ne", "nw", "se", "sw"]).required(),
    spd: joi.number().min(0).required()
});

const debrisData = joi.array().items(
    joi.string().required(),
    joi.object().keys({
        fresh: joi.number().integer().min(0).required(),
        weathered: joi.number().integer().min(0).required()
    }).required()
);

const surveyDataSchema = joi.object({
    user: userDataSchema.required(),
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    userID: joi.string().trim().min(3).alphanum().required(),
    org: joi.string().trim().min(1).max(60).replace(/\s\s+/, " ").required().error(new Error("Error in organization name")),
    reason: reasonTypeSchema.required(),
    survDate: joi.date().max('now').greater(1104580800).required(),
    st: substraightTypeSchema.required(),
    slope: joi.string().valid(["winter", "summer"]).required(),
    cmpsDir: joi.number().max(360).min(0).required(),
    lastTide: tideDataSchema.required(),
    nextTide: tideDataSchema.required(),
    wind: windDataSchema.required(),
    majorUse: majorUseSchema.required(),
    numOfP: joi.number().min(0).required(),
    SRSDebris: joi.array().items(debrisData).max(17).optional(),
    ASDebris: joi.array().items(debrisData).max(17).optional()
});

const beachDataSchema = joi.object({
    n: joi.string().trim().regex(/^[a-zA-Z\s]*$/).replace(/\s\s+/, " ").max(40).required(),
    lat: joi.number().min(-85).max(85).required(),
    lon: joi.number().min(-180).max(180).required(),
    nroName: joi.string().trim().regex(/^[a-zA-Z\s]*$/).replace(/\s\s+/, " ").max(40).required(),
    nroDist: joi.number().min(0).required()
});

const bodySchema = joi.object({
    bID: joi.string().alphanum().required(),
    survData: surveyDataSchema.required()
});

module.exports = {
    beachValidation: beachDataSchema,
    surveyValidation: bodySchema
}

let dataTest = {
    bID: "5c74f1bc71992a56a570d485",
    survData: {
        user: {
            f: "pTesp",
            l: "ter"
        },
        userID: "5c631395fafc067adaa77d55",
        email: "asd@gmail.com",
        org: "yo",
        reason: {
            prox: true,
            other: "ye"
        },
        survDate: Date.now(),
        st: {
            s: true,
            rr: true
        },
        slope: "winter",
        cmpsDir: "100",
        lastTide: {
            type: "low",
            time: "03:33",
            height: "5"
        },
        nextTide: {
            type: "low",
            time: "03:33",
            height: "5"
        },
        wind: {
            dir: "n",
            spd: 6
        },
        majorUse: {
            rec: "true",
            com: undefined,
            other: undefined
        },
        numOfP: "6",
        SRSDebris: {
            plastic: { fresh: "4", weathered: "9" }
        },
        ASDebris: {
            miscPlastic: { fresh: "2", weathered: "5" }
        }
    }
}

async function fun1 () {
    try {
        let res = await bodySchema.validate(dataTest);
        console.log(res);

    } catch (err) {
        console.log(err.details[0].message);

        console.log(err.details[0].path);
        console.log(err.details[0].type);
        console.log(err.details[0].context);
    }
}