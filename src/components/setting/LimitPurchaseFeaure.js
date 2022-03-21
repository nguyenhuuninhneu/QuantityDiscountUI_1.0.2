import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageActions, Card, Layout, Heading, TextStyle, Button, Select, ButtonGroup, TextField, Toast, Icon, DataTable, Stack, Checkbox, ContextualSaveBar } from '@shopify/polaris';
import { DeleteMinor, QuestionMarkMajor, CircleInformationMajor, CircleRightMajor, ViewMinor, ConfettiMajor } from '@shopify/polaris-icons';
import Loading from '../../components/plugins/Loading';
import { setSetting } from '../../state/modules/setting/actions';
import { saveSetting } from '../../state/modules/setting/operations';

function LimitPurchaseFeature() {
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.setting.ListSetting);

  const validateNumber = (e) => {
    if (isNaN(e)) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      {
        settingState.IsLoadingPage ? <Loading></Loading>
          :
          <div className='limit-purchase-feature'>
            <div className="product-page">
              <div className='colLeft'>
                <div className='section product-page'>
                  <Layout>
                    <Layout.Section oneThird>
                      <Card>
                        <Card.Section>
                          <Heading size="small">1. Status</Heading>
                          <div className='element-general'>
                            <div className="break-line"></div>
                            <Stack>
                              <Checkbox
                                label="Check limit on product page"
                                checked={settingState.Setting2.CheckLimitProPage}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting2: {
                                      ...settingState.Setting2,
                                      CheckLimitProPage: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))

                                }}
                              />
                            </Stack>
                            <div className="break-line"></div>
                            <Stack>
                              <Checkbox
                                label="Check limit on cart page"
                                checked={settingState.Setting2.CheckLimitCartPage}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting2: {
                                      ...settingState.Setting2,
                                      CheckLimitCartPage: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))

                                }}
                              />
                            </Stack>
                          </div>

                        </Card.Section>
                      </Card>
                    </Layout.Section>
                  </Layout>
                </div>
              </div>
              <div className='cb'>
              </div>
            </div>
            <div className="product-page">
              <div className='colLeft'>
                <div className='section product-page'>
                  <Layout>
                    <Layout.Section oneThird>
                      <Card>
                        <Card.Section>
                          <Heading size="small">2. Limit table</Heading>
                          <div className='element-general'>
                            <div className="break-line"></div>
                            <p className='only-text'>Replace the default text on limit table:</p>
                            <div className='group-fill-text'>
                              <div className='item'>
                                <div className='col col1'>
                                  “Purchase limit”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='Purchase limit'
                                    value={settingState.Setting2.TextPurchaseLimit}
                                    onChange={(e) => {
                                      // var newRows = rowsPreview.map((p, i) =>
                                      //   (i == index ? { ...p, Quantity: e } : p)
                                      // )
                                      // setRowPreview(newRows);
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextPurchaseLimit: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div>
                              <div className='item'>
                                <div className='col col1'>
                                  “Minimum”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='Minimum'
                                    value={settingState.Setting2.TextMinimum}
                                    onChange={(e) => {
                                      // var newRows = rowsPreview.map((p, i) =>
                                      //   (i == index ? { ...p, Quantity: e } : p)
                                      // )
                                      // setRowPreview(newRows);
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextMinimum: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div>
                              <div className='item'>
                                <div className='col col1'>
                                  “Maximum”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='Maximum'
                                    value={settingState.Setting2.TextMaximum}
                                    onChange={(e) => {
                                      // var newRows = rowsPreview.map((p, i) =>
                                      //   (i == index ? { ...p, Quantity: e } : p)
                                      // )
                                      // setRowPreview(newRows);
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextMaximum: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div>
                              <div className='item'>
                                <div className='col col1'>
                                  “Quantity”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='Quantity'
                                    value={settingState.Setting2.TextQuantity}
                                    onChange={(e) => {
                                      // var newRows = rowsPreview.map((p, i) =>
                                      //   (i == index ? { ...p, Quantity: e } : p)
                                      // )
                                      // setRowPreview(newRows);
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextQuantity: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div>
                              {/* <div className='item'>
                                <div className='col col1'>
                                  “You should add...”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='You should add quantity larger or equal minimum'
                                    value={settingState.Setting2.TextMinimumLimitText}
                                    onChange={(e) => {
                                      // var newRows = rowsPreview.map((p, i) =>
                                      //   (i == index ? { ...p, Quantity: e } : p)
                                      // )
                                      // setRowPreview(newRows);
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextMinimumLimitText: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div>
                              <div className='item'>
                                <div className='col col1'>
                                  “You should add...”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='You should add quantity smaller or equal minimum'
                                    value={settingState.Setting2.TextMaximumLimitText}
                                    onChange={(e) => {
                                      // var newRows = rowsPreview.map((p, i) =>
                                      //   (i == index ? { ...p, Quantity: e } : p)
                                      // )
                                      // setRowPreview(newRows);
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextMaximumLimitText: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div> */}
                            </div>

                          </div>

                        </Card.Section>
                      </Card>
                    </Layout.Section>
                  </Layout>
                </div>
              </div>
              <div className='colRight'>
                <div className='section section-preview bg-fff'>
                  <div className='preview'>
                    <h2 className="Polaris-Heading Heading-Icon Heading-Preview"> <Icon source={ViewMinor} color='base'></Icon> How will it look on your product page
                    </h2>
                    <div className='bg-bound'>
                      <div className='preview-table'>
                        <h2 className="Polaris-Heading Heading-Bottom-10 Heading-Icon-Right"> {settingState.Setting2.TextPurchaseLimit}
                        </h2>
                        <Card>
                          <div className="item-center">
                            <DataTable
                              columnContentTypes={[
                                'text',
                                'text'
                              ]}
                              headings={[
                                settingState.Setting2.TextMinimum,
                                settingState.Setting2.TextMaximum
                              ]}
                              rows={
                                [['3', '5']]
                              }
                            />
                          </div>
                        </Card>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className='cb'>
              </div>
            </div>
            <div className="alert-cart-page">
              <div className='colLeft'>
                <div className='section cart-page'>
                  <Layout>
                    <Layout.Section oneThird>
                      <Card>
                        <Card.Section>
                          <Heading size="small">3. Alert text</Heading>
                          <div className='element-general'>
                            <div className="break-line"></div>
                            <p className='only-text'>Alert text when customer choose more than maximum:</p>
                            <div className='group-fill-text'>
                              <div className='item'>
                                <div className='col col1'>
                                “You can only choose maximum of {"{maximum}"} products”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='“You can only choose maximum of {maximum} products”'
                                    value={settingState.Setting2.TextMaximumLimitText}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextMaximumLimitText: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                    multiline={2}
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='element-general'>
                            <div className="break-line"></div>
                            <p className='only-text'>Alert text when customer choose less than minimum:</p>
                            <div className='group-fill-text'>
                              <div className='item'>
                                <div className='col col1'>
                                “You can only choose minimum of {"{minimum}"} products”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='“You can only choose minimum of {minimum} products”'
                                    value={settingState.Setting2.TextMinimumLimitText}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextMinimumLimitText: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                    multiline={2}
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='element-general'>
                            <div className="break-line"></div>
                            <p className='only-text'>Alert text when customer choose within the allowed range but total product in cart exceeds maximum:</p>
                            <div className='group-fill-text'>
                              <div className='item'>
                                <div className='col col1'>
                                “You already have {"{quantity}"} of this product in your cart. You can only choose maximum of {"{maximum}"} products in total. ”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='“You already have {quantity} of this product in your cart. You can only choose maximum of {maximum} products in total”'
                                    value={settingState.Setting2.TextQuantityMaximumLimitText}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextQuantityMaximumLimitText: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                    multiline={4}
                                  />
                                </div>
                                <div className='cb'>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card.Section>
                      </Card>
                    </Layout.Section>
                  </Layout>
                </div>
              </div>
              {/* <div className='colRight'>
                <div className='section section-preview bg-fff'>
                  <div className='preview'>
                    <h2 className="Polaris-Heading Heading-Icon Heading-Preview"> <Icon source={ViewMinor} color='base'></Icon> How will the alert look
                    </h2>
                    <div className='bg-bound'>
                      <div className='preview-table'>
                        <Card>
                          <div className="item-center">
                            <DataTable
                              columnContentTypes={[
                                'text',
                              ]}
                              headings={[
                                settingState.Setting2.TextOop
                              ]}
                              rows={
                                [
                                  [<>
                                    <p>{settingState.Setting2.TextMinMaxRequired}</p>
                                    <p>{settingState.Setting2.TextPleaseFix}</p>
                                    <p className='update-cart'>
                                      <Button primary onClick={() => {

                                      }}>{settingState.Setting2.TextUpdateCart}</Button>
                                    </p>
                                  </>]
                                ]
                              }
                            />
                          </div>
                        </Card>

                      </div>

                    </div>
                  </div>
                </div>
              </div> */}
              <div className='cb'>
              </div>
            </div>
          </div>
      }
      {settingState.IsOpenSaveToolbar ?
        <div className='head'>
          <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
              content: "Save settings",
              onAction: () => {
                dispatch(saveSetting())
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
              dispatch(saveSetting())
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

export default LimitPurchaseFeature