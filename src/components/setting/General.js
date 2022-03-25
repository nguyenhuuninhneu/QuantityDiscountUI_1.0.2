import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageActions, Card, Layout, Heading, TextStyle, Button, ButtonGroup, TextField, Toast, ContextualSaveBar, Spinner, Icon } from '@shopify/polaris';
import { CircleInformationMajor } from '@shopify/polaris-icons';
import Loading from '../../components/plugins/Loading';
import { setSetting } from '../../state/modules/setting/actions';
import { saveActive, loadProductByCampaign, synchronizeData } from '../../state/modules/setting/operations';
import Select from 'react-select';
import config from '../../config/config';
import axios from 'axios';



function General() {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const settingState = useSelector((state) => state.setting.ListSetting);
  const getCampaign = async (input) => {
    await axios.get(config.rootLink + '/FrontEnd/SearchCampaignPaginateSetting', {
      params: {
        search: input,
        shopID: appState?.Shop.ID,
        shop: appState?.Shop.Domain,
        page: 1,
        pagezise: 100
      }
    })
      .then((res) => {
        const result = res?.data;
        dispatch(setSetting({
          ...settingState,
          IsLoadNewProduct: false,
          ListCampaign: result.campaigns,
          CampaignID: 0,
          // CampaignID: result.campaigns.length > 0 ? result.campaigns[0].value : 0
        }))

      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getCampaign('');
  }, [dispatch]);

  return (
    <>
      {
        settingState.IsLoadingPage ? <Loading></Loading>
          :
          <>

            <div className='section general'>
              <div className='activate'>
                <div className="Polaris-Card" style={{ backgroundColor: '#EBF9FC', marginTop: '15px', marginBottom: '15px' }}>
                  <div className="Polaris-CalloutCard__Container">
                    <div className="Polaris-Card__Section">
                      <div className="Polaris-CalloutCard">
                        <div className="Polaris-CalloutCard__Content">
                          <div className="Polaris-CalloutCard__Title">
                            <h2 className="Polaris-Heading Heading-Icon"> <Icon source={CircleInformationMajor} color='red'></Icon> Activate app in the Shopify Editor
                            </h2>
                          </div>
                          <div className="Polaris-TextContainer">
                            <p>Our Quantity Discount app uses the new Shopify app embed feature. This can sometimes be disabled so you will have to verify this is toggled on before using the app.</p>
                          </div>
                          <div className="Polaris-CalloutCard__Buttons">
                            <Button primary={false} onClick={() => {
                            }}>Enable app embed</Button>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Layout>
                <Layout.Section oneThird>
                  <Card>
                    <Card.Section>
                      <Heading size="small">1. General</Heading>
                      <div className='element-general'>
                        <div className='colLeft'>
                          <p className='ptb8'>
                            App status
                          </p>
                          {
                            settingState.Setting.Active ?
                              <>
                                <ButtonGroup>
                                  <Button primary onClick={() => {
                                    dispatch(setSetting({
                                      ...settingState,
                                      Setting: {
                                        ...settingState.Setting,
                                        Active: true
                                      },
                                      IsOpenSaveToolbar: true
                                    }))
                                  }}>Enable</Button>
                                  <Button onClick={() => {
                                    dispatch(setSetting({
                                      ...settingState,
                                      Setting: {
                                        ...settingState.Setting,
                                        Active: false
                                      },
                                      IsOpenSaveToolbar: true
                                    }))
                                  }}>Disable</Button>

                                </ButtonGroup>

                              </>
                              :
                              <>
                                <ButtonGroup>
                                  <Button onClick={() => {
                                    dispatch(setSetting({
                                      ...settingState,
                                      Setting: {
                                        ...settingState.Setting,
                                        Active: true
                                      },
                                      IsOpenSaveToolbar: true
                                    }))
                                  }}>Enable</Button>
                                  <Button primary onClick={() => {
                                    dispatch(setSetting({
                                      ...settingState,
                                      Setting: {
                                        ...settingState.Setting,
                                        Active: false
                                      },
                                      IsOpenSaveToolbar: true
                                    }))
                                  }}>Disable</Button>

                                </ButtonGroup>
                              </>
                          }



                        </div>
                        <div className='colRight'>
                          <p className='ptb8'>
                            Synchronize data to app
                          </p>
                          <Button
                            disabled={settingState.LoadingDataSync}
                            primary
                            onClick={() => {
                              dispatch(synchronizeData());
                            }}>Synchronize data</Button>

                        </div>
                        <div className='cb'>
                        </div>
                      </div>

                    </Card.Section>
                  </Card>
                </Layout.Section>
              </Layout>
            </div>
            {/* <div className='section install-uninstall'>
              <Layout>
                <Layout.Section oneThird>
                  <Card>
                    <Card.Section>
                      <Heading size="small">2. Install & uninstall theme</Heading>
                      <div className='element-general'>
                        <div className='colLeft'>
                          <p className='ptb8'>
                            Using settings for theme
                          </p>
                          <div className='itemLeft'>
                            <Select
                              options={settingState.ListTheme}
                              defaultValue={settingState.ListTheme[0]}
                              onChange={(e) => {
                                dispatch(setSetting({
                                  ...settingState,
                                  ThemeID: e.value,
                                  IsInstall: true,
                                }))
                              }}
                              isSearchable={false}
                            // value={parseInt(settingState.ThemeID)}
                            />
                          </div>
                          <div className='itemRight'>
                            <Button onClick={() => {
                              if (settingState.IsInstall) {
                                dispatch(installTheme())
                              } else {
                                dispatch(uninstallTheme())
                              }
                            }}>{settingState.IsInstall ? "Install" : "Uninstall"}</Button>
                          </div>
                          <div className='cb'>
                          </div>
                        </div>

                        <div className='cb'>
                        </div>
                      </div>

                    </Card.Section>
                  </Card>
                </Layout.Section>
              </Layout>
            </div> */}
            <div className='section custom-rule'>
              <Layout>
                <Layout.Section oneThird>
                  <Card>
                    <Card.Section>
                      <Heading size="small">2. Custom display rule anywhere</Heading>
                      <div className='element-general'>
                        <div className='colLeft'>
                          <div className='itemLeft'>
                            Campaign
                          </div>
                          <div className='itemRight'>
                            <Select
                              name="form-field-name"
                              options={settingState.ListCampaign}
                              onSearch={getCampaign}
                              loadOptions={getCampaign}
                              onChange={(e) => {
                                dispatch(setSetting({
                                  ...settingState,
                                  CampaignID: e.value,
                                  IsLoadNewProduct: true
                                  // ListProduct: settingState.ListCampaign.filter(p => p.ID == parseInt(e))[0].ListProducts
                                }))
                                dispatch(loadProductByCampaign(e.value));
                              }}
                              isSearchable={true}
                              //value={settingState.CampaignID}
                              value={settingState.ListCampaign != null && settingState.CampaignID != 0 && settingState.ListCampaign.filter(p => p.value == settingState.CampaignID)[0] || settingState.ListCampaign != null && settingState.ListCampaign[0]}
                            />
                          </div>
                          <div className='cb'>
                          </div>
                          <div className='itemLeft'>
                            Product
                          </div>
                          <div className='itemRight'>
                            <div className='relative'>
                              <Select
                                disabled={settingState.IsLoadNewProduct}
                                options={settingState.ListProduct}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    ProductID: e.value
                                  }))
                                }}
                                isSearchable={false}
                              // value={parseInt(settingState.ProductID)}
                              />
                              {
                                settingState.IsLoadNewProduct ?
                                  <>
                                    <div className="spinner">
                                      <Spinner accessibilityLabel="Small spinner example" size="small" />
                                    </div>
                                  </>
                                  : <></>
                              }
                            </div>

                          </div>
                          <div className='cb'>
                          </div>
                          <div className='itemLeft'>
                            Custom code
                          </div>
                          <div className='itemRight'>
                            <TextField
                              placeholder=""
                              value={'<div class="orichiCampaignCustom" data-productid="' + settingState.ProductID + '" data-campaignid="' + settingState.CampaignID + '"></div>'}
                              onChange={(e) => { }}
                              autoComplete="off"
                              multiline={4}
                            />
                          </div>
                          <div className='cb'>
                          </div>
                        </div>

                        <div className='cb'>
                        </div>

                      </div>

                    </Card.Section>
                  </Card>
                </Layout.Section>
              </Layout>
            </div>
          </>
      }
      {settingState.IsOpenSaveToolbar ?
        <div className='head'>
          <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              content: "Save settings",
              onAction: () => {
                dispatch(saveActive());
              },
              loading: settingState.IsSaveLoading,
            }}
            discardAction={{
              content: "Discard",
              onAction: () => {
                dispatch(setSetting({
                  ...settingState,
                  IsOpenSaveToolbar: false
                }))
              },
            }}
          />
        </div>
        : <></>}
      {settingState.IsOpenSaveToolbar ? <>
        <PageActions
          primaryAction={{
            content: 'Save settings',
            onAction: () => {
              dispatch(saveActive());
            },
            loading: settingState.IsSaveLoading
          }}
          secondaryActions={[
            {
              content: 'Discard',
              onAction: () => {
                dispatch(setSetting({
                  ...settingState,
                  IsOpenSaveToolbar: false
                }))
              },
            },
          ]}
        />
      </> :
        <></>
      }
      {settingState.IsOpenSaveResult ? <Toast content={settingState.MessageSaveResult} duration={4000} onDismiss={() => {
        dispatch(setSetting({
          ...settingState,
          IsOpenSaveResult: null
        }))
      }} /> : null}


    </>
  )
}

export default General