import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";
import * as appAction from "../../modules/app/actions";

export const fetchPlan = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage(true));
    axios.get(config.rootLink + '/FrontEnd/GetPlan', {
      params: {
        shop: config.shop,
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

  };
};

export const Upgrade = (upgrade) => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage(true));
    axios.post(config.rootLink + '/FrontEnd/Upgrade', {
      shop: config.shop,
      upgrade: upgrade,
      token: config.token,
    })
      .then(function (response) {

        const result = response?.data;
        if (result.IsSuccess) {
          if (result.ConfirmationUrl != '' && result.ConfirmationUrl != undefined) {
            window.open(result.ConfirmationUrl, "_blank");
          }
          if (upgrade) {
            dispatch(actions.setUpgradeCompleted(result));
          }
          //start free trial
          else {
            dispatch(actions.setFreeTrialCompleted(result));

          }
          // dispatch(appAction.setPlanNumber(1))

        } else {
          if (upgrade) {
            dispatch(actions.setUpgradeFailed(result));
          } else {
            dispatch(actions.setUpgradeFailed(result));
          }
        }

      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.setFreeTrialFailed(errorMsg));
      })

  }
}
export const Downgrade = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage(true));
    axios.post(config.rootLink + '/FrontEnd/Downgrade', {
      shop: config.shop,
      token: config.token,
    })
      .then(function (response) {

        const result = response?.data;
        if (result.IsSuccess) {
          if (result.ConfirmationUrl != '' && result.ConfirmationUrl != undefined) {
            window.open(result.ConfirmationUrl, "_blank");
          }
          dispatch(actions.setDowngradeCompleted(result));
          // dispatch(appAction.setPlanNumber(0))
        } else {
          dispatch(actions.setDowngradeFailed(result));
        }

      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.setDowngradeFailed(errorMsg));
      })

  }
}
export default {
  fetchPlan,
  Upgrade,
  Downgrade,
};
