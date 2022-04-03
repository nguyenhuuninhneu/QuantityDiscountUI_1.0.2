import './App.css';
import './assets/css/App.css';
import React, { useEffect, useState } from 'react';
import { Icon, Button, Modal } from '@shopify/polaris';
import { AnalyticsMajor, QuestionMarkMajor } from '@shopify/polaris-icons';
import moreAppConfig from './config/moreAppConfig';
import Loading from './components/plugins/Loading';
import { appOperations } from "./state/modules/app";
import { useSelector, useDispatch } from "react-redux";
import ListCampaign from './components/campaign/ListCampaign';
import CreateUpdateCampaign from './components/campaign/CreateUpdateCampaign';
import { setIsCreatingCampaign, setIsNoCampaign, setMenu, setIsEditCampaign, setNoCallTwices } from './state/modules/app/actions';
import { createCampaign, fetchList } from './state/modules/campaign/operations';
import { setCreateUpdateCampaign } from './state/modules/campaign/actions';
import { setSetting } from './state/modules/setting/actions';
import Dashboard from './components/dashboard/Dashboard';
import Report from './components/dashboard/Report';
import LimitPurchase from './components/limitpurchase/LimitPurchase';
import Plan from './components/plan/Plan';
import Setting from './components/setting/Setting';
import IconSettingsMajor from './assets/images/ico_settings_major.svg';
import IconImagesMajor from './assets/images/ico_images_major.svg';
import IconLimitPurchaseMajor from './assets/images/ico_limit_purchase.svg';
import IconDiscountCodeMajor from './assets/images/ico_discount_code_major.svg';
import IconAnalyticsMajor from './assets/images/ico_analytics_major.svg';
import { getProcess } from './state/modules/app/operations';
import Process from './components/plugins/Process';
import ReactInterval from 'react-interval';
import config from './config/config';



const AppFrame = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const campaignListState = useSelector((state) => state.campaign.ListCampaign);
  const campaignState = useSelector((state) => state.campaign.CreateUpdateCampaign);
  const settingState = useSelector((state) => state.setting.ListSetting);
  const [isShowPopupUpgrade, setIsShowPopupUpgrade] = useState(false);
  const [isShowPopupUpgradeCreateCampaign, setIsShowPopupUpgradeCreateCampaign] = useState(false);
  useEffect(() => {
    dispatch(appOperations.fetchShop());
  }, [dispatch]);
  const setActiveMenu = (menu) => {
    dispatch(setMenu(menu));

    dispatch(setIsEditCampaign(false))
  
    if (menu !== moreAppConfig.Menu.CREATECAMPAIGN) {
      dispatch(setNoCallTwices(false));
      if (campaignListState.TotalCampaign > 0) {
        dispatch(setIsNoCampaign(false))
      }
    }
    window.localStorage.setItem('menu', menu);
  }
  let content = <Loading></Loading>;

  if (appState.IsLoading) {
    content = <Loading></Loading>
  }

  switch (appState.Menu) {
    case moreAppConfig.Menu.DASHBOARD:
      content = <Dashboard></Dashboard>;
      break;
    case moreAppConfig.Menu.REPORT:
      content = <Report></Report>;
      break;
    case moreAppConfig.Menu.MANAGECAMPAIGN:
      content = <ListCampaign></ListCampaign>;
      break;
    case moreAppConfig.Menu.CREATECAMPAIGN:
      content = <CreateUpdateCampaign IsNoCampaign={appState.IsNoCampaign}></CreateUpdateCampaign>
      break;
    case moreAppConfig.Menu.LIMITPURCHASECAMPAIGN:
      content = <LimitPurchase></LimitPurchase>;
      break;
    case moreAppConfig.Menu.PLAN:
      content = <Plan></Plan>;
      break;
    case moreAppConfig.Menu.SETTING:
      content = <Setting></Setting>;
      break;
    default:
      break;
  }
  const loadChatPlugin = () => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/rvxustxuoq2e0mgcep1x1zrt3ynxmkhi.js";
    script.async = true;
    document.body.appendChild(script);

    const script2 = document.createElement("script");
    script2.innerHTML = ` (function() {
    function onTidioChatApiReady() {
      tidioChatApi.setVisitorData({ 
        name: "${config.shop}",  
        tags: ["Tiktok"]
      });
    }
    if (window.tidioChatApi) {
      window.tidioChatApi.on("ready", onTidioChatApiReady);
    } else {
      document.addEventListener("tidioChat-ready", onTidioChatApiReady);
    }
  })();` ;
    document.body.appendChild(script2);

  }
  return (

    <>
      <div style={ (appState.Menu == moreAppConfig.Menu.CREATECAMPAIGN && campaignState.IsOpenSaveToolbar) || (appState.Menu == moreAppConfig.Menu.SETTING && settingState.IsOpenSaveToolbar) ? { marginTop: '65px' } : {}}></div>
      <div className='orichi-quantity-discount'>

        <>
          <div className='menuLeft'>
            <div className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable Polaris-Scrollable--vertical" data-polaris-scrollable="true">
              <ul className="Polaris-Navigation__Section">
                <li className="Polaris-Navigation__ListItem">
                  <div className="Polaris-Navigation__ItemWrapper">
                    <a className="Polaris-Navigation__Item Polaris-Navigation--subNavigationActive" aria-expanded="true" aria-controls="PolarisSecondaryNavigation1" onClick={() => {
                      if (appState.PlanNumber === 0) {
                        setIsShowPopupUpgrade(true)
                      }
                      else {
                        setActiveMenu(moreAppConfig.Menu.DASHBOARD)
                      }
                    }} data-polaris-unstyled="true">
                      <div className="Polaris-Navigation__Icon">
                        <img src={IconAnalyticsMajor} alt="" />
                      </div>
                      <span className="Polaris-Navigation__Text">Dashboard</span>
                    </a>
                  </div>
                  <div className="Polaris-Navigation__SecondaryNavigation Polaris-Navigation--isExpanded">
                    <div id="PolarisSecondaryNavigation1" className="Polaris-Collapsible" aria-expanded="true" style={{ transitionDuration: '0ms', transitionTimingFunction: 'linear', maxHeight: 'none', overflow: 'visible' }}>
                      <ul className="Polaris-Navigation__List">
                        <li className="Polaris-Navigation__ListItem">
                          <div className="Polaris-Navigation__ItemWrapper"><a className={appState.Menu === moreAppConfig.Menu.DASHBOARD ? "Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" : "Polaris-Navigation__Item"} aria-disabled="false" onClick={() => {
                            if (appState.PlanNumber === 1) {
                              setIsShowPopupUpgrade(true)
                            }
                            else {
                              setActiveMenu(moreAppConfig.Menu.DASHBOARD)
                            }
                          }} data-polaris-unstyled="true"><span className="Polaris-Navigation__Text">Dashboard</span></a></div>
                        </li>
                        <li className="Polaris-Navigation__ListItem">
                          <div className="Polaris-Navigation__ItemWrapper"><a className={appState.Menu === moreAppConfig.Menu.REPORT ? "Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" : "Polaris-Navigation__Item"} aria-disabled="false" onClick={() => {
                            if (appState.PlanNumber === 1) {
                              setIsShowPopupUpgrade(true)
                            }
                            else {
                              setActiveMenu(moreAppConfig.Menu.REPORT)
                            }
                          }} data-polaris-unstyled="true"><span className="Polaris-Navigation__Text">Report</span></a></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="Polaris-Navigation__ListItem">
                  <div className="Polaris-Navigation__ItemWrapper">
                    <a className="Polaris-Navigation__Item Polaris-Navigation--subNavigationActive" onClick={() => {
                      if (campaignListState.WholeCampaignNumber >= 5 && appState.PlanNumber === 0) {
                        setIsShowPopupUpgradeCreateCampaign(true)
                      } else {
                        if (appState.NoCallTwiceTime == false) {
                          dispatch(setNoCallTwices(true));
                          setActiveMenu(moreAppConfig.Menu.CREATECAMPAIGN)
                        }
                      }
                    }} aria-expanded="true" aria-controls="PolarisSecondaryNavigation5" data-polaris-unstyled="true">
                      <div className="Polaris-Navigation__Icon">
                        <img src={IconDiscountCodeMajor} alt="" />
                      </div>
                      <span className="Polaris-Navigation__Text">Discount campaign</span>
                    </a>
                  </div>
                  <div className="Polaris-Navigation__SecondaryNavigation Polaris-Navigation--isExpanded">
                    <div id="PolarisSecondaryNavigation5" className="Polaris-Collapsible" aria-expanded="true" style={{ transitionDuration: '0ms', transitionTimingFunction: 'linear', maxHeight: 'none', overflow: 'visible' }}>
                      <ul className="Polaris-Navigation__List">
                        <li className="Polaris-Navigation__ListItem">
                          <div className="Polaris-Navigation__ItemWrapper"><a className={appState.Menu === moreAppConfig.Menu.CREATECAMPAIGN ? "Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" : "Polaris-Navigation__Item"} onClick={() => {

                            if (appState.NoCallTwiceTime == false) {
                              if (campaignListState.WholeCampaignNumber >= 5 && appState.PlanNumber === 0) {
                                setIsShowPopupUpgradeCreateCampaign(true)
                              }
                              else {
                                if (campaignListState.TotalCampaign === 0) {
                                  dispatch(setIsNoCampaign(true))
                                }
                                dispatch(setIsCreatingCampaign(true));
                                dispatch(setIsEditCampaign(false));
                                dispatch(setNoCallTwices(true));
                                dispatch(createCampaign());
                                setActiveMenu(moreAppConfig.Menu.CREATECAMPAIGN);
                              }

                            }
                          }} data-polaris-unstyled="true"><span className="Polaris-Navigation__Text">{appState.IsEditCampaign ? 'Update' : 'Create'} campaign</span></a></div>
                        </li>
                        <li className="Polaris-Navigation__ListItem">
                          <div className="Polaris-Navigation__ItemWrapper">
                            <a className={appState.Menu === moreAppConfig.Menu.MANAGECAMPAIGN ? "Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" : "Polaris-Navigation__Item"} onClick={() => {
                              // if (campaignListState.TotalCampaign === 0) {
                              //   dispatch(setIsNoCampaign(true));
                              //   dispatch(setIsCreatingCampaign(true));
                              //   dispatch(createCampaign());
                              //   // setActiveMenu(moreAppConfig.Menu.CREATECAMPAIGN)
                              // } else {
                              //   dispatch(setIsNoCampaign(false))
                              // }
                              setActiveMenu(moreAppConfig.Menu.MANAGECAMPAIGN)

                            }} data-polaris-unstyled="true">
                              <span className="Polaris-Navigation__Text">Manage campaign</span>
                              <div className="Polaris-Navigation__Badge"><span className="Polaris-Badge Polaris-Badge--statusNew Polaris-Badge--sizeSmall" style={appState.Menu === moreAppConfig.Menu.MANAGECAMPAIGN ? { backgroundColor: '#008060', color: '#fff' } : {}}><>{campaignListState.TotalCampaign}</></span></div>
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className="Polaris-Navigation__ListItem">
                  <div className="Polaris-Navigation__ItemWrapper">
                    <a className={appState.Menu === moreAppConfig.Menu.LIMITPURCHASECAMPAIGN ? "Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" : "Polaris-Navigation__Item"} onClick={() => { setActiveMenu(moreAppConfig.Menu.LIMITPURCHASECAMPAIGN) }} data-polaris-unstyled="true">
                      <div className="Polaris-Navigation__Icon">
                        <img src={IconLimitPurchaseMajor} alt="" />
                      </div>
                      <span className="Polaris-Navigation__Text">Limit purchase campaign</span>
                    </a>
                  </div>
                </li>
                <li className="Polaris-Navigation__ListItem">
                  <div className="Polaris-Navigation__ItemWrapper">
                    <a className={appState.Menu === moreAppConfig.Menu.PLAN ? "Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" : "Polaris-Navigation__Item"} onClick={() => { setActiveMenu(moreAppConfig.Menu.PLAN) }} data-polaris-unstyled="true">
                      <div className="Polaris-Navigation__Icon">
                        <img src={IconImagesMajor} alt="" />
                      </div>
                      <span className="Polaris-Navigation__Text">Plan</span>
                    </a>
                  </div>
                </li>
                <li className="Polaris-Navigation__ListItem">
                  <div className="Polaris-Navigation__ItemWrapper">
                    <a className={appState.Menu === moreAppConfig.Menu.SETTING ? "Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" : "Polaris-Navigation__Item"} onClick={() => { setActiveMenu(moreAppConfig.Menu.SETTING) }} data-polaris-unstyled="true">
                      <div className="Polaris-Navigation__Icon">
                        <img src={IconSettingsMajor} alt="" />
                      </div>
                      <span className="Polaris-Navigation__Text">Settings</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='main-container'>
            <>
              <ReactInterval timeout={500} enabled={appState.DisplayProcess}
                callback={() => { dispatch(getProcess("Create")) }} />
              {
                appState.DisplayProcess ? <Process Process={appState.Process}></Process> : null
              }
              {content}
            </>
          </div>
          <div className='cb'>
          </div>
          <div className='button-support'>
            <Button primary onClick={() => {
              loadChatPlugin();
            }}>
              <>
                <span className='flex flex-align-center'>
                  <Icon
                    source={QuestionMarkMajor}
                    color="white" /> <span className='text'>Support</span>
                </span>
              </>
            </Button>

          </div>

          <Modal
            open={isShowPopupUpgrade}
            onClose={() => {
              setIsShowPopupUpgrade(false)

            }}
            title="This feature is only available in Advance plan. Do you want to upgrade?"
            primaryAction={{
              content: 'Upgrade',
              onAction: () => {
                setIsShowPopupUpgrade(false)
                setActiveMenu(moreAppConfig.Menu.PLAN)
              },
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: () => {
                  setIsShowPopupUpgrade(false)
                },
              },
            ]}
          >

          </Modal>
          <Modal
            open={isShowPopupUpgradeCreateCampaign}
            onClose={() => {
              setIsShowPopupUpgradeCreateCampaign(false)

            }}
            title="You are on the Basic plan with maximum of 5 campaigns. Do you want to upgrade?"
            primaryAction={{
              content: 'Upgrade',
              onAction: () => {
                setIsShowPopupUpgradeCreateCampaign(false)
                setActiveMenu(moreAppConfig.Menu.PLAN)
              },
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: () => {
                  setIsShowPopupUpgradeCreateCampaign(false)
                },
              },
            ]}
          >

          </Modal>
        </>


      </div>
    </>



  );

}
export default AppFrame;	