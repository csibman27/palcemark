import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const StationSpec = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  unleaded_price: Joi.number().allow("").optional(),
  diesel_price: Joi.number().allow("").optional(),
};

export const PlacemarkSpec = {
  title: Joi.string().required(),
};
