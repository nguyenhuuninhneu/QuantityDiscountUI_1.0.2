import moreAppConfig from "../../../config/moreAppConfig";
import * as types from "./types";
const INITIAL_STATE = {
  ListLimitPurchase: {
    limitpurchases: null,
    TextSearchProduct: null,
    Collections: null,
    ListProductHaveLimit: [{ label: 'All products', value: 0 },{ label: 'Product have limit', value: 1 }],
    ProductSelected: 0,
    IsLoadingPage: false,
    Paginate: {
      CurrentItems: [],
      TotalPage: 1,
      Offset: 0,
    },
    TotalLimitPurchase: 0
  },
  CreateUpdateLimitPurchase: {
    BulkUpdate: {
      ListCollects: [],
      Min: 0,
      Max: 0
    },
    IsOpenCreateUpdateModal: false,
    limitpurchase: {
      ID: 0,
      Title: '',
      Handle: '',
      ShopID: 0,
      ProductID: 0,
      ProductCode: 0,
      Min: 0,
      Max: 0,
    },
    IsOpenSaveToolbar: false,
    IsSaveLoading: false,
    IsOpenSaveResult: false,
    IsLoadingPage: false,
    MessageSaveResult: null,
    MinValidation: null,
    MaxValidation: null,
    LimitPurchaseCollectValidation: null,
  }
};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_LIST_LOADING:
      return {
        ...state,
        ListLimitPurchase: {
          ...state.ListLimitPurchase,
          IsLoadingPage: true,
        }
      };

    case types.FETCH_LIST_COMPLETED:
      return {
        ...state,
        ListLimitPurchase: {
          ...state.ListLimitPurchase,
          IsLoadingPage: false,
          limitpurchases: action.payload.list,
          Collections: action.payload.collects,
          Paginate: {
            Offset: 0,
            TotalPage: action.payload.totalpage,
            CurrentItems: action.payload.list
          },
          TotalLimitPurchase: action.payload.totalitem,

        },
        CreateUpdateLimitPurchase: {
          ...state.CreateUpdateLimitPurchase,
          limitpurchase: {
            ...state.CreateUpdateLimitPurchase.limitpurchase,
            ShopID: action.payload.shopID

          }
        }

      };

    case types.FETCH_LIST_FAILED:
      return {
        ...state,
        ListLimitPurchase: {
          ...state.ListLimitPurchase,
          IsLoadingPage: false,
          listFailed: action.payload,
        }

      };
    case types.SET_CREATEUPDATELIMITPURCHASE:
      return {
        ...state,
        CreateUpdateLimitPurchase: action.payload
      };
    case types.SET_LISTLIMITPURCHASE:
      return {
        ...state,
        ListLimitPurchase: action.payload
      };
    // case types.SET_ISOPENSAVETOOLBAR:
    //   return {
    //     ...state,
    //     CreateUpdateLimitPurchase: {
    //       ...state.CreateUpdateLimitPurchase,
    //       IsOpenSaveToolbar: action.payload,
    //     }
    //   };
    case types.SET_ISSAVELOADING:
      return {
        ...state,
        CreateUpdateLimitPurchase: {
          ...state.CreateUpdateLimitPurchase,
          IsSaveLoading: action.payload,
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
    case types.SAVE_LIMITPURCHASECOMPLETED:
      // var obj = {label: action.payload.limitPurchase.Title, value: action.payload.limitPurchase.ProductCode};
      // var isExist = state.ListLimitPurchase.ListProductHaveLimit.filter(p=>p.value == obj.value).length > 0 ;
      return {
        ...state,
        ListLimitPurchase: {
          ...state.ListLimitPurchase,
          // ListProductHaveLimit: isExist ? state.ListLimitPurchase.ListProductHaveLimit : [...state.ListLimitPurchase.ListProductHaveLimit, obj],
          IsLoadingPage: false,
          Paginate: {
            ...state.ListLimitPurchase.Paginate,
            CurrentItems: state.ListLimitPurchase.Paginate.CurrentItems.map((p, i) => (p.ProductCode == action.payload.limitPurchase.ProductCode ? {
              ...p,
              ID: action.payload.limitPurchase.ID,
              Min: action.payload.limitPurchase.Min,
              Max: action.payload.limitPurchase.Max
            } : p)),
          },
          limitpurchases: state.ListLimitPurchase.limitpurchases.map((p, i) => (p.ProductCode == action.payload.limitPurchase.ProductCode ? {
            ...p,
            ID: action.payload.limitPurchase.ID,
            Min: action.payload.limitPurchase.Min,
            Max: action.payload.limitPurchase.Max
          } : p))
        },
        CreateUpdateLimitPurchase: {
          ...state.CreateUpdateLimitPurchase,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsOpenSaveResult: true,
          IsOpenCreateUpdateModal: false,
          MessageSaveResult: action.payload.IsSuccess ? 'Limit purchase is saved successfully.' : action.payload.Message,
          limitpurchase: {
            ...state.CreateUpdateLimitPurchase.limitpurchase,
            ID: action.payload.IsSuccess ? action.payload.limitPurchase.ID : state.CreateUpdateLimitPurchase.limitPurchase.ID,
          }
        }
      };
    case types.SAVE_LIMITPURCHASEFAILED:
      return {
        ...state,
        CreateUpdateLimitPurchase: {
          ...state.CreateUpdateLimitPurchase,
          IsOpenSaveToolbar: false,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          IsOpenCreateUpdateModal: false,
          MessageSaveResult: action.payload.Message,
        }
      };
      case types.SAVE_BULKLIMITPURCHASECOMPLETED:
        // var listProductHaveLimitBUlk = action.payload.listProduct.filter(p=> !state.ListLimitPurchase.ListProductHaveLimit.map(k=> k.value).includes(p.ProductCode));
        // var arr = [];
        // if (listProductHaveLimitBUlk != null && listProductHaveLimitBUlk != undefined) {
        //   listProductHaveLimitBUlk.map((element) => {
        //     arr.push({label: element.TitleProduct, value: element.ProductCode});
        //   });
        // }
        var listProductCodeAdd = action.payload.listLimitPurchaseUpdate.map(k=>k.ProductID);
        
        // var newArray = state.ListLimitPurchase.ListProductHaveLimit.concat(arr);
        return {
          ...state,
          ListLimitPurchase: {
            ...state.ListLimitPurchase,
            // ListProductHaveLimit: newArray,
            IsLoadingPage: false,
            Paginate: {
              ...state.ListLimitPurchase.Paginate,
              CurrentItems: state.ListLimitPurchase.Paginate.CurrentItems.map((p, i) => 
              (listProductCodeAdd.includes(p.ProductCode) ? 
              {
                ...p,
                ID: action.payload.listLimitPurchaseUpdate.filter(k=>k.ProductID == p.ProductCode)[0]?.ID,
                Min: action.payload.listLimitPurchaseUpdate.filter(k=>k.ProductID == p.ProductCode)[0]?.Min,
                Max: action.payload.listLimitPurchaseUpdate.filter(k=>k.ProductID == p.ProductCode)[0]?.Max
              } 
                  : p)
              ),
            },
            limitpurchases: state.ListLimitPurchase.limitpurchases.map((p, i) => (listProductCodeAdd.includes(p.ProductCode) ? 
            {
              ...p,
              ID: action.payload.listLimitPurchaseUpdate.filter(k=>k.ProductID == p.ProductCode)[0]?.ID,
              Min: action.payload.listLimitPurchaseUpdate.filter(k=>k.ProductID == p.ProductCode)[0]?.Min,
              Max: action.payload.listLimitPurchaseUpdate.filter(k=>k.ProductID == p.ProductCode)[0]?.Max
            } 
                : p))
          },
          CreateUpdateLimitPurchase: {
            ...state.CreateUpdateLimitPurchase,
            IsOpenSaveToolbar: !action.payload.IsSuccess,
            IsSaveLoading: false,
            IsOpenSaveResult: true,
            IsOpenCreateUpdateModal: false,
            BulkUpdate: {
              ListCollects: null,
              Min: 0,
              Max: 0
            },
            MessageSaveResult: action.payload.IsSuccess ? 'Bulk action is saved successfully.' : action.payload.Message,
          }
        };
      case types.SAVE_BULKLIMITPURCHASEFAILED:
        return {
          ...state,
          CreateUpdateLimitPurchase: {
            ...state.CreateUpdateLimitPurchase,
            IsOpenSaveToolbar: false,
            IsSaveLoading: false,
            IsLoadingPage: false,
            IsOpenSaveResult: true,
            IsOpenCreateUpdateModal: false,
            MessageSaveResult: action.payload.Message,
          }
        };
    default:
      return state;
  }
};

export default reducer;
