import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

const dateObj = new Date();
const month = String(dateObj.getMonth() + 1).padStart(2, '0');
const day = String(dateObj.getDate()).padStart(2, '0');
const year = dateObj.getFullYear();
const todayStr = year + '-' + month + '-' + day;

export const fetchList = () => {
  return (dispatch, getState) => {
    dispatch(actions.fetchListLoading());
    axios.get(config.rootLink + '/FrontEnd/SearchCampaignPaginate', {
      params: {
        search: '',
        discounttype: 0,
        shopID: getState().app.Shop?.ID,
        shop: config.shop,
        page: 1,
        pagezise: 10
      }
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.fetchListCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        console.log(errorMsg);
      })

  };
};

export const createCampaign = () => {
  return (dispatch, getState) => {
    dispatch(actions.setCreateUpdateCampaign(
      {
        ...getState().campaign.CreateUpdateCampaign,
        campaign:
        {
          ID: 0,
          DiscountType: 1,
          PriceType: 1,
          Title: '',
          ShopID: getState().app.Shop?.ID,
          Active: true,
          ListDetails:
            [
              {
                ID: Math.floor(100000000 + Math.random() * 900000000),
                Quantity: 0,
                PercentOrPrice: 0
              },
              {
                ID: Math.floor(100000000 + Math.random() * 900000000),
                Quantity: 0,
                PercentOrPrice: 0
              }
            ],
          ListProducts: [],
          ListCollects: [],
          // ListVariants: getState().campaign.CreateUpdateCampaign.campaign.ListVariants,
          StartDate: todayStr,
          EndDate: todayStr,
          StartDateEdit: todayStr,
          EndDateEdit: todayStr,
          Step: 1
        },
        EndTimeValidation: null,
        IsOpenSaveResult: false,
        IsOpenSaveToolbar: false,
        // IsLoadingPage: true

      }));

  };
}

export const editCampaign = (campaign) => {
  return (dispatch, getState) => {
    dispatch(actions.setCreateUpdateCampaign(
      {
        ...getState().campaign.CreateUpdateCampaign,
        campaign: campaign,
        EndTimeValidation: null,
        IsOpenSaveResult: false
      }));
    // axios.get(config.rootLink + '/FrontEnd/CreateEditCampaign', {
    //   params: {
    //     shopID: getState().app.Shop?.ID
    //   }
    // })
    //   .then(function (response) {
    //     const result = response?.data;
    //     dispatch(actions.fetchEditCampaignCompleted(result, campaign));
    //   })
    //   .catch(function (error) {
    //     const errorMsg = error.message;
    //     dispatch(actions.fetchEditCampaignFailed(errorMsg));
    //   })
  }
}

export const saveCampaign = (isFirstCampaign = false) => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading(true));
    dispatch(actions.setIsLoadingPage(true));
    var campaign = getState().campaign.CreateUpdateCampaign.campaign;
    var createcampaign = getState().campaign.CreateUpdateCampaign;
    var yourname = createcampaign.YourName;
    var youremail = createcampaign.YourEmail;
    var describe = createcampaign.DescribeYourProblem;
    axios.post(config.rootLink + '/FrontEnd/SaveCampaign', {
      campaign: campaign,
      shop: config.shop,
      isFirstCampaign: isFirstCampaign,
      shopID: campaign.ShopID,
      yourname: yourname,
      youremail: youremail,
      describe: describe
    })
      .then(function (response) {

        const result = response?.data;
        if (result.IsSuccess) {
          dispatch(actions.saveCampaignCompleted(result));
          if (result.isCreate) {
            var listOld = getState().campaign.ListCampaign.campaigns;
            listOld = listOld.push(campaign);
            dispatch(actions.setListCampaign(
              {
                ...getState().campaign.ListCampaign,
                TotalCampaign: getState().campaign.ListCampaign.TotalCampaign + 1
              }));
          }
        } else {
          dispatch(actions.saveCampaignFailed(result));
        }

      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.saveCampaignFailed(errorMsg));
      })

  }
}

export default {
  fetchList,
  createCampaign,
  saveCampaign,
};
