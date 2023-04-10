// ENV CONSTANTS
export const { REACT_APP_API_BASE: API_BASE } = process.env;
export const { REACT_APP_NAME: APP_NAME } = process.env;
export const { REACT_APP_IMAGE_BASE: IMAGE_BASE } = process.env;

// LOCALSTORAGE KEYNAME
export const LS_USER = `user${APP_NAME}`
export const LS_AUTHTOKEN = `authToken${APP_NAME}`

// TYPES FOR REDUCER
export const LOGIN_S = `LOGIN_S`;
export const LOGIN_F = `LOGIN_F`;

export const USER_LIST_S = `USER_LIST_S`;
export const USER_LIST_F = `USER_LIST_F`;

export const USER_INFO_S = `USER_INFO_S`;
export const USER_INFO_F = `USER_INFO_F`;

export const SHIPMENT_DATA_S = `SHIPMENT_DATA_S`;
export const SHIPMENT_DATA_F = `SHIPMENT_DATA_F`;
export const SHIPMENT_DATA_EDIT_S = `SHIPMENT_DATA_EDIT_S`;
export const PATIENT_LIST_S = `PATIENT_LIST_S`;
export const PATIENT_LIST_F = `PATIENT_LIST_F`;
export const PATIENT_ADDRESS_S = `PATIENT_ADDRESS_S`;
export const MEDICATION_DATA_S = `MEDICATION_DATA_S`;

export const ARTICLE_DATA_S = `ARTICLE_DATA_S`
export const ARTICLE_DATA_F = `ARTICLE_DATA_F`
export const ARTICLE_DETAILS = `ARTICLE_DETAILS`

// API ENDPOINTS
export const API_LOGIN = `auth/login`;
export const API_FORGOTPASS = `auth/forgotPassword`;
export const API_CHANGEPASS = `api/changePassword`;
export const API_DASHBOARD = `api/dashboard`;

//SHIPMENT API
export const API_GETSHIPMENT = `api/getShipment`;
export const API_GETSHIPMENTDETAIL = `api/getShipmentDetail`;
export const API_ADDSHIPMENT = `api/addShipment`;
export const API_DELETESHIPMENT = `api/deleteShipment`;
export const API_UPDATESHIPMENT = `api/updateShipment`;
export const API_PATIENTLIST =`api/getApprovedPatientList`;
export const API_PATIENTADDRESS =`api/getPatientAddress`;
export const API_GETMEDICATION =`api/getAllMedication`;

//ARTICLE API
export const API_ARTICLE = `api/getArticleList`;
export const API_ADDARTICLE = `api/addArticle`;
export const API_EDITARTICLE = `api/getArticleDetail`;
export const API_UPDATEARTICLE = `api/updateArticle`;
export const API_DELETEARTICLE = `api/deleteArticle`


export const API_USER_LIST = `admin/userList`;
export const API_USER_INFO = `admin/userInfo`;