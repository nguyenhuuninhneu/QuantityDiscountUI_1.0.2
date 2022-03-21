import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchShop = () => {
  return (dispatch, getState) => {
    dispatch(actions.fetchShopLoading());
    axios.get(config.rootLink + '/FrontEnd/GetShop', {
      params: {
        shop: config.shop
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
              shop: getState().app.Shop?.Domain,
              type: type
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
