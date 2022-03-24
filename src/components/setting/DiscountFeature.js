import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageActions, Card, Layout, Heading, TextStyle, Button, ButtonGroup, TextField, Toast, Icon, DataTable, Stack, Checkbox, ContextualSaveBar, Modal } from '@shopify/polaris';
import { DeleteMinor, QuestionMarkMajor, CircleInformationMajor, CircleRightMajor, ViewMinor, ConfettiMajor } from '@shopify/polaris-icons';
import Loading from '../../components/plugins/Loading';
import { setSetting } from '../../state/modules/setting/actions';
import { saveSetting, fetchSetting } from '../../state/modules/setting/operations';
import Select from 'react-select';
import CardOrange2 from '../../assets/images/card-orange-2.svg';
import CardOrange3 from '../../assets/images/card-orange-3.svg';
import { hexToCSSFilter } from 'hex-to-css-filter';
import config from '../../config/config';
import axios from 'axios';


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
  const [filterBackgroundColorCard, setFilterBackgroundColorCard] = useState(hexToCSSFilter(settingState.Setting2.BackgroundColorCard).filter);
  const getDiscountCode = async () => {
    await axios.get(config.rootLink + '/FrontEnd/GetDiscountCode', {
      params: {
        shopID: appState?.Shop?.ID,
        shop: config.shop,
      }
    })
      .then((res) => {
        const result = res?.data;
        dispatch(setSetting({
          ...settingState,
          DiscountDetail: result.discountDetail,
          TotalDiscountCode: result.discountDetail.length,
        }))

      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDiscountCode();
  }, []);
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
                                id='ShowDiscountProductPage'
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
                                id='ShowDescription'
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

                          </div>

                        </Card.Section>
                        {/* Custome discount title */}
                        <Card.Section>
                          <div className='element-general'>
                            <p className='only-text'>Customize discount title</p>
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
                                    id='TextQuantityBreaks'
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
                            </div>
                            <div className='group-col-half'>
                              <div className='item'>
                                <div className='itemLeft'>
                                  <p className='title'>Font size</p>
                                  <TextField
                                    id='FontSizeDiscountTitle'
                                    placeholder='Font size'
                                    value={settingState.Setting2.FontSizeDiscountTitle}
                                    onChange={(e) => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          FontSizeDiscountTitle: e == '' ? '0' : validateNumber(e.trim()) ? e.trim() : "0",
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}
                                    type="number"
                                    min={0}
                                  />
                                </div>
                                <div className='itemRight'>
                                  <p className='title'>Text color</p>
                                  <div className='flex flex-align-center'>
                                    <div className='w90pt'>
                                      <TextField
                                        id='TextColorDiscountTitle'
                                        placeholder='Text color'
                                        value={settingState.Setting2.TextColorDiscountTitle}
                                        onChange={(e) => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              TextColorDiscountTitle: e == '' ? '#FFFFFF' : e.trim(),
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }}
                                      />
                                    </div>
                                    <input type="color" value={settingState.Setting2.TextColorDiscountTitle} onChange={e => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          TextColorDiscountTitle: e.target.value == '' ? '#FFFFFF' : e.target.value.toUpperCase(),
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }} />
                                  </div>

                                </div>
                                <div className='cb'>

                                </div>
                              </div>

                            </div>
                          </div>
                        </Card.Section>
                        {/* Layout in Page */}
                        <Card.Section>
                          <div className='element-general'>
                            <p className='only-text'>Layout in product page</p>
                            <Select
                              id='LayoutInProductPage'
                              // label="Discount based on"
                              options={settingState.ListLayout}
                              onChange={(value) => {

                                handleSelectLayoutType(value);
                              }}
                              isSearchable={false}
                              value={settingState.ListLayout.filter(p => p.value == settingState.Setting.LayoutInProductPage)[0] || settingState.ListLayout[0]}
                            />
                            <div className="break-line"></div>
                            <p className='only-text'>Select card theme</p>
                            {
                              settingState.Setting.LayoutInProductPage === 3 ? <>
                                <div className='group-card-theme'>
                                  <div className={settingState.Setting2.CardTheme == 0 ? 'item-card-theme active' : 'item-card-theme'}>
                                    <Button onClick={() => {

                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          CardTheme: 0,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}>
                                      <img src={CardOrange2} alt="" style={{ filter: filterBackgroundColorCard.replace(';', '') }} />
                                    </Button>
                                  </div>
                                  <div className={settingState.Setting2.CardTheme == 1 ? 'item-card-theme active' : 'item-card-theme'}>
                                    <Button onClick={() => {
                                      dispatch(setSetting({
                                        ...settingState,
                                        Setting2: {
                                          ...settingState.Setting2,
                                          CardTheme: 1,
                                        },
                                        IsOpenSaveToolbar: true
                                      }))
                                    }}>
                                      <img src={CardOrange3} style={{ filter: filterBackgroundColorCard.replace(';', '') }} alt="" />
                                    </Button>
                                  </div>
                                  <div className='cb'></div>
                                </div>
                              </>
                                : <>
                                  <Stack>
                                    <Checkbox
                                      id='ShowDiscountedPrice'
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
                          </div>

                        </Card.Section>
                        {/* Custom first table row */}
                        {
                          settingState.Setting.LayoutInProductPage === 3 ? <></> : <>
                            <Card.Section>
                              <div className='element-general'>
                                <p className='only-text'>{settingState.Setting.LayoutInProductPage === 1 ? 'Customize first table column' : settingState.Setting.LayoutInProductPage === 3 ? 'Customize card' : 'Customize first table row'}</p>
                                <div className='group-fill-text'>
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
                                        id='TextQuantity'
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
                                        id='TextDiscount'
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
                                        id='TextDiscountPrice'
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
                                </div>
                                <div className='group-col-half'>
                                  <div className='item'>
                                    <div className='itemLeft'>
                                      <p className='title'>Font size</p>
                                      <TextField
                                        id='TableFontSizeHeading'
                                        placeholder='Font size'
                                        value={settingState.Setting.TableFontSizeHeading}
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
                                    <div className='cb'>

                                    </div>
                                  </div>
                                  <div className='item'>
                                    <div className='itemLeft'>
                                      <p className='title'>Text color</p>
                                      <div className='flex flex-align-center'>
                                        <div className='w90pt'>
                                          <TextField
                                            id='TextColorHeading'
                                            placeholder='Text color'
                                            value={settingState.Setting2.TextColorHeading}
                                            onChange={(e) => {
                                              dispatch(setSetting({
                                                ...settingState,
                                                Setting2: {
                                                  ...settingState.Setting2,
                                                  TextColorHeading: e == '' ? '#000000' : e,
                                                },
                                                IsOpenSaveToolbar: true
                                              }))
                                            }}
                                          />
                                        </div>
                                        <input type="color" value={settingState.Setting2.TextColorHeading} onChange={e => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              TextColorHeading: e.target.value == '' ? '#000000' : e.target.value.toUpperCase(),
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }} />
                                      </div>

                                    </div>
                                    <div className='itemRight'>
                                      <p className='title'>Background color</p>
                                      <div className='flex flex-align-center'>
                                        <div className='w90pt'>
                                          <TextField
                                            id='BackgroundColorHeading'
                                            placeholder='Background color'
                                            value={settingState.Setting2.BackgroundColorHeading}
                                            onChange={(e) => {
                                              dispatch(setSetting({
                                                ...settingState,
                                                Setting2: {
                                                  ...settingState.Setting2,
                                                  BackgroundColorHeading: e == '' ? '#FFFFFF' : e.trim(),
                                                },
                                                IsOpenSaveToolbar: true
                                              }))
                                            }}
                                          />

                                        </div>
                                        <input type="color" value={settingState.Setting2.BackgroundColorHeading} onChange={e => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              BackgroundColorHeading: e.target.value == '' ? '#FFFFFF' : e.target.value.toUpperCase(),
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }} />
                                      </div>

                                    </div>
                                    <div className='cb'>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card.Section>
                          </>
                        }

                        {/* Custom table */}
                        <Card.Section>
                          <div className='element-general'>
                            <p className='only-text'>{settingState.Setting.LayoutInProductPage === 3 ? 'Customize card' : 'Customize table'}</p>

                            <div className='group-fill-text'>

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
                                    id='TextBuy'
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
                                  “+”
                                </div>
                                <div className='col col2'>
                                  <Icon
                                    source={CircleRightMajor}
                                    color="base" />
                                </div>
                                <div className='col col3'>
                                  <TextField
                                    id='TextPlus'
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
                              {
                                settingState.Setting.LayoutInProductPage === 3 ? <>
                                  <div className='item'>
                                    <div className='col col1'>
                                      “get”
                                    </div>
                                    <div className='col col2'>
                                      <Icon
                                        source={CircleRightMajor}
                                        color="base" />
                                    </div>
                                    <div className='col col3'>
                                      <TextField
                                        id='TextGet'
                                        placeholder='get'
                                        value={settingState.Setting2.TextGet}
                                        onChange={(e) => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              TextGet: e,
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
                                      “off”
                                    </div>
                                    <div className='col col2'>
                                      <Icon
                                        source={CircleRightMajor}
                                        color="base" />
                                    </div>
                                    <div className='col col3'>
                                      <TextField
                                        id='TextOff'
                                        placeholder='off'
                                        value={settingState.Setting2.TextOff}
                                        onChange={(e) => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              TextOff: e,
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
                                </> :
                                  <></>}
                            </div>
                            {
                              settingState.Setting.LayoutInProductPage === 3 ? <>
                                <div className='group-col-half'>
                                  <div className='item'>
                                    <div className='itemLeft'>
                                      <p className='title'>Font size</p>
                                      <TextField
                                        id='FontSizeCard'
                                        placeholder='Font size'
                                        value={settingState.Setting2.FontSizeCard}
                                        onChange={(e) => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              FontSizeCard: e == '' ? '0' : validateNumber(e.trim()) ? e.trim() : "0",
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
                                  <div className="break-line"></div>
                                  <div className='item'>
                                    <div className='itemLeft'>
                                      <p className='title'>Text color</p>
                                      <div className='flex flex-align-center'>
                                        <div className='w90pt'>
                                          <TextField
                                            id='TextColorCard'
                                            placeholder='Text color'
                                            value={settingState.Setting2.TextColorCard}
                                            onChange={(e) => {
                                              dispatch(setSetting({
                                                ...settingState,
                                                Setting2: {
                                                  ...settingState.Setting2,
                                                  TextColorCard: e == '' ? '#000000' : e,
                                                },
                                                IsOpenSaveToolbar: true
                                              }))
                                            }}
                                          />
                                        </div>

                                        <input type="color" value={settingState.Setting2.TextColorCard} onChange={e => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              TextColorCard: e.target.value == '' ? '#000000' : e.target.value.toUpperCase(),
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }} />
                                      </div>

                                    </div>
                                    <div className='itemRight'>
                                      <p className='title'>Background color</p>
                                      <div className='flex flex-align-center'>
                                        <div className='w90pt'>
                                          <TextField
                                            id='BackgroundColorCard'
                                            placeholder='Background color'
                                            value={settingState.Setting2.BackgroundColorCard}
                                            onChange={(e) => {
                                              dispatch(setSetting({
                                                ...settingState,
                                                Setting2: {
                                                  ...settingState.Setting2,
                                                  BackgroundColorCard: e == '' ? '#FFFFFF' : e.trim(),
                                                },
                                                IsOpenSaveToolbar: true
                                              }))
                                            }}
                                          />

                                        </div>
                                        <input type="color" value={settingState.Setting2.BackgroundColorCard} onChange={e => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              BackgroundColorCard: e.target.value == '' ? '#FFFFFF' : e.target.value.toUpperCase(),
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                          setFilterBackgroundColorCard(hexToCSSFilter(e.target.value == '' ? '#FFFFFF' : e.target.value.toUpperCase()).filter)
                                          console.log(hexToCSSFilter(e.target.value == '' ? '#FFFFFF' : e.target.value.toUpperCase()).filter)
                                        }} />
                                      </div>

                                    </div>
                                    <div className='cb'>

                                    </div>
                                  </div>


                                </div>
                              </> : <>
                                <div className='group-col-half'>
                                  <div className='item'>
                                    <div className='itemLeft'>
                                      <p className='title'>Font size</p>
                                      <TextField
                                        id='FontSizeItemInTable'
                                        placeholder='Font size'
                                        value={settingState.Setting2.FontSizeItemInTable}
                                        onChange={(e) => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              FontSizeItemInTable: e == '' ? '0' : validateNumber(e.trim()) ? e.trim() : "0",
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
                                        id='TableBorderSize'
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
                                  <div className="break-line"></div>
                                  <div className='item'>
                                    <div className='itemLeft'>
                                      <p className='title'>Text color</p>
                                      <div className='flex flex-align-center'>
                                        <div className='w90pt'>
                                          <TextField
                                            id='TextColorItemInTable'
                                            placeholder='Text color'
                                            value={settingState.Setting2.TextColorItemInTable}
                                            onChange={(e) => {
                                              dispatch(setSetting({
                                                ...settingState,
                                                Setting2: {
                                                  ...settingState.Setting2,
                                                  TextColorItemInTable: e == '' ? '#000000' : e,
                                                },
                                                IsOpenSaveToolbar: true
                                              }))
                                            }}
                                          />
                                        </div>

                                        <input type="color" value={settingState.Setting2.TextColorItemInTable} onChange={e => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              TextColorItemInTable: e.target.value == '' ? '#000000' : e.target.value.toUpperCase(),
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }} />
                                      </div>

                                    </div>
                                    <div className='itemRight'>
                                      <p className='title'>Background color</p>
                                      <div className='flex flex-align-center'>
                                        <div className='w90pt'>
                                          <TextField
                                            id='BackgroundColorItemInTable'
                                            placeholder='Background color'
                                            value={settingState.Setting2.BackgroundColorItemInTable}
                                            onChange={(e) => {
                                              dispatch(setSetting({
                                                ...settingState,
                                                Setting2: {
                                                  ...settingState.Setting2,
                                                  BackgroundColorItemInTable: e == '' ? '#FFFFFF' : e.trim(),
                                                },
                                                IsOpenSaveToolbar: true
                                              }))
                                            }}
                                          />

                                        </div>
                                        <input type="color" value={settingState.Setting2.BackgroundColorItemInTable} onChange={e => {
                                          dispatch(setSetting({
                                            ...settingState,
                                            Setting2: {
                                              ...settingState.Setting2,
                                              BackgroundColorItemInTable: e.target.value == '' ? '#FFFFFF' : e.target.value.toUpperCase(),
                                            },
                                            IsOpenSaveToolbar: true
                                          }))
                                        }} />
                                      </div>

                                    </div>
                                    <div className='cb'>

                                    </div>
                                  </div>


                                </div>
                              </>
                            }
                          </div>
                        </Card.Section>
                        {/* CSS JS */}
                        <Card.Section>
                          <div className='element-general'>
                            <div className='group-col-half'>

                              <div className='item'>
                                <div className='itemLeft'>
                                  <p className='title'>Custom css</p>
                                  <TextField
                                    id='CustomCssProductPage'
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
                                    id='CustomJsProductPage'
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
                                id='ShowNotiOnCart'
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
                                id='TextNotiOnCart'
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
                                id='UseDiscountCodeOnCart'
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
                                id='DisCountCodePrefix'
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
                                id='UseUpdateOnCartPage'
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
                                    id='CustomCssCart'
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
                                    id='CustomJsCart'
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
                        <h2 className="Polaris-Heading Heading-Bottom-10 Heading-Icon-Right" style={{ fontSize: settingState.Setting2.FontSizeDiscountTitle + 'px', color: settingState.Setting2.TextColorDiscountTitle }}> {settingState.Setting.TextQuantityBreaks}
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
                                          <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header" scope="col" style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px', color: settingState.Setting2.TextColorHeading, backgroundColor: settingState.Setting2.BackgroundColorHeading }}>{settingState.Setting.TextQuantity}</th>
                                          <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px', color: settingState.Setting2.TextColorHeading, backgroundColor: settingState.Setting2.BackgroundColorHeading }}>{settingState.Setting.TextDiscount}</th>

                                          {
                                            settingState.Setting.ShowDiscountedPrice ? <>
                                              <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--header" scope="col" style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px', color: settingState.Setting2.TextColorHeading, backgroundColor: settingState.Setting2.BackgroundColorHeading }}>{settingState.Setting.TextDiscountPrice}</th>
                                            </> : <></>
                                          }
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {
                                          rowsPreview.map((item, index) => {
                                            return (
                                              <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                                <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn" scope="row" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{settingState.Setting.TextBuy + ' ' + item[0] + settingState.Setting.TextPlus}</th>
                                                <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{item[1] + '%'}</td>
                                                {
                                                  settingState.Setting.ShowDiscountedPrice ? <>
                                                    <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{'$' + item[2]}</td>
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
                                            <th style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px', color: settingState.Setting2.TextColorHeading, backgroundColor: settingState.Setting2.BackgroundColorHeading }} data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">{settingState.Setting.TextQuantity}</th>
                                            <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn" scope="row" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{settingState.Setting.TextBuy + ' ' + rowsPreview[0][0] + settingState.Setting.TextPlus}</th>
                                            <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn" scope="row" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{settingState.Setting.TextBuy + ' ' + rowsPreview[1][0] + settingState.Setting.TextPlus}</th>
                                            <th className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn" scope="row" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{settingState.Setting.TextBuy + ' ' + rowsPreview[2][0] + settingState.Setting.TextPlus}</th>
                                          </tr>
                                          <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                            <th style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px', color: settingState.Setting2.TextColorHeading, backgroundColor: settingState.Setting2.BackgroundColorHeading }} data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">{settingState.Setting.TextDiscount}</th>
                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{rowsPreview[0][1] + '%'}</td>
                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{rowsPreview[1][1] + '%'}</td>
                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{rowsPreview[2][1] + '%'}</td>
                                          </tr>
                                          {
                                            settingState.Setting.ShowDiscountedPrice ? <>
                                              <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                                <th style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px', color: settingState.Setting2.TextColorHeading, backgroundColor: settingState.Setting2.BackgroundColorHeading }} data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">{settingState.Setting.TextDiscountPrice}</th>
                                                <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{'$' + rowsPreview[0][2]}</td>
                                                <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{'$' + rowsPreview[1][2]}</td>
                                                <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop" style={{ fontSize: settingState.Setting2.FontSizeItemInTable + 'px', color: settingState.Setting2.TextColorItemInTable, backgroundColor: settingState.Setting2.BackgroundColorItemInTable }}>{'$' + rowsPreview[2][2]}</td>
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
                              <div className='card-orange' style={{ color: settingState.Setting2.TextColorCard, fontSize: settingState.Setting2.FontSizeCard + 'px' }}>
                                <img src={settingState.Setting2.CardTheme == 0 ? CardOrange2 : CardOrange3} alt="" style={{ marginLeft: '0', filter: filterBackgroundColorCard.replace(';', '') }} className="Polaris-CalloutCard__Image" />
                                <p className="buy">{settingState.Setting.TextBuy} {rowsPreview[0][0]}{settingState.Setting.TextPLus}</p>
                                <p className="get">{settingState.Setting2.TextGet}</p>
                                <p className="off">{rowsPreview[0][1]}% {settingState.Setting2.TextOff}</p>
                              </div>
                              <div className='card-orange' style={{ color: settingState.Setting2.TextColorCard, fontSize: settingState.Setting2.FontSizeCard + 'px' }}>
                                <img src={settingState.Setting2.CardTheme == 0 ? CardOrange2 : CardOrange3} alt="" style={{ marginLeft: '0', filter: filterBackgroundColorCard.replace(';', '') }} className="Polaris-CalloutCard__Image" />
                                <p className="buy">{settingState.Setting.TextBuy} {rowsPreview[1][0]}{settingState.Setting.TextPLus}</p>
                                <p className="get">{settingState.Setting2.TextGet}</p>
                                <p className="off">{rowsPreview[1][1]}% {settingState.Setting2.TextOff}</p>
                              </div>
                              <div className='card-orange' style={{ color: settingState.Setting2.TextColorCard, fontSize: settingState.Setting2.FontSizeCard + 'px' }}>
                                <img src={settingState.Setting2.CardTheme == 0 ? CardOrange2 : CardOrange3} alt="" style={{ marginLeft: '0', filter: filterBackgroundColorCard.replace(';', '') }} className="Polaris-CalloutCard__Image" />
                                <p className="buy">{settingState.Setting.TextBuy} {rowsPreview[2][0]}{settingState.Setting.TextPLus}</p>
                                <p className="get">{settingState.Setting2.TextGet}</p>
                                <p className="off">{rowsPreview[2][1]}% {settingState.Setting2.TextOff}</p>
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