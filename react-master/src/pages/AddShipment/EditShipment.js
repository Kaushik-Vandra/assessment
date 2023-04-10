import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  getAllMedication,
  getApprovedPatientList,
  getPatientAddress,
  getShipmentDetail,
  updateShipment,
} from "../../Redux/ShipmentSlice";
import ReactDatePicker from "react-datepicker";
import { Input } from "../../components/common/FormField";
import "react-datepicker/dist/react-datepicker.css";

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

const EditShipment = () => {
  const params = useParams();
  // console.log('params: ', params);
  const [details, setDetails] = useState();
  // console.log("details: ", details);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shipmentDataEdit = useSelector(
    (state) => state?.shipment?.shipmentDataEdit
  );
  // console.log("shipmentDataEdit: ", shipmentDataEdit);

  const patientNames = useSelector((state) => state?.shipment?.patientNames);
  // console.log('patientNames: ', patientNames);
  const medicationName = useSelector(
    (state) => state?.shipment?.medicationName
  );
  // console.log('medicationName: ', medicationName);
  const patientAddress = useSelector(
    (state) => state?.shipment?.patientAddress
  );
  // console.log('patientAddress: ', patientAddress);

  const {
    control,
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    let payload = {
      _id: params?.id,
    };
    dispatch(getShipmentDetail(payload)).then((res) => {
      setDetails(res?.data);
    });
  }, []);

  useEffect(() => {
    let getPatientPayload = {
      length: 10000,
      start: 0,
    };
    dispatch(getApprovedPatientList(getPatientPayload));

    if (shipmentDataEdit?.patientId) {
      let patientAddressPayload = {
        length: 10000,
        patientId: shipmentDataEdit?.patientId,
        start: 0,
      };
      dispatch(getPatientAddress(patientAddressPayload));
    }

    if (shipmentDataEdit?.patientId) {
      let medicationPayload = {
        length: 10000,
        _id: shipmentDataEdit?.patientId,
        start: 0,
      };
      dispatch(getAllMedication(medicationPayload));
    }
  }, [shipmentDataEdit]);

  useEffect(() => {
    if (details) {
      setValue("patientId", details?.patientId);
      setValue("medicationId", details?.medicationId);
      setValue("deliveryDate", new Date(details?.deliveryDate));
      setValue("nextDeliveryDate", new Date(details?.nextDeliveryDate));
      setValue("trackUrl", details?.trackUrl);
      setValue("dosage", details?.dosage);
      setValue("addressId", details?.addressId);
    }
  }, [details, shipmentDataEdit, patientNames]);

  const patientId = useWatch({
    control,
    name: "patientId",
  });
  useEffect(() => {
    if (patientId) {
      // console.log("patientId: ", patientId);
      const addressPayload = {
        length: 10000,
        patientId: patientId,
        start: 0,
      };
      dispatch(getPatientAddress(addressPayload))
      // .then((res) => {
      //   if (res.status === 200) {
      //     setValue("addressId", "");
      //   }
      // });

      const medicationPayload = {
        _id: patientId,
      };
      dispatch(getAllMedication(medicationPayload))
      // .then((res) => {
      //   if (res.status === 200) {
      //   }
      //   setValue("medicationId", "");
      // });
    }
  }, [patientId]);

  const onSubmit = (data) => {
    // console.log("data: ", data);
    let payload = {
      ...data,
      _id: params.id,
    };
    dispatch(updateShipment(payload)).then((res) => navigate("/add-shipment"));
  };

  return (
    <>
      <div className="card m-auto mx-5 my-5">
        <div className="card-body">
          <h5>Shipment Add Management</h5> <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row d-flex justify-content-center">
              <div className="form-group col-md-6 mx-1">
                <label>Patient Name</label>
                {/* <select
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
                </select> */}
                <Controller
                  name="patientId"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <select
                      placeholder="Select..."
                      className="form-control"
                      {...register("patientId")}
                      // onChange={onChange}
                    >
                      <option value="">Select...</option>
                      {patientNames.map((value, i) => (
                        <option key={i} value={value?.id}>
                          {/* console.log('value: ', value) */}
                          {value?.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.patientId && (
                  <p className="text-danger fw-light fst-italic">
                    {errors.patientId.message}
                  </p>
                )}
              </div>
              <div className="form-group col-md-6 mx-1">
                <label>Medication Name</label>
                {/* <select
                  placeholder="Select..."
                  className="form-control"
                  {...register("medicationId")}
                >
                  <option value="">Select...</option>
                  {medicationName.map((value, i) => (
                    <option key={i} value={value.id}>
                      {console.log("value: ", value)}
                      {value.name}
                    </option>
                  ))}
                </select> */}
                <Controller
                  name="medicationId"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <select
                      placeholder="Select..."
                      className="form-control"
                      {...register("medicationId")}
                    >
                      <option value="">Select...</option>
                      {medicationName.map((value, i) => (
                        <option key={i} value={value?.id}>
                          {value?.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
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
              <div className="form-group col-md-6 mx-1">
                <label>Next Shipment Date</label>
                <Controller
                  control={control}
                  name="nextDeliveryDate"
                  render={({ field }) => (
                    <ReactDatePicker
                      className="form-control"
                      placeholderText="Select date"
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
                <label>Patient Address</label>
                {/* <select
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
                </select> */}
                <Controller
                  name="addressId"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
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
                  )}
                />
                {errors.addressId && (
                  <p className="text-danger fw-light fst-italic">
                    {errors.addressId.message}
                  </p>
                )}
              </div>
            </div>{" "}
            <br />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditShipment;
