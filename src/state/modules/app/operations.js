import axios from "axios";
import config from "../../../config/config";
import operationsCampaign from "../campaign/operations";
import * as actions from "./actions";

export const fetchShop = () => {
  return (dispatch, getState) => {
    dispatch(actions.fetchShopLoading());
    axios.get(config.rootLink + '/FrontEnd/GetShop', {
      params: {
        shop: config.shop,
        token: config.token,
      }
    })
      .then(function (response) {
        const result = response?.data;
        if (response.data.ConfirmationUrl != '' && response.data.ConfirmationUrl != undefined) {
          window.open(response.data.ConfirmationUrl, "_blank");
        }
        dispatch(actions.fetchShopCompleted(result)); 
        if (result.displayprocess) {
          dispatch(getProcess("Create"));
        } 
        dispatch(operationsCampaign.fetchList());
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.fetchShopFailed(errorMsg));
      })

  };
};
export const getProcess = (type) => {
  return (dispatch, getState) => {

      axios.get(config.rootLink + '/FrontEnd/GetProcess', {
          params: {
              shopID: getState().app.Shop?.ID,
              shop: config.shop,
              type: type,
              token: config.token,
          }
      })
          .then(function (response) {
              const result = response?.data;
              dispatch(actions.getProcessCompleted(result));
          })
          .catch(function (error) {
              const errorMsg = error.message;
              dispatch(actions.getProcessFailed(errorMsg));
          })

  };
};
export default {
  fetchShop,
  getProcess
};
