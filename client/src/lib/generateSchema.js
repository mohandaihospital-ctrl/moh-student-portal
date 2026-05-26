import { z } from "zod";

export const generateSchema = (
  fields
) => {

  const schemaFields = {};

  fields.forEach((field) => {

    let validator =
      z.string();

    // REQUIRED

    if (
      field.validation
        ?.required
    ) {

      validator =
        validator.min(
          1,
          `${field.label} is required`
        );
    }

    // MIN LENGTH

    if (
      field.validation
        ?.minLength
    ) {

      validator =
        validator.min(
          field.validation
            .minLength,

          `${field.label} must be at least ${field.validation.minLength} characters`
        );
    }

    // EMAIL

    if (
      field.type ===
      "email"
    ) {

      validator =
        validator.email(
          "Invalid email address"
        );
    }

    schemaFields[
      field.name
    ] = validator;
  });

  return z.object(
    schemaFields
  );
};