import {ValidationModel} from "../models/validation.model";

export const createValidationAdapter = (error: any):ValidationModel => ({
  field: error.context.label,
  message: error.message
});


export const createValidationsAdapter = (data: any) => (data.map((row:any) => createValidationAdapter(row)));
