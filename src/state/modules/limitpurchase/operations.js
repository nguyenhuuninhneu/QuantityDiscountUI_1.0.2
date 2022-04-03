import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchList = () => {
  return (dispatch, getState) => {
    dispatch(actions.fetchListLoading());
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
          axios.get(config.rootLink + '/FrontEnd/GetLimitPurchasesPaginate', {
            params: {
              search: '',
              typeselected: 0,
              shopID: result.ShopID,
              shop: config.shop,
              page: 1,
              pagezise: 10,
              token: config.token,
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
        })
        .catch(function (error) {
          const errorMsg = error.message;
        })
    }
    else {
      axios.get(config.rootLink + '/FrontEnd/GetLimitPurchasesPaginate', {
        params: {
          search: '',
          typeselected: 0,
          shopID: shopID,
          shop: config.shop,
          page: 1,
          pagezise: 10,
          token: config.token,
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
    }


  };
};


export const createEditLimitPurchase = (limitpurchase) => {
  return (dispatch, getState) => {
    dispatch(actions.setCreateUpdateLimitPurchase(
      {
        ...getState().limitpurchase.CreateUpdateLimitPurchase,
        limitpurchase: limitpurchase,
        IsOpenSaveResult: false
      }));
  }
}

export const saveLimitPurchase = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading(true));
    var limitpurchase = getState().limitpurchase.CreateUpdateLimitPurchase.limitpurchase;
    if (limitpurchase.Min === null) {
      limitpurchase.Min = 0;
    }
    if (limitpurchase.Max === null) {
      limitpurchase.Max = 0;
    }
    axios.post(config.rootLink + '/FrontEnd/SaveLimitPurchase', {
      limitPurchase: limitpurchase,
      shop: config.shop,
      token: config.token,
    })
      .then(function (response) {

        const result = response?.data;
        if (result.IsSuccess) {
          dispatch(actions.saveLimitPurchaseCompleted(result));
        } else {
          dispatch(actions.saveLimitPurchaseFailed(result));
        }

      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.saveLimitPurchaseFailed(errorMsg));
      })

  }
}
export const saveBulkLimitPurchase = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading(true));
    var bulkUpdate = getState().limitpurchase.CreateUpdateLimitPurchase.BulkUpdate;
    if (bulkUpdate.Min === null) {
      bulkUpdate.Min = 0;
    }
    if (bulkUpdate.Max === null) {
      bulkUpdate.Max = 0;
    }
    axios.post(config.rootLink + '/FrontEnd/SaveBulkLimitPurchase', {
      listCollect: bulkUpdate.ListCollects.map(p => p.CollectID),
      min: bulkUpdate.Min,
      max: bulkUpdate.Max,
      shop: config.shop,
      token: config.token,
    })
      .then(function (response) {

        const result = response?.data;
        if (result.IsSuccess) {
          dispatch(actions.saveBulkLimitPurchaseCompleted(result));
        } else {
          dispatch(actions.saveBulkLimitPurchaseFailed(result));
        }

      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.saveBulkLimitPurchaseFailed(errorMsg));
      })

  }
}

export default {
  fetchList,
  createEditLimitPurchase,
  saveLimitPurchase,
  saveBulkLimitPurchase
};
