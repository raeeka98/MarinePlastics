let { checkSchema } = require("express-validator/check");
let replaceWithSingleSpace = (val) => {
    return val.replace(/\s\s+/g, ' ');
}
let removeSpaces = (val) => {
    return val.replace(/\s/g, '');
}
let notContainSpaces = (val) => {
    return !(/\s/g.test(val));
}

let surveyValidationSchema = checkSchema({
    bID: {
        in: "body",

    },
    "survData.user.first": {
        in: "body",
        isString: true,
        isEmpty: {
            negated: true
        },
        isAlpha: true,
        trim: true,
        custom: {
            options: notContainSpaces
        },
        isLength: {
            options: {
                max: 50
            }
        },
    },
    "survData.user.last": {
        in: "body",
        isEmpty: {
            negated: true
        },
        isString: true,
        isAlpha: true,
        trim: true,
        custom: {
            options: notContainSpaces
        },
        isLength: {
            options: {
                max: 50
            }
        }
    },
    "survData.email": {
        in: "body",
        isEmail: true,
        trim: true,
    },
    "survData.org": {
        in: "body",
        isEmpty: {
            negated: true
        },
        isAlphanumeric: true,
        isLength: {
            options: {
                max: 20
            }
        },
        trim: true,
        customSanitizer: {
            options: replaceWithSingleSpace
        }

    },
    "survData.reason": {
        in: "body",
        isEmpty: {
            negated: true
        },
        isAlpha: true,
        isLength: {
            options: {
                max: 10
            }
        },
        trim: true,
        customSanitizer: {
            options: replaceWithSingleSpace
        },

    },
    "survData.survDate": {
        in: "body",
        isInt: {
            options: {
                min: 0
            }
        },
        toInt: true,
        customSanitizer: {
            options: (value, { req, location, path }) => {
                return new Date(value).setUTCHours(0, 0, 0, 0);
            }
        }
    },
    "survData.st": {
        in: "body",
        isAlpha: true,
        trim: true,
        custom: {
            options: notContainSpaces
        }

    },
    "survData.slope": {
        in: "body",
        isIn: {
            options: [
                ["winter,summer"]
            ]
        }
    },
    "survData.aspect": {
        in: "body",
    },
    "survData.lastTide.type": {
        in: "body",
    },
    "survData.lastTide.height": {
        in: "body",
    },
    "survData.lastTide.time": {
        in: "body",
    },
    "survData.nextTide.type": {
        in: "body",
    },
    "survData.nextTide.height": {
        in: "body",
    },
    "survData.nextTide.time": {
        in: "body",
    },
    "survData.wind.dir": {
        in: "body",
        isInt: {
            options: {
                min: 0
            }
        },
        toInt: true,
    },
    "survData.wind.spd": {
        in: "body",
        isInt: {
            options: {
                min: 0
            }
        },
        toInt: true,
    },
    "survData.majorUse": {
        in: "body",
        isIn: {
            options: [
                ['recreation', 'commercial']
            ]
        }
    },
    "survData.NumberOfPeople": {
        in: "body",
        isInt: {
            options: {
                min: 0
            }
        },
        toInt: true,
    },
    "survData.SRSDebris": {
        in: "body",
        isArray: true,
    },
    "survData.ASDebris": {
        in: "body",
        isArray: true,
    }
});

let beachValidationSchema = checkSchema({
    name: {
        in: "body",
        isAlpha: true,
        customSanitizer: {
            options: (val) => {
                return replaceWithSingleSpace(val.toLowerCase());

            }
        }
    },
    lat: {
        in: "body",
        isInt: {
            options: {
                min: -85,
                max: 85
            }
        },
        toInt: true
    },
    lon: {
        isInt: {
            options: {
                min: -180,
                max: 180
            }
        },
        toInt: true
    },
    nroName: {
        in: "body",
        isEmpty: {
            negated: true
        },
        isString: true,
        customSanitizer: {
            options: (val) => {
                return replaceWithSingleSpace(val.toLowerCase());
            }
        }
    },
    nroDist: {
        in: "body",
        isInt: {
            options: {
                min: 0
            }
        },
        toInt: true
    }
})