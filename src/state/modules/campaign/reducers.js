import CreateUpdateCampaign from "../../../components/campaign/CreateUpdateCampaign";
import moreAppConfig from "../../../config/moreAppConfig";
import * as types from "./types";
// const dateObj = new Date();
// const month = String(dateObj.getMonth() + 1).padStart(2, '0');
// const day = String(dateObj.getDate()).padStart(2, '0');
// const year = dateObj.getFullYear();
// const todayStr = year + '-' + month + '-' + day;

const INITIAL_STATE = {
  ListCampaign: {
    campaigns: null,
    TextSearch: null,
    DiscountType: 0,
    DiscountTypeSelected: {lable: 'Discount based on' ,value : 0},
    listLoading: false,
    Paginate: {
      CurrentItems: [],
      TotalPage: 1,
      Offset: 0,
    },
    TotalCampaign: 0,
    Process: 100,
    IsFullyLoaded: true,
  },
  CreateUpdateCampaign: {
    Products: null,
    Collections: null,
    InventoryBulkUpdate: null,
    DiscountBulkUpdate: null,
    campaign: {
      ID: 0,
      Title: '',
      StartDate: '',
      EndDate: '',
      StartDateEdit: '',
      EndDateEdit: '',
      EndDateEditEmpty: '',
      ShopID: 0,
      DiscountType: 1,
      PriceType: 1,
      AllProducts: false,
      Active: true,
      ListDetails: [],
      ListProducts: [],
      ListProductsPost: [],
      ListCollects: [],
      ListVariants: [],
      StartDateStr: '',
      EndDateStr: '',
      IsSpecificCollect: false,
      IsSpecificProduct: false,
      IsVariantProduct: false,
      Step: 1
    },
    Setting: {
      ID: 0,
      ShopID: 0,
      Active: true,
      ShowDescription: true,
      ShowDiscountProductPage: true,
      ShowDiscountedPrice: true,
      LayoutInProductPage: 1,
      ShowColumnTotal: true,
      TextQuantityBreaks: "🔥 Buy more, save more! 🔥",
      TextQuantity: "Quantity",
      TextDiscount: "Discount",
      TextDiscountPrice: "Discount Price",
      TextPlus: "+",
      TextPrice: "Price",
      TextBuy: "Buy",
      TextEach: "Each",
      TableFontSizeHeading: "16",
      WidthLayout: 0,
      TablePadding: "1",
      TableBorderSize: "1",
      CustomCssProductPage: "",
      CustomJsProductPage: "",
      UseAjaxCart: true,
      ShowNotiOnCart: true,
      TextNotiOnCart: "Buy {Quantity} + discount {PercentOrPrice}",
      UseDiscountCodeOnCart: true,
      DisCountCodePrefix: "",
      UseUpdateOnCartPage: true,
      CustomCssCart: "",
      CustomJsCart: ""
    },
    YourName: '',
    YourEmail: '',
    DescribeYourProblem: '',
    YourNameValidation: null,
    YourEmailValidation: null,
    DescribeYourProblemValidation: null,
    IsOpenSaveToolbar: false,
    IsSaveLoading: false,
    IsOpenSaveResult: false,
    IsLoadingPage: false,
    IsShowSendSupport: false,
    MessageSaveResult: null,
    TitleValidation: null,
    StartTimeValidation: null,
    EndTimeValidation: null,
    ProductValidation: null,
    TextSearchProduct: null,
    CampaignDetailValidation: null,
    CheckTypeDiscountCollectValidation: null,
    CheckTypeDiscountProductValidation: null,
    CheckTypeDiscountVariantValidation: null
  }
};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_LIST_LOADING:
      return {
        ...state,
        ListCampaign: {
          ...state.ListCampaign,
          listLoading: true,
        }
      };

    case types.FETCH_LIST_COMPLETED:
      return {
        ...state,
        ListCampaign: {
          ...state.ListCampaign,
          listLoading: false,
          campaigns: action.payload.list,
          Paginate: {
            Offset: 0,
            TotalPage: action.payload.list.length <= moreAppConfig.ItemPerPage ? 1 : Math.ceil(action.payload.list.length / moreAppConfig.ItemPerPage),
            CurrentItems: action.payload.list.slice(0, moreAppConfig.ItemPerPage)
          },
          TotalCampaign: action.payload.list.length,

        },
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          campaign: {
            ...state.CreateUpdateCampaign.campaign,
            ShopID: action.payload.shopID

          }
        }

      };

    case types.FETCH_LIST_FAILED:
      return {
        ...state,
        ListCampaign: {
          ...state.ListCampaign,
          listLoading: false,
          listFailed: action.payload,
        }

      };
    case types.SET_CREATEUPDATECAMPAIGN:
      return {
        ...state,
        CreateUpdateCampaign: action.payload
      };
    case types.SET_LISTCAMPAIGN:
      return {
        ...state,
        ListCampaign: action.payload
      };
    case types.SET_ISOPENSAVETOOLBAR:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsOpenSaveToolbar: action.payload,
        }
      };
    case types.SET_ISSAVELOADING:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsSaveLoading: action.payload,
        }
      };
      case types.SET_SETTING:
        return {
          ...state,
          CreateUpdateCampaign: {
            ...state.CreateUpdateCampaign,
            Setting: action.payload.setting,
          }
        };
    case types.SET_LOADING_PAGE:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsLoadingPage: action.payload,
        }
      };
    case types.SAVE_CAMPAIGNCOMPLETED:
      return {
        ...state,
        ListCampaign: {
          ...state.ListCampaign,
          listLoading: false,
          // Paginate: {
          //   Offset: 0,
          //   TotalPage: Math.ceil(action.payload.list.length, moreAppConfig.ItemPerPage),
          //   CurrentItems: [...state.ListCampaign,action.payload.campaign].slice(0, moreAppConfig.ItemPerPage)
          // },
          campaigns: [action.payload.campaign]
        },
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsShowSendSupport: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.IsSuccess ? 'Your campaign is saved successfully.' : action.payload.Message,
          campaign: {
            ...state.CreateUpdateCampaign.campaign,
            ID: action.payload.IsSuccess ? action.payload.campaign.ID : state.CreateUpdateCampaign.campaign.ID,
            Step: action.payload.IsSuccess ? action.payload.campaign.Step : 1
          }
        }
      };
    case types.SAVE_CAMPAIGNFAILED:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsOpenSaveToolbar: false,
          IsShowSendSupport: false,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Message,
        }
      };
    case types.SET_TITLEVALIDATION:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          TitleValidation: action.payload
        }
      }
    case types.SET_STARTTIMEVALIDATION:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          StartTimeValidation: action.payload
        }
      }
    case types.SET_ENDTIMEVALIDATION:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          EndTimeValidation: action.payload
        }
      }
    case types.SET_PRODUCTVALIDATION:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          ProductValidation: action.payload
        }
      }
    case types.SET_TEXTSEARCHPRODUCT:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          TextSearchProduct: action.payload
        }
      }
    case types.SET_TEXTSEARCHPRODUCT:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          TextSearchProduct: action.payload
        }
      }
    case types.SET_STEP:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          campaign: {
            ...state.CreateUpdateCampaign.campaign,
            Step: action.payload
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
