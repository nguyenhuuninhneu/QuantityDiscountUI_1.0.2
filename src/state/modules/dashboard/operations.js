import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchDashboard = (start, end) => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage(true));
    var shopID = getState().app.Shop?.ID;
    if (shopID == undefined) {
      axios.get(config.rootLink + '/FrontEnd/GetShopID', {
        params: {
          shop: config.shop,
          token: config.token,
        }
      })
        .then(function (response) {
          const result = response?.data;
          axios.get(config.rootLink + '/FrontEnd/Dashboard', {
            params: {
              shopID: result.ShopID,
              shop: config.shop,
              startDate: start,
              endDate: end,
              token: config.token,
            }
          })
            .then(function (response) {
              const result = response?.data;
              dispatch(actions.fetchCompleted(result));
            })
            .catch(function (error) {
              const errorMsg = error.message;
              dispatch(actions.fetchFailed(errorMsg));
            })
        })
        .catch(function (error) {
          const errorMsg = error.message;
        })
    }
    else {
      axios.get(config.rootLink + '/FrontEnd/Dashboard', {
        params: {
          shopID: shopID,
          shop: config.shop,
          startDate: start,
          endDate: end,
          token: config.token,
        }
      })
        .then(function (response) {
          const result = response?.data;
          dispatch(actions.fetchCompleted(result));
        })
        .catch(function (error) {
          const errorMsg = error.message;
          dispatch(actions.fetchFailed(errorMsg));
        })
    }


  };
};

export default {
  fetchDashboard,
};
