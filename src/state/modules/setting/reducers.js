import * as types from "./types";

const INITIAL_STATE = {
  ListSetting: {
    IsLoadingPage: true,
    selectedTab: 0,
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
    Setting2: {
      ID: 0,
      ShopID: 0,
      CheckLimitProPage: true,
      CheckLimitCartPage: true,
      TextPurchaseLimit: "Purchase limit",
      TextMinimum: "Minimum",
      TextMaximum: "Maximum",
      TextQuantity: "Quantity",
      TextMinimumLimitText: "You have to choose minimum of {minimum} products",
      TextMaximumLimitText: "You can only choose maximum of {maximum} products",
      TextQuantityMaximumLimitText: "You already have {quantity} of this product in your cart. You can only choose maximum of {maximum} products in total.",
      TextOop: "Oops",
      TextMinMaxRequired: "{product} quantity must be from {minimum} and maximum is {maximum}",
      TextPleaseFix: "Please select a valid number of products before checking out!",
      TextDiscountedPrice: "Discounted price",
      TextUpdateCart: "Update Cart",
      CustomCssAlert: "15",
      CustomJsAlert: "15",
      FontSizeDiscountTitle: "15",
      TextColorDiscountTitle: "#000000",
      TextColorHeading: "#000000",
      BackgroundColorHeading: "#FFFFFF",
      CardTheme: 0,
      FontSizeItemInTable: "15",
      TextColorItemInTable: "#000000",
      BackgroundColorItemInTable: "#FFFFFF",
      TextGet: "get",
      TextOff: "off",
      FontSizeCard: "15",
      TextColorCard: "#000000",
      BackgroundColorCard: "#FFFFFF",
    },
    TotalDiscountCode: 0,
    DiscountDetail: null,
    IsInstall: true,
    IsLoadNewProduct: false,
    ListTheme: [],
    ListCampaign: [],
    ListProduct: [],
    CampaignID: 0,
    ProductID: 0,
    ThemeID: 0,
    Process: 0,
    LoadingDataSync: false,
    DisplayProcess: false,
    ListLayout: [],
    TextCustomCode: '<div class="orichiCampaignCustom" data-productid="0" data-campaignid="0"></div>',
    IsOpenSaveToolbar: false,
    IsSaveLoading: false,
    IsOpenSaveResult: false,
    MessageSaveResult: null,
  },
};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_COMPLETED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsLoadingPage: false,
          Setting: action.payload.setting,
          Setting2: action.payload.setting2,
          ListLayout: action.payload.listLayout,
          // ListCampaign: action.payload.listCampaign,
          // ListProduct: action.payload.listProduct,
          // CampaignID: action.payload.listCampaign.length > 0 ? action.payload.listCampaign[0]?.ID : 0,
          // ProductID: action.payload.listProduct.length > 0 ? action.payload.listProduct[0]?.ProductCode : 0,
          // DiscountDetail: action.payload.discountDetail,
          // TotalDiscountCode: action.payload.discountDetail.length,
        }
      };

    case types.FETCH_FAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsLoadingPage: false,
        }

      };
    case types.FETCH_THEMES_COMPLETED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsLoadingPage: false,
          ListTheme: action.payload.themes,
          ThemeID: action.payload.themes.length > 0 ? action.payload.themes[0].value : 0,
        }
      };

    case types.FETCH_THEMES_FAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsLoadingPage: false,
        }
      };

    case types.SET_SETTING:
      return {
        ...state,
        ListSetting: action.payload
      };
    case types.SET_ISSAVELOADING:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsSaveLoading: action.payload,
        }
      };
    case types.SET_LOADING_PAGE:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsLoadingPage: action.payload,
        }
      };
    case types.SAVE_ACTIVECOMPLETED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Messenger,
        }

      };
    case types.SAVE_ACTIVEFAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveToolbar: false,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Messenger,
        }
      };
    case types.SAVE_SETTINGCOMPLETED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          Setting: action.payload.setting,
          Setting2: action.payload.setting2,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.IsSuccess ? 'Your Setting is saved successfully.' : action.payload.Messenger,
        }

      };
    case types.SAVE_SETTINGFAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveToolbar: false,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Messenger,
        }
      };
    case types.INSTALL_THEME_COMPLETED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Messenger,
        }

      };
    case types.INSTALL_THEME_FAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveToolbar: false,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Messenger,
        }
      };
    case types.UNINSTALL_THEME_COMPLETE:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Messenger,
        }

      };
    case types.UNINSTALL_THEME_FAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveToolbar: false,
          IsSaveLoading: false,
          IsLoadingPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Messenger,
        }
      };
    case types.SET_SELECTED_TAB:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          selectedTab: action.payload,
          IsOpenSaveToolbar: false
        }
      };
    case types.LOAD_PRODUCT_BY_CAMPAIGN_COMPLETED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsLoadNewProduct: false,
          ListProduct: action.payload.listProduct,
          ProductID: 0,
          // ProductID: action.payload.listProduct.length > 0 ? action.payload.listProduct[0].value : 0
        }
      };

    case types.LOAD_PRODUCT_BY_CAMPAIGN_FAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.Messager,
        }

      };
    case types.SET_OPENSAVETOOLBAR:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          IsOpenSaveToolbar: action.payload
        }
      };
    case types.SYNCHRONIZE_DATA_COMPLETED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          LoadingDataSync: action.payload.res,
          DisplayProcess: true,
        }
      };

    case types.SYNCHRONIZE_DATA_FAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          LoadingDataSync: false,
          DisplayProcess: false,
        }

      };
    case types.GET_PROCESS_COMPLETED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          Process: action.payload.process,
          LoadingDataSync: action.payload.displayprocess,
          DisplayProcess: action.payload.displayprocess,
        }
      };

    case types.GET_PROCESS_FAILED:
      return {
        ...state,
        ListSetting: {
          ...state.ListSetting,
          LoadingDataSync: false,
        }

      };
    default:
      return state;
  }
};

export default reducer;
