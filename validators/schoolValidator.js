import Joi from "joi";

export const schoolSchema = Joi.object({
  name: Joi.string().min(2).max(200).required(),
  address: Joi.string().min(2).max(400).required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});
export const listSchoolsSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
});
