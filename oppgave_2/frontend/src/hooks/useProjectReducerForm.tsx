// import { useEffect, useReducer, type FormEvent } from "react"

// type FieldState = {
//   value: string
//   isValid: boolean
//   isDirty: boolean
//   isTouched: boolean
// }

// const FormAction = {
//   UPDATE_FIELD: "UPDATE_FIELD",
//   SET_TOUCHED: "SET_TOUCHED",
//   RESET_FORM: "RESET_FORM",
// } as const

// type FormAction = typeof FormAction

// type UseFormProps<T> = {
//   initialFields: T
//   onSubmit: (data: T) => void
//   validate: {
//     [K in keyof T]?: (field: K, value: string) => boolean
//   }
// }

// type Fields<T> = Record<keyof T, FieldState>

// type FormState<T extends Record<string, string>> = Fields<T>;

// type FormActions<T extends Record<string, string>> =
//   | {
//       type: FormAction["UPDATE_FIELD"]
//       field: keyof T
//       value: string
//       isValid: boolean
//     }
//   | { type: FormAction["SET_TOUCHED"]; field: keyof T }
//   | { type: FormAction["RESET_FORM"]; fields?: Fields<T> }

// function formReducer<T extends Record<string, string>>(
//   state: FormState<T>,
//   action: FormActions<T>
// ): FormState<T> {
//   switch (action.type) {
//     case FormAction.UPDATE_FIELD:
//       return {
//         ...state,
//         [action.field]: {
//           ...state[action.field],
//           value: action.value,
//           isValid: action.isValid,
//           isDirty: true,
//         },
//       }
//     case FormAction.SET_TOUCHED:
//       return {
//         ...state,
//         [action.field]: {
//           ...state[action.field],
//           isTouched: true,
//         },
//       }
//     case FormAction.RESET_FORM:
//       console.log(action.fields)
//       if (action.fields) return action.fields

//       return Object.fromEntries(
//         Object.keys(state.fields).map((key) => [
//           key,
//           {
//             value: "",
//             isValid: false,
//             isDirty: false,
//             isTouched: false,
//           },
//         ])
//       ) as Fields<T>
//     default:
//       return state
//   }
// }

// export function useProjectReducerForm<T extends Record<string, string>>({
//   initialFields,
//   onSubmit,
//   validate,
// }: UseFormProps<T>) {
//   const initialState = Object.fromEntries(
//     Object.keys(initialFields).map((key) => {
//       return [
//         key as keyof T,
//         {
//           value: initialFields[key as keyof T],
//           isValid: false,
//           isDirty: false,
//           isTouched: false,
//         } as FieldState,
//       ]
//     })
//   ) as Fields<T>

//   const [state, dispatch] = useReducer(formReducer<T>, initialState)

//   const updateField = (field: keyof T, value: string) => {
//     const isValid = validate[field] ? validate[field](field, value) : true
//     dispatch({ type: FormAction.UPDATE_FIELD, field, value, isValid })
//   }

//   const setFieldTouched = (field: keyof T) => {
//     dispatch({ type: FormAction.SET_TOUCHED, field })
//   }

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault()
//     const isFormValid = Object.values(state).every((field) => field.isValid)
//     if (!isFormValid) return

//     // Henter ut alle verdiene fra feltene
//     const formData = Object.fromEntries(
//       Object.keys(state).map((key) => [key, state[key as keyof T].value])
//     ) as T

//     onSubmit(formData)
//     dispatch({ type: FormAction.RESET_FORM })
//   }

//   const getFieldProps = (field: keyof T) => {
//     return {
//       value: state[field].value,
//       onChange: (event: FormEvent<HTMLInputElement>) => {
//         const input = event.target as HTMLInputElement
//         updateField(field, input.value)
//       },
//       onBlur: () => setFieldTouched(field),
//     }
//   }

//   const isFieldInvalid = (field: keyof T) =>
//     !state[field].isValid && state[field].isDirty

//   return {
//     fields: state,
//     handleSubmit,
//     getFieldProps,
//     isFieldInvalid,
//   }
// }

// export default useProjectReducerForm

import { useEffect, useReducer, type FormEvent } from "react";

// Define the structure of a field's state
type FieldState = {
  value: string;
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
};

// Define action types for form state updates
const FormAction = {
  UPDATE_FIELD: "UPDATE_FIELD",
  SET_TOUCHED: "SET_TOUCHED",
  RESET_FORM: "RESET_FORM",
} as const;

type FormAction = typeof FormAction;

type UseFormProps<T> = {
  initialFields: T;
  onSubmit: (data: T) => void;
  validate: {
    [K in keyof T]?: (field: K, value: string) => boolean;
  };
};

// Define types for form fields and form state
type Fields<T> = Record<keyof T, FieldState>;
type FormState<T extends Record<string, string>> = Fields<T>;

type FormActions<T extends Record<string, string>> =
  | {
      type: FormAction["UPDATE_FIELD"];
      field: keyof T;
      value: string;
      isValid: boolean;
    }
  | { type: FormAction["SET_TOUCHED"]; field: keyof T }
  | { type: FormAction["RESET_FORM"]; fields?: Fields<T> };

// Reducer function to handle form actions
function formReducer<T extends Record<string, string>>(
  state: FormState<T>,
  action: FormActions<T>
): FormState<T> {
  switch (action.type) {
    case FormAction.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          value: action.value,
          isValid: action.isValid,
          isDirty: true,
        },
      };
    case FormAction.SET_TOUCHED:
      return {
        ...state,
        [action.field]: {
          ...state[action.field],
          isTouched: true,
        },
      };
    case FormAction.RESET_FORM:
      // Check if fields are provided in the action, if so, return them
      if (action.fields) return action.fields;

      // Reset each field to its initial state
      return Object.fromEntries(
        Object.keys(state).map((key) => [
          key,
          {
            value: "",
            isValid: false,
            isDirty: false,
            isTouched: false,
          },
        ])
      ) as Fields<T>;
    default:
      return state;
  }
}

// Custom hook to handle form state and submission
export function useProjectReducerForm<T extends Record<string, string>>({
  initialFields,
  onSubmit,
  validate,
}: UseFormProps<T>) {
  // Initialize form state with field properties
  const initialState = Object.fromEntries(
    Object.keys(initialFields).map((key) => {
      return [
        key as keyof T,
        {
          value: initialFields[key as keyof T],
          isValid: false,
          isDirty: false,
          isTouched: false,
        } as FieldState,
      ];
    })
  ) as Fields<T>;

  // Use reducer for form state management
  const [state, dispatch] = useReducer(formReducer<T>, initialState);

  // Update field value and validation status
  const updateField = (field: keyof T, value: string) => {
    const isValid = validate[field] ? validate[field](field, value) : true;
    dispatch({ type: FormAction.UPDATE_FIELD, field, value, isValid });
  };

  // Set field as touched (onBlur)
  const setFieldTouched = (field: keyof T) => {
    dispatch({ type: FormAction.SET_TOUCHED, field });
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormValid = Object.values(state).every((field) => field.isValid);
    if (!isFormValid) return;

    // Collect form data from fields
    const formData = Object.fromEntries(
      Object.keys(state).map((key) => [key, state[key as keyof T].value])
    ) as T;

    onSubmit(formData);
    dispatch({ type: FormAction.RESET_FORM });
  };

  // Get props for a field, including value, onChange, and onBlur handlers
  const getFieldProps = (field: keyof T) => {
    return {
      value: state[field].value,
      onChange: (event: FormEvent<HTMLInputElement>) => {
        const input = event.target as HTMLInputElement;
        updateField(field, input.value);
      },
      onBlur: () => setFieldTouched(field),
    };
  };

  // Determine if a field is invalid (based on validation and dirtiness)
  const isFieldInvalid = (field: keyof T) =>
    !state[field].isValid && state[field].isDirty;

  return {
    fields: state,
    handleSubmit,
    getFieldProps,
    isFieldInvalid,
  };
}

export default useProjectReducerForm;