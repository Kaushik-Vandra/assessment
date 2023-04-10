import { createSlice } from "@reduxjs/toolkit";
import { API_ADDSHIPMENT, API_DELETESHIPMENT, API_GETMEDICATION, API_GETSHIPMENT, API_GETSHIPMENTDETAIL, API_PATIENTADDRESS, API_PATIENTLIST, API_UPDATESHIPMENT, MEDICATION_DATA_S, PATIENT_ADDRESS_S, PATIENT_LIST_F, PATIENT_LIST_S, SHIPMENT_DATA_EDIT_S, SHIPMENT_DATA_F, SHIPMENT_DATA_S } from "../constants";

const initialState = {
  shipmentData: [],
  totalRecords: "",
  patientNames: [],
  medicationName: [],
  patientAddress: [],
  shipmentDataEdit: {}
};

export const addShipment = (data) => ({
  type: "API",
  payload: {
    url: API_ADDSHIPMENT,
    method: "POST",
    data: data,
    hideLoader: false,
      // success: (data) => ({
      //   type: SHIPMENT_DATA_S,
      //   payload: data,
      // }),
      // error: (data) => ({
      //   type: SHIPMENT_DATA_F,
      //   payload: {},
      // }),
  },
});

export const deleteShipment = (data) => ({
  type: "API",
  payload: {
    url: API_DELETESHIPMENT,
    method: "POST",
    data: data,
    hideLoader: false,
      // success: (data) => ({
      //   type: SHIPMENT_DATA_S,
      //   payload: data,
      // }),
      // error: (data) => ({
      //   type: SHIPMENT_DATA_F,
      //   payload: {},
      // }),
  },
});

export const updateShipment = (data) => ({
  type: "API",
  payload: {
    url: API_UPDATESHIPMENT,
    method: "POST",
    data: data,
    hideLoader: false,
      // success: (data) => ({
      //   type: SHIPMENT_DATA_S,
      //   payload: data,
      // }),
      // error: (data) => ({
      //   type: SHIPMENT_DATA_F,
      //   payload: {},
      // }),
  },
});

export const getShipment = (data) => ({
  type: "API",
  payload: {
    url: API_GETSHIPMENT,
    method: "POST",
    data: data,
    hideLoader: false,
      success: (data) => ({
        type: SHIPMENT_DATA_S,
        payload: data,
      }),
      error: (data) => ({
        type: SHIPMENT_DATA_F,
        payload: {},
      }),
  },
});

export const getShipmentDetail = (data) => ({
  type: "API",
  payload: {
    url: API_GETSHIPMENTDETAIL,
    method: "POST",
    data: data,
    hideLoader: false,
      success: (data) => ({
        type: SHIPMENT_DATA_EDIT_S,
        payload: data,
      }),
    //   error: (data) => ({
    //     type: SHIPMENT_DATA_F,
    //     payload: {},
    //   }),
  },
});


export const getApprovedPatientList = (data) => ({
  type: "API",
  payload: {
    url: API_PATIENTLIST,
    method: "POST",
    data: data,
    hideLoader: false,
      success: (data) => ({
        type: PATIENT_LIST_S,
        payload: data,
      }),
      error: (data) => ({
        type: PATIENT_LIST_F,
        payload: {},
      }),
  },
});

export const getPatientAddress = (data) => ({
  type: "API",
  payload: {
    url: API_PATIENTADDRESS,
    method: "POST",
    data: data,
    hideLoader: false,
      success: (data) => ({
        type: PATIENT_ADDRESS_S,
        payload: data,
      }),
      // error: (data) => ({
      //   type: PATIENT_LIST_F,
      //   payload: {},
      // }),
  },
});

export const getAllMedication = (data) => ({
  type: "API",
  payload: {
    url: API_GETMEDICATION,
    method: "POST",
    data: data,
    hideLoader: false,
      success: (data) => ({
        type: MEDICATION_DATA_S,
        payload: data,
      }),
      // error: (data) => ({
      //   type: PATIENT_LIST_F,
      //   payload: {},
      // }),
  },
});

const shipmentSlice = createSlice({
  name: "shipment",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(SHIPMENT_DATA_S, (state, action) => {
      state.shipmentData = action.payload.data.data;
      state.totalRecords = action.payload.data.recordsTotal;
    });
    builder.addCase(SHIPMENT_DATA_F, (state, action) => {
      state.shipmentData = [];
    });
    builder.addCase(SHIPMENT_DATA_EDIT_S, (state, action) => {
      state.shipmentDataEdit = action.payload.data;
      // console.log('state.shipmentDataEdit: ', state.shipmentDataEdit);
    });
    builder.addCase(PATIENT_LIST_S, (state, action) => {
      // state.patientNames = action.payload.data.data;

      let patients = action.payload.data.data.map((patient) => {
        const patientData={
          name:patient.name,
          id:patient._id
        }
        return patientData
      });
      
      state.patientNames = patients;
    });
    builder.addCase(PATIENT_LIST_F, (state, action) => {
      state.patientNames = [];
    });
    builder.addCase(PATIENT_ADDRESS_S, (state, action) => {
      let address = action.payload.data.map((address) => {
        const addressData={
          fullAddress:`${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.pincode}`,
          id:address._id
        }
        return addressData
      });
      state.patientAddress = address;
      // console.log('patientAddress: ', state.patientAddress);
    });
    builder.addCase(MEDICATION_DATA_S, (state, action) => {

      let medications = action.payload.data.map((medication) => {
        const medicationData={
          name:medication.name,
          id:medication.medicationId
        }
        return medicationData
      });
      state.medicationName = medications;
    });
  },
});

export const { loaderChange } = shipmentSlice.actions;
export default shipmentSlice.reducer;
