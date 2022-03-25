const Joi = require('joi');

exports.TextSchemaWithRequired = (min =3,max=30) =>{
    return Joi.string()
    .min(3)
    .max(30)
    .required()
}

exports.TextSchema = (min =3,max=30) =>{
    return Joi.string()
    .min(3)
    .max(30)
}


exports.regexSchema = (regex= '^[a-zA-Z0-9]{3,30}$') =>{
    return Joi.string()
    .pattern(new RegExp(regex))
}


exports.refernceSchema = (refernceSchema = 'password') =>{
    return Joi.ref(refernceSchema)
}

exports.NumberSchema = (max=99999999999) =>{
    return Joi.number()
    .integer()
    .max(max)
}

exports.NumberSchemaWithRequired = (max=99999999999) =>{
    return Joi.number()
    .integer()
    .max(max)
    .required()
}

exports.emailSchema = () =>{
    return Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
}

exports.booleanSchema = () =>{
    return Joi.boolean();
}