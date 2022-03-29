import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";
import * as appAction from "../../modules/app/actions";

export const fetchPlan = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage(true));
    axios.get(config.rootLink + '/FrontEnd/GetPlan', {
      params: {
        shop: getState().app.Shop?.Domain,
        shopID: getState().app.Shop?.ID
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

export const Upgrade = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage(true));
    axios.post(config.rootLink + '/FrontEnd/Upgrade', {
      shopID: getState().app.Shop?.ID,
      shop: getState().app.Shop?.Domain,
    })
      .then(function (response) {

        const result = response?.data;
        if (result.IsSuccess) {
          if (result.ConfirmationUrl != '' && result.ConfirmationUrl != undefined) {
            window.open(result.ConfirmationUrl, "_blank");
          }
          dispatch(actions.setUpgradeCompleted(result));
          // dispatch(appAction.setPlanNumber(1))

        } else {
          dispatch(actions.setUpgradeFailed(result));
        }

      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.setUpgradeFailed(errorMsg));
      })

  }
}
export const Downgrade = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage(true));
    axios.post(config.rootLink + '/FrontEnd/Downgrade', {
      shopID: getState().app.Shop?.ID,
      shop: getState().app.Shop?.Domain,
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
export const StartFreeTrial = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsLoadingPage(true));
    axios.post(config.rootLink + '/FrontEnd/StartFreeTrial', {
      shopID: getState().app.Shop?.ID,
      shop: getState().app.Shop?.Domain,
    })
      .then(function (response) {

        const result = response?.data;
        if (result.IsSuccess) {
          dispatch(actions.setFreeTrialCompleted(result));
        } else {
          dispatch(actions.setDowngradeFailed(result));
        }

      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.setFreeTrialCompleted(errorMsg));
      })

  }
}
export default {
  fetchPlan,
  Upgrade,
  Downgrade,
  StartFreeTrial
};
