import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input, Select } from "../../components/common/FormField";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getApprovedPatientList,
  getPatientAddress,
  getAllMedication,
  addShipment,
} from "../../Redux/ShipmentSlice";

const schema = yup
  .object({
    patientId: yup.string().required(),
    medicationId: yup.string().required(),
    deliveryDate: yup.date().required(),
    nextDeliveryDate: yup.date().required(),
    trackUrl: yup.string().required(),
    dosage: yup.string().required(),
    addressId: yup.string().required(),
  })
  .required();

const AddShipmentForm = () => {
  const [shownext, setShowNext] = useState(false);
  const [dDate, setDDate] = useState("");
  // console.log('dDate: ', new Date(dDate).toLocaleDateString());
  // console.log("dDate: ", new Date(dDate));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patientNames = useSelector((state) => state.shipment.patientNames);
  const medicationName = useSelector((state) => state.shipment.medicationName);
  const patientAddress = useSelector((state) => state.shipment.patientAddress);

  const patientChangeHandler = (e) => {
    console.log("e: ", e.target.value);
    const addressPayload = {
      length: 10000,
      patientId: String(e.target.value),
      start: 0,
    };
    dispatch(getPatientAddress(addressPayload)).then((res) => console.log(res));

    const medicationPayload = {
      _id: String(e.target.value),
    };
    dispatch(getAllMedication(medicationPayload)).then((res) =>
      console.log(res)
    );
  };

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  // const disablePastDt = (current) => {
  //   return current.isAfter(new Date(dDate).toISOString());
  // }

  const onSubmit = (data) => {
    const payload = {
      addressId: data.addressId,
      deliveryDate: data.deliveryDate,
      dosage: data.dosage,
      medicationId: data.medicationId,
      nextDeliveryDate: data.nextDeliveryDate,
      patientId: data.patientId,
      trackUrl: data.trackUrl,
    };
    // console.log('payload: ', payload);
    dispatch(addShipment(payload)).then((res) => {
      if (res.status === 200) {
        navigate("/add-shipment");
      }
    });
  };

  useEffect(() => {
    let requestPayload = {
      length: 10000,
      start: 0,
    };

    dispatch(getApprovedPatientList(requestPayload));
  }, []);

  return (
    <>
      <div className="card m-auto mx-5 my-5">
        <div className="card-body">
          <h5>Shipment Add Management</h5> <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row d-flex justify-content-center">
              <div className="form-group col-md-6 mx-1">
                <label>Patient Name</label>
                <select
                  placeholder="Select..."
                  className="form-control"
                  {...register("patientId")}
                  onChange={patientChangeHandler}
                >
                  <option value="">Select...</option>
                  {patientNames.map((value, i) => (
                    <option key={i} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
                {errors.patientId && (
                  <p className="text-danger fw-light fst-italic">
                    {errors.patientId.message}
                  </p>
                )}
              </div>
              <div className="form-group col-md-6 mx-1">
                <label>Medication Name</label>
                <select
                  placeholder="Select..."
                  className="form-control"
                  {...register("medicationId")}
                >
                  <option value="">Select...</option>
                  {medicationName.map((value, i) => (
                    <option key={i} value={value.id}>
                      {value.name}
                    </option>
                  ))}
                </select>
                {errors.medicationId && (
                  <p className="text-danger fw-light fst-italic">
                    {errors.medicationId.message}
                  </p>
                )}
              </div>
            </div>{" "}
            <br />
            <div className="form-row d-flex justify-content-left">
              <div className="form-group col-md-6">
                <label>Shipment Date</label>
                <Controller
                  control={control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <ReactDatePicker
                      className="form-control"
                      placeholderText="Select date"
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => {
                        field.onChange(date);
                        setDDate(date);
                        setShowNext(true);
                      }}
                      selected={field.value}
                    />
                  )}
                />
                {errors.deliveryDate && (
                  <p className="text-danger fw-light fst-italic">
                    {errors.deliveryDate.message}
                  </p>
                )}
              </div>
              {shownext && (
                <div className="form-group col-md-6 mx-1">
                  <label>Next Shipment Date</label>
                  <Controller
                    control={control}
                    name="nextDeliveryDate"
                    render={({ field }) => (
                      <ReactDatePicker
                        className="form-control"
                        placeholderText="Select date"
                        minDate={new Date(dDate)}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                      />
                    )}
                  />
                  {errors.nextDeliveryDate && (
                    <p className="text-danger fw-light fst-italic">
                      {errors.nextDeliveryDate.message}
                    </p>
                  )}
                </div>
              )}
            </div>{" "}
            <br />
            <div className="form-row d-flex justify-content-center">
              <div className="form-group col-md-6 mx-1">
                <Input
                  label="Track URL"
                  register={register}
                  type="text"
                  errors={errors}
                  name="trackUrl"
                />
              </div>
              <div className="form-group col-md-6 mx-1">
                <Input
                  label="Dosage"
                  register={register}
                  type="text"
                  errors={errors}
                  name="dosage"
                />
              </div>
            </div>{" "}
            <br />
            <div className="form-row">
              <div className="form-group col-md-6">
                {/* <Select
                  label="Patient Address"
                  register={register}
                  errors={errors}
                  values={[1, 2, 3]}
                  placeholder="Select..."
                  name="addressId"
                /> */}
                <label>Patient Address</label>
                <select
                  placeholder="Select..."
                  className="form-control"
                  {...register("addressId")}
                >
                  <option value="">Select...</option>
                  {patientAddress.map((value, i) => (
                    <option key={i} value={value.id}>
                      {value.fullAddress}
                    </option>
                  ))}
                </select>
                {errors.addressId && (
                  <p className="text-danger fw-light fst-italic">
                    {errors.addressId.message}
                  </p>
                )}
              </div>
            </div>{" "}
            <br />
            <button type="submit" className="btn btn-primary">
              Submit Shipment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddShipmentForm;
