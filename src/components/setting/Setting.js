import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Card, } from '@shopify/polaris';
import { settingOperations } from "../../state/modules/setting";
import Loading from '../.././components/plugins/Loading';
import General from '../.././components/setting/General';
import DiscountFeature from '../.././components/setting/DiscountFeature';
import LimitPurchaseFeaure from '../.././components/setting/LimitPurchaseFeaure';
import { setSelectedTab } from '../../state/modules/setting/actions';
import '../../assets/css/setting.css'
import { getProcess } from '../../state/modules/setting/operations';
import Process from '../../components/plugins/Process';
import ReactInterval from 'react-interval';

const tabs = [
  {
    id: 'general',
    content: 'General'
  },
  {
    id: 'discountfeature',
    content: 'Discount feature'
  },
  {
    id: 'limitpurchasefeature',
    content: 'Limit purchase feature'
  }
]
function Setting() {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.setting);
  useEffect(() => {
    dispatch(settingOperations.fetchSetting());

  }, [dispatch]);
  let content = <Loading></Loading>;
  switch (settingState.ListSetting.selectedTab) {
    case 0:
      content = <General></General>;
      break;
    case 1:
      content = <DiscountFeature></DiscountFeature>;
      break;
    case 2:
      content = <LimitPurchaseFeaure></LimitPurchaseFeaure>;
      break;
    default:
      content = <General></General>;
      break;
  }
  return (
    settingState.IsLoadingPage ? <Loading></Loading> :
      <>
        <ReactInterval timeout={500} enabled={settingState.ListSetting.DisplayProcess  || settingState.ListSetting.DisplayProcessShopify}
          callback={() => { 
            if (settingState.ListSetting.DisplayProcess) {
              dispatch(getProcess("Update"))
            }
            else if(settingState.ListSetting.DisplayProcessShopify){
              dispatch(getProcess("UpdateDiscountCode"))
            }
            }} />
        {
          settingState.ListSetting.DisplayProcess ? <Process Process={settingState.ListSetting.Process}></Process> : 
          settingState.ListSetting.DisplayProcessShopify ? <Process Process={settingState.ListSetting.Process}></Process> : null
        }
        <Tabs
          tabs={tabs}
          selected={settingState.ListSetting.selectedTab}
          onSelect={(selected) => dispatch(setSelectedTab(selected))}
        >
          <>

            <div className='setting'>
              {content}
            </div>
          </>
        </Tabs>
      </>

  )
}

export default Setting;