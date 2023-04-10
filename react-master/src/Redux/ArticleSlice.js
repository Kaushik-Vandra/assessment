import { createSlice } from "@reduxjs/toolkit";
import {
  API_ADDARTICLE,
  API_ARTICLE,
  API_DELETEARTICLE,
  API_EDITARTICLE,
  API_UPDATEARTICLE,
  ARTICLE_DATA_F,
  ARTICLE_DATA_S,
  ARTICLE_DETAILS,
} from "../constants";

const initialState = {
  articleData: [],
  totalRecords: "",
  articleDetails: {}
};

export const getArticle = (data) => ({
  type: "API",
  payload: {
    url: API_ARTICLE,
    method: "POST",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: ARTICLE_DATA_S,
      payload: data,
    }),
    error: (data) => ({
      type: ARTICLE_DATA_F,
      payload: {},
    }),
  },
});

export const addArticle = (data) => ({
  type: "API",
  payload: {
    url: API_ADDARTICLE,
    method: "POST",
    data: data,
    hideLoader: false,
    // success: (data) => ({
    //   type: ARTICLE_DATA_S,
    //   payload: data,
    // }),
    // error: (data) => ({
    //   type: ARTICLE_DATA_F,
    //   payload: {},
    // }),
  },
});

export const getArticleDetail = (data) => ({
  type: "API",
  payload: {
    url: API_EDITARTICLE,
    method: "POST",
    data: data,
    hideLoader: false,
    success: (data) => ({
      type: ARTICLE_DETAILS,
      payload: data,
    }),
    // error: (data) => ({
    //   type: ARTICLE_DATA_F,
    //   payload: {},
    // }),
  },
});

export const updateArticle = (data) => ({
  type: "API",
  payload: {
    url: API_UPDATEARTICLE,
    method: "POST",
    data: data,
    hideLoader: false,
    // success: (data) => ({
    //   type: ARTICLE_DETAILS,
    //   payload: data,
    // }),
    // error: (data) => ({
    //   type: ARTICLE_DATA_F,
    //   payload: {},
    // }),
  },
});

export const deleteArticle = (data) => ({
  type: "API",
  payload: {
    url: API_DELETEARTICLE,
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

const articleSlice = createSlice({
  name: "article",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(ARTICLE_DATA_S, (state, action) => {
      state.articleData = action.payload.data.data;
      state.totalRecords = action.payload.data.recordsTotal;
    });
    builder.addCase(ARTICLE_DATA_F, (state, action) => {
      state.articleData = [];
    });
    builder.addCase(ARTICLE_DETAILS, (state, action) => {
      state.articleDetails = action.payload.data;
    });
  },
});

export const { loaderChange } = articleSlice.actions;
export default articleSlice.reducer;
