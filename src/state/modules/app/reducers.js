import * as types from "./types";
import moreAppConfig from "../../../config/moreAppConfig";

const INITIAL_STATE = {
  Shop: null,
  Setting: null,
  LimitPurchase: null,
  Products: null,
  Collections: null,
  IsLoading: false,
  IsNoCampaign: false,
  IsCreatingCampaign: false,
  IsEditCampaign: false,
  Menu: moreAppConfig.Menu.MANAGECAMPAIGN,
  Process: 0,
  DisplayProcess: false,
  NoCallTwiceTime: false,
  PlanNumber: 0,
};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_MENU:
      return {
        ...state,
        Menu: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        IsLoading: action.payload,
      };
    case types.SET_NO_CALL_TWICES:
      return {
        ...state,
        NoCallTwiceTime: action.payload,
      };
    case types.FETCH_SHOP_LOADING:
      return {
        ...state,
        IsLoading: true,
      };
    case types.FETCH_SHOP_FAILED:
      return {
        ...state,
        IsLoading: false,
      };
    case types.FETCH_SHOP_COMPLETED:
      return {
        ...state,
        IsLoading: false,
        Shop: action.payload.shop,
        // Setting: action.payload.setting,
        // LimitPurchase: action.payload.limitpurchase,
        // Products: action.payload.products,
        // SelectOptionProducts: action.payload.listOptionProduct,
        // Collections: action.payload.collects,
        PlanNumber: action.payload.planNumber,
        IsNoCampaign: !action.payload.hasCampaign,
        Menu:  moreAppConfig.Menu.MANAGECAMPAIGN,
        DisplayProcess: action.payload.displayprocess,
        // Menu: !action.payload.hasCampaign ? moreAppConfig.Menu.CREATECAMPAIGN : moreAppConfig.Menu.MANAGECAMPAIGN,
      };
    case types.SET_IS_EDIT_CAMPAIGN:
      return {
        ...state,
        IsEditCampaign: action.payload,
      };
    case types.SET_IS_NO_CAMPAIGN:
      return {
        ...state,
        IsNoCampaign: action.payload,
      };
    case types.SET_IS_CREATING_CAMPAIGN:
      return {
        ...state,
        IsCreatingCampaign: action.payload,
      };
    case types.GET_PROCESS_COMPLETED:
      return {
        ...state,
        Process: action.payload.process,
        DisplayProcess: action.payload.displayprocess,
      };

    case types.GET_PROCESS_FAILED:
      return {
        ...state,
        Process: action.payload.process,
        DisplayProcess: action.payload.displayprocess,
      };
      
    case types.SET_PLAN_NUMBER:
      return {
        ...state,
        PlanNumber: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
