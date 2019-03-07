let joi = require("joi");

joi = joi.extend(joi => ({
    base: joi.date(),
    name: "date",
    rules: [{
        name: "sanitize",
        validate (params, value, state, options) {
            return value.setUTCHours(0, 0, 0, 0);
        }
    }]
}));

joi = joi.extend(joi => ({
    base: joi.string(),
    name: "string",
    language: {
        alpha: "Invalid syntax for input"
    },
    rules: [{
        name: "alpha",
        params: {
            allowSpace: joi.bool(),
        },
        validate (params, value, state, options) {

            if (params.allowSpace) {
                let s = value.replace(/\s\s+/, " ");
                if (/^[a-zA-Z\s]*$/.test(s)) {
                    return s;
                }
                return this.createError('number.alpha', { v: value, allowSpace: params.allowSpace }, state, options);
            }
            if (/^[a-zA-Z]*$/g.test(s)) {
                return value;
            }
            return this.createError('number.alpha', { v: value, allowSpace: params.allowSpace }, state, options);
        }
    }]
}));

const userDataSchema = joi.object({
    f: joi.string().min(1).max(30).trim().required(),
    l: joi.string().min(1).max(30).trim().required()
});

const substraightTypeSchema = joi.object({
    sand: joi.bool(),
    pebble: joi.bool(),
    rip_rap: joi.bool(),
    seaweed: joi.bool(),
    other: joi.string().alpha(true).lowercase()
}).or(["sand", "pebble", "rr", "seaweed", "other"]);

const reasonTypeSchema = joi.object({
    prox: joi.bool(),
    debris: joi.bool(),
    other: joi.string().alpha(true).lowercase()
}).or(["prox", "debirs", "other"]).error(new Error("Please select one option"));

const tideDataSchema = joi.object({
    type: joi.string().valid(['low', 'high']).valid().required(),
    time: joi.string().regex(/^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/).required(),
    height: joi.number().integer().min(0).required()
});

const majorUseSchema = joi.object({
    rec: joi.bool(),
    com: joi.bool(),
    other: joi.string().alpha(true).lowercase()
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
    org: joi.string().trim().min(1).max(255).alphanum().replace(/\s\s+/, " ").required().error(new Error("Error in organization name")),
    reason: reasonTypeSchema.required(),
    survDate: joi.date().max('now').greater(1104580800).sanitize().required(),
    st: substraightTypeSchema.required(),
    slope: joi.string().valid(["winter", "summer"]).required(),
    cmpsDir: joi.number().max(360).min(0).required(),
    lastTide: tideDataSchema.required(),
    nextTide: tideDataSchema.required(),
    wind: windDataSchema.required(),
    majorUse: majorUseSchema.required(),
    numOfP: joi.number().min(0).required(),
    SRSDebris: joi.array().items(debrisData).max(17).required(),
    ASDebris: joi.array().items(debrisData).max(17).required()
});

const beachDataSchema = joi.object({
    n: joi.string().trim().alphanum().replace(/\s\s+/, " ").max(40).required(),
    lat: joi.number().min(-85).max(85).required(),
    lon: joi.number().min(-180).max(180).required(),
    nroName: joi.string().min(0).max(255).required(),
    nroDist: joi.number().min(0).required()
});

const bodySchema = joi.object({
    bID: joi.string().alphanum().required(),
    survData: surveyDataSchema
});

module.exports = {
    beachValidate: beachDataSchema.validate,
    bodyValidate: bodySchema.validate
}

let dataTest = {
    bID: "5c74f1bc71992a56a570d485",
    survData: {
        user: {
            f: "<p>Tes<p>",
            l: "ter"
        },
        email: "asd@gmail.com",
        org: "yo",
        reason: {
            prox: true,
            other: "ye"
        },
        survDate: Date.now(),
        st: {
            sand: true,
            rip_rap: true
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
            rec: undefined,
            com: undefined,
            other: undefined
        },
        numOfP: "6",
        SRSDebris: [
            ["plastic", { fresh: "4", weathered: "9" }]
        ],
        ASDebris: [
            ["miscPlastic", { fresh: "2", weathered: "5" }]
        ]
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

fun1();