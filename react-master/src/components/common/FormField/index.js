import { ErrorMessage } from "@hookform/error-message";

export const RenderInput = ({
    labelName,
    type = "text",
    name,
    containerClass,
    inputClass,
    errorClass,
}) => {
    return (
        <div className={containerClass}>
            <label>{labelName}</label>
            <input type={type} className={inputClass} name={name} />
            <span className={errorClass}>*error</span>
        </div>
    )
}

export const Input = ({ label, register, type, errors, name }) => {
    return (
      <>
        <div className="my-2">
          <label className="form-label text-start">{label}</label>
          <input
            placeholder={label}
            {...register(name)}
            type={type}
            className="form-control"
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-danger fw-light fst-italic">{message}</p>
            )}
          />
          {/* {errors[label] && <p className="text-danger">{errors[label].message}</p> } */}
        </div>
      </>
    );
  };

  export const Select = ({ label, register, errors, values, placeholder, name, onChange }) => {
    return (
      <>
        <label>{label}</label>
        <select placeholder={placeholder} className="form-control" {...register(name)} onChange={onChange} defaultValue={values.name}>
          {/* <option value="">Select...</option> */}
          {values.map((value, i) => (
            <option key={i} value={value.id}>
              {console.log('value: ', value)}
              {value.name}
            </option>
          ))}
        </select>
        <ErrorMessage
          errors={errors}
          name={label}
          render={({ message }) => (
            <p className="text-danger fw-light fst-italic">{message}</p>
          )}
        />
        {/* {errors[label] && <p className="text-danger">{errors[label].message}</p> } */}
      </>
    );
  };

  // <Select
  //                 label="Patient Name"
  //                 register={register}
  //                 errors={errors}
  //                 values={patientNames}
  //                 placeholder="Select..."
  //                 name="patinetName"
  //                 onChange={patientChangeHandler}
  //               />