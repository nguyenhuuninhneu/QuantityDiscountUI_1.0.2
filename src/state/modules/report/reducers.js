import moreAppConfig from "../../../config/moreAppConfig";
import * as types from "./types";

var today  = new Date();
var strDateToday = today.getFullYear() + '-' + (today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1 ) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
var options = {  year: 'numeric', month: 'short', day: 'numeric' };

const INITIAL_STATE = {
  ListReport: {
    reports: null,
    IsLoadingPage: false,
    IsLoadingSpinner: false,
    IsOpenReportDetail: false,
    IsOpenDateRange: false,
    DateRange: {
      InputValue: 'Dec 18, 2021 - Jan 13, 2022',
      StartDate: strDateToday,
      StartDateStr: today.toLocaleDateString("en-US", options),
      EndDate: strDateToday,
      EndDateStr: today.toLocaleDateString("en-US", options),
      SelectedTypeRange: null,
    },
    Paginate: {
      CurrentItems: [],
      TotalPage: 1,
      Offset: 0,
    },
    ReportDetail: null
  },

};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LOADING_PAGE:
      return {
        ...state,
        ListReport: {
          ...state.ListReport,
          IsLoadingPage: true,
        }
      };

    case types.FETCH_LIST_COMPLETED:
      return {
        ...state,
        ListReport: {
          ...state.ListReport,
          IsLoadingPage: false,
          reports: action.payload.list,
          Paginate: {
            Offset: 0,
            TotalPage: action.payload.list.length <= moreAppConfig.ItemPerPage ? 1 : Math.ceil(action.payload.list.length / moreAppConfig.ItemPerPage),
            CurrentItems: action.payload.list.slice(0, moreAppConfig.ItemPerPage)
          },
          TotalReport: action.payload.list.length,

        },
      };

    case types.FETCH_LIST_FAILED:
      return {
        ...state,
        ListReport: {
          ...state.ListReport,
          IsLoadingPage: false,
          listFailed: action.payload,
        }

      };
    case types.SET_LISTREPORT:
      return {
        ...state,
        ListReport: action.payload
      };

    case types.FETCH_REPORTDETAIL_COMPLETED:
      return {
        ...state,
        ListReport: {
          ...state.ListReport,
          IsLoadingPage: false,
          IsOpenReportDetail: true,
          IsLoadingSpinner: false,
          ReportDetail: action.payload.listDetail,
        },


      };

    case types.FETCH_REPORTDETAIL_FAILED:
      return {
        ...state,
        ListReport: {
          ...state.ListReport,
          IsLoadingPage: false,
          IsLoadingSpinner: false,
          ReportDetail:[]
        }

      };
    case types.SET_LOADING_PAGE:
      return {
        ...state,
        CreateUpdateLimitPurchase: {
          ...state.CreateUpdateLimitPurchase,
          IsLoadingPage: action.payload,
        }
      };
    default:
      return state;
  }
};

export default reducer;
