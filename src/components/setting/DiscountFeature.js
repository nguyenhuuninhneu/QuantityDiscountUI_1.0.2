import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageActions, Card, Layout, Heading, TextStyle, Button, ButtonGroup, TextField, Toast, Icon, DataTable, Stack, Checkbox, ContextualSaveBar, Modal } from '@shopify/polaris';
import { DeleteMinor, QuestionMarkMajor, CircleInformationMajor, CircleRightMajor, ViewMinor, ConfettiMajor } from '@shopify/polaris-icons';
import Loading from '../../components/plugins/Loading';
import { setSetting } from '../../state/modules/setting/actions';
import { saveSetting, fetchSetting } from '../../state/modules/setting/operations';
import Select from 'react-select';
import CardOrange from '../../assets/images/card-orange.svg';



function DiscountFeature() {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  const settingState = useSelector((state) => state.setting.ListSetting);

  const dataRowPreview = [
    ['3', '10', '270'],
    ['4', '15', '320'],
    ['5', '20', '350']
  ]
  const [rowsPreview, setRowPreview] = useState(dataRowPreview);
  const [isOpenDiscountCode, setIsOpenDiscountCode] = useState(false);


  const validateNumber = (e) => {
    if (isNaN(e)) {
      return false;
    } else {
      return true;
    }
  }
  const handleSelectLayoutType = (value) => {
    dispatch(setSetting({
      ...settingState,
      Setting: {
        ...settingState.Setting,
        LayoutInProductPage: value.value
      },
      IsOpenSaveToolbar: true
    }))
  };
  return (
    <>
      {
        settingState.IsLoadingPage ? <Loading></Loading>
          :
          <>
            <div className='discount-feature'>
              <div className='colLeft'>
                <div className='section product-page'>
                  <Layout>
                    <Layout.Section oneThird>
                      <Card>
                        <Card.Section>
                          <Heading size="small">1. Product page</Heading>
                          <div className='element-general'>
                            <div className="break-line"></div>
                            <Stack>
                              <Checkbox
                                label="Show discount in product page"
                                checked={settingState.Setting.ShowDiscountProductPage}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting: {
                                      ...settingState.Setting,
                                      ShowDiscountProductPage: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))

                                }}
                              />
                            </Stack>
                            <div className="break-line"></div>
                            <Stack>
                              <Checkbox
                                label="Show description"
                                checked={settingState.Setting.ShowDescription}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting: {
                                      ...settingState.Setting,
                                      ShowDescription: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))

                                }}
                              />
                            </Stack>
                            <p className='only-text'>Layout in product page</p>
                            <Select
                              // label="Discount based on"
                              options={settingState.ListLayout}
                              onChange={(value) => {

                                handleSelectLayoutType(value);
                              }}
                              isSearchable={false}
                              value={settingState.ListLayout.filter(p => p.value == settingState.Setting.LayoutInProductPage)[0] || settingState.ListLayout[0]}
                            />

                            <div className="break-line"></div>
                            {
                              settingState.Setting.LayoutInProductPage === 3 ? <>

                              </>
                                : <>
                                  <Stack>
                                    <Checkbox
                                      label={"Show " + (settingState.Setting.LayoutInProductPage === 1 ? 'row' : 'column') + " “Discounted price”"}
                                      checked={settingState.Setting.ShowDiscountedPrice}
                                      onChange={(e) => {
                                        dispatch(setSetting({
                                          ...settingState,
                                          Setting: {
                                            ...settingState.Setting,
                                            ShowDiscountedPrice: e,
                                          },
                                          IsOpenSaveToolbar: true
                                        }))

                                      }}
                                    />
                                  </Stack>
                                </>
                            }

                            <p className='only-text'>Replace the default text:</p>

                            <div className='group-fill-text'>
                              <div className='item'>
                                <div className='col col1'>
                                  “🔥 Buy more, save more! 🔥”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='🔥 Buy more, save more! 🔥'
                                    value={settingState.Setting.TextQuantityBreaks}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          TextQuantityBreaks: e,
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
                                    value={settingState.Setting.TextQuantity}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
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
                              <div className='item'>
                                <div className='col col1'>
                                  “Discount”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='Discount'
                                    value={settingState.Setting.TextDiscount}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          TextDiscount: e,
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
                                  “Discounted price”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='Discounted price'
                                    value={settingState.Setting.TextDiscountPrice}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          TextDiscountPrice: e,
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
                                  “+”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='+'
                                    value={settingState.Setting.TextPlus}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          TextPlus: e,
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
                                  “price”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='price'
                                    value={settingState.Setting.TextPrice}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          TextPrice: e,
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
                                  “Buy”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='Buy'
                                    value={settingState.Setting.TextBuy}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          TextBuy: e,
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
                                  “Each”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    placeholder='Each'
                                    value={settingState.Setting.TextEach}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          TextEach: e,
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
                            </div>

                            <div className='group-col-half'>
                              {
                                settingState.Setting.LayoutInProductPage === 3 ? <></> : <>
                                  <div className='item'>
                                    <div className='itemLeft'>
                                      <p className='title'>Font size discount title</p>
                                      <TextField
                                        placeholder='Font size heading table'
                                        value={settingState.Setting.TableFontSizeHeading.toString()}
                                        onChange={(e) => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting: {
                                              ...settingState.Setting,
                                              TableFontSizeHeading: e == '' ? '0' : validateNumber(e.trim()) ? e.trim() : "0",
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }}
                                        type="number"
                                        min={0}
                                      />
                                    </div>
                                    {/* <div className='itemRight'>
                                  <p className='title'>Width layout</p>
                                  <TextField
                                    placeholder='Width layout'
                                    value={settingState.Setting.WidthLayout.toString()}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          WidthLayout: e == '' ? '0' : validateNumber(e.trim()) ? e.trim() : "0",
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="number"
                                    min={0}
                                  />
                                </div> */}
                                    <div className='cb'>

                                    </div>
                                  </div>
                                  <div className='item'>
                                    <div className='itemLeft'>
                                      <p className='title'>Padding table</p>
                                      <TextField
                                        placeholder='Padding table'
                                        value={settingState.Setting.TablePadding.toString()}
                                        onChange={(e) => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting: {
                                              ...settingState.Setting,
                                              TablePadding: e == '' ? '0' : validateNumber(e.trim()) ? e.trim() : "0",
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }}
                                        type="number"
                                        min={0}
                                      />
                                    </div>
                                    <div className='itemRight'>
                                      <p className='title'>Border size table</p>
                                      <TextField
                                        placeholder='Border size table'
                                        value={settingState.Setting.TableBorderSize.toString()}
                                        onChange={(e) => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting: {
                                              ...settingState.Setting,
                                              TableBorderSize: e == '' ? '0' : validateNumber(e.trim()) ? e.trim() : "0",
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }}
                                        type="number"
                                        min={0}
                                      />
                                    </div>
                                    <div className='cb'>

                                    </div>
                                  </div>
                                </>
                              }

                              <div className='item'>
                                <div className='itemLeft'>
                                  <p className='title'>Custom css</p>
                                  <TextField
                                    placeholder=''
                                    value={settingState.Setting.CustomCssProductPage}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          CustomCssProductPage: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                    multiline={4}
                                  />
                                </div>
                                <div className='itemRight'>
                                  <p className='title'>Custom js</p>
                                  <TextField
                                    placeholder=''
                                    value={settingState.Setting.CustomJsProductPage}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          CustomJsProductPage: e,
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
                <div className='section cart-page'>
                  <Layout>
                    <Layout.Section oneThird>
                      <Card>
                        <Card.Section>
                          <Heading size="small">2. Cart page</Heading>
                          <div className='element-general'>
                            {/* <Stack>
                              <Checkbox
                                label="Use ajax cart"
                                checked={settingState.Setting.UseAjaxCart}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting: {
                                      ...settingState.Setting,
                                      UseAjaxCart: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))

                                }}
                              />
                            </Stack>
                            */}
                            <div className="break-line"></div>
                            <Stack>
                              <Checkbox
                                label="Show notification on cart page"
                                checked={settingState.Setting.ShowNotiOnCart}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting: {
                                      ...settingState.Setting,
                                      ShowNotiOnCart: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))

                                }}
                              />
                            </Stack>
                            <div className='element-general-child'>
                              <p className='only-text'>Text notification on cart page</p>
                              <TextField
                                placeholder='Buy {Quantity} + discount {Percent or price}'
                                value={settingState.Setting.TextNotiOnCart}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting: {
                                      ...settingState.Setting,
                                      TextNotiOnCart: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))
                                }}
                                type="text"
                              />
                            </div>
                            <div className="break-line"></div>
                            <Stack>
                              <Checkbox
                                label="Use discount code on cart page"
                                checked={settingState.Setting.UseDiscountCodeOnCart}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting: {
                                      ...settingState.Setting,
                                      UseDiscountCodeOnCart: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))

                                }}
                              />
                            </Stack>
                            <div className="break-line"></div>
                            <div className='element-general-child'>
                              <Button primary onClick={() => {

                              }}>Sync discounts from Shopify</Button>
                              <div className="break-line"></div>
                              <div className="flex flex-align-center">
                                <span className="mr-10"> Total: {settingState.TotalDiscountCode} discount codes</span> <Button onClick={() => {
                                  setIsOpenDiscountCode(true);

                                }}>Detail</Button>
                              </div>
                              <div className="break-line"></div>
                              <p className='only-text'>Discount code prefix</p>
                              <TextField
                                placeholder=''
                                value={settingState.Setting.DisCountCodePrefix}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting: {
                                      ...settingState.Setting,
                                      DisCountCodePrefix: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))
                                }}
                                type="text"
                              />
                              <div className="break-line"></div>
                            </div>

                            <Stack>
                              <Checkbox
                                label="Use upsale on cart page"
                                checked={settingState.Setting.UseUpdateOnCartPage}
                                onChange={(e) => {
                                  dispatch(setSetting({
                                    ...settingState,
                                    Setting: {
                                      ...settingState.Setting,
                                      UseUpdateOnCartPage: e,
                                    },
                                    IsOpenSaveToolbar: true
                                  }))

                                }}
                              />
                            </Stack>
                            <div className="break-line"></div>
                            <div className='group-col-half'>
                              <div className='item'>
                                <div className='itemLeft'>
                                  <p className='title'>Custom css</p>
                                  <div className="break-line"></div>
                                  <TextField
                                    placeholder='Custom css'
                                    value={settingState.Setting.CustomCssCart}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          CustomCssCart: e,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="text"
                                    multiline={4}
                                  />
                                </div>
                                <div className='itemRight'>
                                  <p className='title'>Custom js</p>
                                  <div className="break-line"></div>
                                  <TextField
                                    placeholder='Custom js'
                                    value={settingState.Setting.CustomJsCart}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting: {
                                          ...settingState.Setting,
                                          CustomJsCart: e,
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
              <div className='colRight'>
                <div className='section section-preview bg-fff'>
                  <div className='preview'>
                    <h2 className="Polaris-Heading Heading-Icon Heading-Preview"> <Icon source={ViewMinor} color='base'></Icon> How will it look on your product page
                    </h2>
                    <div className='bg-bound'>
                      <div className='preview-table'>
                        <h2 className="Polaris-Heading Heading-Bottom-10 Heading-Icon-Right"> {settingState.Setting.TextQuantityBreaks}
                          {/* <Icon source={ConfettiMajor} color='base'></Icon> */}

                        </h2>
                        <Card>
                          {
                            settingState.Setting.LayoutInProductPage === 4 ? <>
                              <div className=""><div className="Polaris-DataTable__Navigation">
                                <button className="Polaris-Button Polaris-Button--disabled Polaris-Button--plain Polaris-Button--iconOnly" aria-label="" type="button" disabled=""><span className="Polaris-Button__Content">
                                  <span className="Polaris-Button__Icon"><span className="Polaris-Icon"><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M12 16a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L8.414 10l4.293 4.293A.999.999 0 0 1 12 16z"></path></svg></span></span></span></button><button className="Polaris-Button Polaris-Button--plain Polaris-Button--iconOnly" aria-label="" type="button"><span className="Polaris-Button__Content"><span className="Polaris-Button__Icon"><span className="Polaris-Icon"><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M8 16a.999.999 0 0 1-.707-1.707L11.586 10 7.293 5.707a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5A.997.997 0 0 1 8 16z"></path></svg></span></span></span></button></div><div className="Polaris-DataTable"><div className="Polaris-DataTable__ScrollContainer">
                                    <table className="Polaris-DataTable__Table" style={{ padding: settingState.Setting.TablePadding + 'px', border: settingState.Setting.TableBorderSize + 'px solid #fff' }}>
                                      <thead style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px' }}>
                                        <tr>
                                          <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header" scope="col">{settingState.Setting.TextQuantity}</th>
                                          <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col">{settingState.Setting.TextDiscount}</th>

                                          {
                                            settingState.Setting.ShowDiscountedPrice ? <>
                                              <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col">{settingState.Setting.TextDiscountPrice}</th>
                                            </> : <></>
                                          }
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          rowsPreview.map((item, index) => {
                                            return (
                                              <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                                <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn" scope="row">{settingState.Setting.TextBuy + ' ' + item[0] + settingState.Setting.TextPlus}</th>
                                                <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">{item[1] + '%'}</td>
                                                {
                                                  settingState.Setting.ShowDiscountedPrice ? <>
                                                    <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">{'$' + item[2]}</td>
                                                  </> : <></>
                                                }

                                              </tr>
                                            )
                                          })
                                        }

                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </> :
                              settingState.Setting.LayoutInProductPage === 1 ? <>
                                <div className=""><div className="Polaris-DataTable__Navigation">
                                  <button className="Polaris-Button Polaris-Button--disabled Polaris-Button--plain Polaris-Button--iconOnly" aria-label="" type="button" disabled=""><span className="Polaris-Button__Content">
                                    <span className="Polaris-Button__Icon"><span className="Polaris-Icon"><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M12 16a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L8.414 10l4.293 4.293A.999.999 0 0 1 12 16z"></path></svg></span></span></span></button><button className="Polaris-Button Polaris-Button--plain Polaris-Button--iconOnly" aria-label="" type="button"><span className="Polaris-Button__Content"><span className="Polaris-Button__Icon"><span className="Polaris-Icon"><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M8 16a.999.999 0 0 1-.707-1.707L11.586 10 7.293 5.707a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5A.997.997 0 0 1 8 16z"></path></svg></span></span></span></button></div><div className="Polaris-DataTable"><div className="Polaris-DataTable__ScrollContainer">
                                      <table className="Polaris-DataTable__Table" style={{ padding: settingState.Setting.TablePadding + 'px', border: settingState.Setting.TableBorderSize + 'px solid #fff' }}>

                                        <tbody>
                                          <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                            <th style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px' }} data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">{settingState.Setting.TextQuantity}</th>
                                            <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn" scope="row">{settingState.Setting.TextBuy + ' ' + rowsPreview[0][0] + settingState.Setting.TextPlus}</th>
                                            <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn" scope="row">{settingState.Setting.TextBuy + ' ' + rowsPreview[1][0] + settingState.Setting.TextPlus}</th>
                                            <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn" scope="row">{settingState.Setting.TextBuy + ' ' + rowsPreview[2][0] + settingState.Setting.TextPlus}</th>
                                          </tr>
                                          <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                            <th style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px' }} data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">{settingState.Setting.TextDiscount}</th>
                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">{rowsPreview[0][1] + '%'}</td>
                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">{rowsPreview[1][1] + '%'}</td>
                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">{rowsPreview[2][1] + '%'}</td>
                                          </tr>
                                          {
                                            settingState.Setting.ShowDiscountedPrice ? <>
                                              <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                                <th style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px' }} data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">{settingState.Setting.TextDiscountPrice}</th>
                                                <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">{'$' + rowsPreview[0][2]}</td>
                                                <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">{'$' + rowsPreview[1][2]}</td>
                                                <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">{'$' + rowsPreview[2][2]}</td>
                                              </tr>

                                            </> : <></>
                                          }



                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </>

                                :
                                <>

                                </>
                          }
                        </Card>
                        {

                          settingState.Setting.LayoutInProductPage == 3 ? <>

                            <div className="Polaris-CalloutCard__Buttons" style={{ display: 'flex' }}>
                              <div className='card-orange'>
                                <img src={CardOrange} alt="" style={{ marginLeft: '0' }} className="Polaris-CalloutCard__Image" />
                                <p className="buy">Buy {rowsPreview[0][0]}+</p>
                                <p className="get">get</p>
                                <p className="off">{rowsPreview[0][1]}% off</p>
                              </div>
                              <div className='card-orange'>
                                <img src={CardOrange} alt="" style={{ marginLeft: '0' }} className="Polaris-CalloutCard__Image" />
                                <p className="buy">Buy {rowsPreview[1][0]}+</p>
                                <p className="get">get</p>
                                <p className="off">{rowsPreview[1][1]}% off</p>
                              </div>
                              <div className='card-orange'>
                                <img src={CardOrange} alt="" style={{ marginLeft: '0' }} className="Polaris-CalloutCard__Image" />
                                <p className="buy">Buy {rowsPreview[2][0]}+</p>
                                <p className="get">get</p>
                                <p className="off">{rowsPreview[2][1]}% off</p>
                              </div>
                            </div>
                          </>
                            : <></>
                        }
                        {settingState.Setting.ShowDescription ? <>
                          <p style={{ marginTop: '10px' }}>This discount is applied to the total quantity of products in your cart</p>

                        </> : <></>}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className='cb'>

              </div>
            </div>
          </>
      }
      <>
        <div className='modal-order-detail item-center'>
          <Modal
            open={isOpenDiscountCode}
            onClose={() => {
              setIsOpenDiscountCode(false)
            }}
            title="Discount codes from Shopify"
            secondaryActions={[
              {
                content: 'Close',
                onAction: () => {
                  setIsOpenDiscountCode(false)
                },
              },
            ]}
          >
            <Modal.Section>
              <>
                <div className='order-detail item-center'>
                  <DataTable
                    columnContentTypes={[
                      'text',
                      'text',
                      'text',
                      'text',
                    ]}
                    headings={[
                      'Discount code',
                      'Discount type',
                      'Discount value',
                      'Minimum requirement',
                    ]}
                    // footerContent={`Showing ${currentItems.length} of ${reportState..length} results`}
                    rows={settingState.DiscountDetail != null && settingState.DiscountDetail.length > 0 ? settingState.DiscountDetail.map((discount, index) => {
                      return [
                        discount.DiscountCode,
                        discount.DiscountType,
                        discount.Value,
                        discount.MinimumOrderAmount

                      ];
                    }) : []}
                  />
                  {
                    settingState.TotalDiscountCode === 0 ? <>
                      <div class="Polaris-Card">
                        <div class="Polaris-IndexTable">
                          <div class="Polaris-IndexTable__EmptySearchResultWrapper">
                            <div class="Polaris-Stack Polaris-Stack--vertical Polaris-Stack--alignmentCenter">
                              <div class="Polaris-Stack__Item"><span class="Polaris-TextStyle--variationSubdued"><p>There is no discount code</p></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </> : <></>
                  }
                </div>
              </>
            </Modal.Section>
          </Modal>
        </div>
      </>
      {
        settingState.IsOpenSaveToolbar ?
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
          : <></>
      }
      {
        settingState.IsOpenSaveToolbar ? <>
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
      {
        settingState.IsOpenSaveResult ? <Toast content={settingState.MessageSaveResult} duration={4000} onDismiss={() => {
          dispatch(setSetting({
            ...settingState,
            IsOpenSaveResult: null
          }))
        }} /> : null
      }

    </>
  )
}

export default DiscountFeature