import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchList = (start, end) => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage());
    axios.get(config.rootLink + '/FrontEnd/GetReports', {
      params: {
        shopID: getState().app.Shop?.ID,
        startDate: start,
        endDate: end
      }
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.fetchListCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.fetchListFailed(errorMsg));
      })

  };
};

export const reportDetail = (campaignid) => {
  return (dispatch, getState) => {
    // dispatch(actions.setIsLoadingPage());
    axios.get(config.rootLink + '/FrontEnd/ReportDetail', {
      params: {
        shopID: getState().app.Shop?.ID,
        campaignID: campaignid
      }
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.fetchReportDetailCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.fetchReportDetailFailed(errorMsg));
      })

  };
};

export default {
  fetchList
};
