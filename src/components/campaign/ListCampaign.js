import { Card, Badge, ButtonGroup, Button, Modal, Toast, TextContainer, TextField, DataTable, List, Icon, ProgressBar } from '@shopify/polaris';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUpdateCampaign, setListCampaign } from '../../state/modules/campaign/actions';
import { setIsCreatingCampaign, setIsEditCampaign, setIsNoCampaign, setMenu, setNoCallTwices } from '../../state/modules/app/actions';
import config from '../../config/config';
import { editCampaign, createCampaign, fetchList } from '../../state/modules/campaign/operations';
import { DeleteMinor, EditMinor, CircleInformationMajor } from '@shopify/polaris-icons';
import moreAppConfig from '../../config/moreAppConfig';
import '../../assets/css/paginate.css';
import ReactPaginate from 'react-paginate';
import Loading from '../../components/plugins/Loading';
import Select from 'react-select';

const ListCampaign = (props) => {
    const [IsOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [Campaign, setCampaign] = useState(null);
    const [Alert, setAlert] = useState(null);
    const dispatch = useDispatch();
    const campaignState = useSelector((state) => state.campaign.ListCampaign);
    const appState = useSelector((state) => state.app);
    const [isShowPopupUpgradeCreateCampaign, setIsShowPopupUpgradeCreateCampaign] = useState(false);
    useEffect(() => {
        dispatch(fetchList());

    }, [dispatch]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        axios.get(config.rootLink + '/FrontEnd/SearchCampaignPaginate', {
            params: {
                search: campaignState.TextSearchProduct,
                discounttype: campaignState.DiscountTypeSelected.value,
                shop: config.shop,
                page: event.selected + 1,
                pagezise: 10,
                token: config.token
            }
        })
            .then(function (response) {
                const result = response?.data;
                dispatch(setListCampaign({
                    ...campaignState,
                    Paginate: {
                        ...campaignState.Paginate,
                        CurrentItems: result.campaigns,
                        TotalPage: result.totalpage
                    },
                    TotalCampaign: result.totalitem,
                    WholeCampaignNumber: result.wholecampaignnumber
                }))
            })
            .catch(function (error) {
                const errorMsg = error.message;
                console.log(errorMsg);
            })
    };

    const onClickDeleteCampaign = (campaign) => {
        setCampaign(campaign);
        setIsOpenDeleteModal(true);
    }

    const handleDeleteCampaign = () => {
        if (campaignState.Paginate.CurrentItems != null && campaignState.Paginate.CurrentItems.length > 0 && Campaign != null && Campaign.ID > 0) {
            axios.post(config.rootLink + '/FrontEnd/DeleteCampaign', { id: Campaign.ID, shop: config.shop, isVariantCampaign: Campaign.IsVariantProduct,token: config.token })
                .then(function (response) {
                    if (response.data.IsSuccess) {
                        axios.get(config.rootLink + '/FrontEnd/SearchCampaignPaginate', {
                            params: {
                                search: campaignState.TextSearchProduct,
                                discounttype: campaignState.DiscountTypeSelected.value,
                                shop: appState.Shop?.Domain,
                                page: 1,
                                pagezise: 10,
                                token: config.token 
                                // pagezise: 10
                            }
                        })
                            .then(function (response) {
                                const result = response?.data;
                                dispatch(setListCampaign({
                                    ...campaignState,
                                    Paginate: {
                                        ...campaignState.Paginate,
                                        CurrentItems: result.campaigns,
                                        TotalPage: result.totalpage
                                    },
                                    TotalCampaign: result.totalitem,
                                    WholeCampaignNumber: result.wholecampaignnumber
                                }))
                                if (result.campaigns.length == 0) {
                                    dispatch(setIsNoCampaign(true));

                                } else {
                                    dispatch(setIsNoCampaign(false));
                                }
                                dispatch(setIsCreatingCampaign(false));
                                setAlert(<Toast content={'The campaign: ' + Campaign.Title + ' deleted successfully'} duration={1600} onDismiss={() => {
                                    setAlert(null);
                                }} />);
                            })
                            .catch(function (error) {
                                const errorMsg = error.message;
                                console.log(errorMsg);
                            })

                    }
                    else {
                        setAlert(null);
                    }
                    setIsOpenDeleteModal(false);

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
    }
    const handleSearchCampaign = (textSearch, discountType) => {
        axios.get(config.rootLink + '/FrontEnd/SearchCampaignPaginate', {
            params: {
                search: textSearch,
                discounttype: discountType.value,
                shop: config.shop,
                page: 1,
                pagezise: 10,
                token: config.token
                // pagezise: 10
            }
        })
            .then(function (response) {
                const result = response?.data;
                //Set List + paging
                dispatch(setListCampaign({
                    ...campaignState,
                    TextSearchProduct: textSearch,
                    DiscountType: discountType.value,
                    DiscountTypeSelected: discountType,
                    Paginate: {
                        ...campaignState.Paginate,
                        CurrentItems: result.campaigns,
                        TotalPage: result.totalpage
                    },
                    TotalCampaign: result.totalitem,
                    WholeCampaignNumber: result.wholecampaignnumber
                }))
            })
            .catch(function (error) {
                const errorMsg = error.message;
                console.log(errorMsg);
            })


    };
    var newArrdiscounttype = [{ label: 'Discount based on', value: 0 }];
    newArrdiscounttype = [...newArrdiscounttype, ...moreAppConfig.discounttype]


    function UpdateCampaignStatus(campaign) {
        axios.post(config.rootLink + '/FrontEnd/UpdateCampaignStatus', { id: campaign.ID, shop: config.shop, status: campaign.Active, isVariantCampaign: campaign.IsVariantProduct, token: config.token })
            .then(function (response) {
                if (response.data.IsSuccess) {

                    dispatch(setListCampaign({
                        ...campaignState,
                        Paginate: {
                            ...campaignState.Paginate,
                            CurrentItems: campaignState.Paginate.CurrentItems.map((p, i) => (p.ID == campaign.ID ? {
                                ...p,
                                Active: !campaign.Active
                            } : p)),
                        },
                        // campaigns: campaignState.campaigns.map((p, i) => (p.ID == campaign.ID ? {
                        //     ...p,
                        //     Active: !campaign.Active
                        // } : p)),
                    }))
                    // setCurrentItems(currentItems.map((p, i) => (p.ID == campaign.ID ? {
                    //     ...p,
                    //     Active: !campaign.Active
                    // } : p)))
                    setAlert(<Toast content={'The campaign: ' + campaign.Title + ' update status successfully'} duration={1600} onDismiss={() => {
                        setAlert(null);
                    }} />);
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    return (

        // (campaignState.campaigns == null || campaignState.campaigns.length == 0) ? <CreateUpdateCampaign Collections={props.Collections} Products={props.Products} IsNoCampaign={true}></CreateUpdateCampaign> :

        <>
            {campaignState.listLoading
                ? <Loading></Loading>
                : <>
                    <div className='campaign-products'>
                        <div className='campaign-products-list'>
                            <div className=''>
                                <div className='campaign-product-header '>
                                    <div className='colLeft w70pt'>
                                        <div className='colLeft w66pt'>
                                            <TextField
                                                placeholder={'Search Product Title'}
                                                value={campaignState.TextSearchProduct}
                                                onChange={(e) => {

                                                    handleSearchCampaign(e, campaignState.DiscountTypeSelected);
                                                }}
                                                type="text"
                                            />
                                        </div>
                                        <div className='colRight w32pt ml-5'>
                                            <div className='custom-select'>
                                                <Select
                                                    // placeholder={'Discount base on'}
                                                    defaultValue={newArrdiscounttype[0]}
                                                    options={newArrdiscounttype}
                                                    onChange={(e) => {
                                                        // e = parseInt(e);
                                                        dispatch(setListCampaign({
                                                            ...campaignState,
                                                            DiscountType: e.value,
                                                            DiscountTypeSelected: e,
                                                        }))
                                                        handleSearchCampaign(campaignState.TextSearchProduct, e);
                                                    }}
                                                    isSearchable={false}
                                                // selected={campaignState.DiscountTypeSelected}
                                                // value={campaignState.DiscountType}
                                                />
                                            </div>

                                        </div>
                                        <div className='cb'>
                                        </div>

                                    </div>
                                    <div className='colRight'>
                                        <Button primary onClick={() => {
                                            if (campaignState.WholeCampaignNumber >= 5 && appState.PlanNumber === 0) {
                                                setIsShowPopupUpgradeCreateCampaign(true)
                                            } else {
                                                if (campaignState.TotalCampaign === 0) {
                                                    dispatch(setIsNoCampaign(true))
                                                }
                                                dispatch(setIsCreatingCampaign(true))
                                                dispatch(setIsEditCampaign(false))
                                                dispatch(setNoCallTwices(true));
                                                dispatch(createCampaign());
                                                dispatch(setMenu(moreAppConfig.Menu.CREATECAMPAIGN));
                                            }

                                        }}>Create new campaign</Button>
                                        {/* dispatch(createCampaign()) */}
                                    </div>
                                    <div className='cb'>
                                    </div>
                                </div>
                            </div>
                            <p style={{ margin: '10px 0' }}>Total: {campaignState.TotalCampaign} campaigns</p>

                            <div className='campaign-product-list-content'>
                                <Card>
                                    <DataTable
                                        columnContentTypes={[
                                            'number',
                                            'text',
                                            'text',
                                            '',
                                            '',
                                            '',
                                        ]}
                                        headings={[
                                            'ID',
                                            'Campaign Title',
                                            'Discount based on',
                                            'Content discount',
                                            'Status',
                                            'Action'
                                        ]}
                                        // footerContent={`Showing ${currentItems.length} of ${campaignState..length} results`}
                                        rows={campaignState.Paginate.CurrentItems != undefined && campaignState.Paginate.CurrentItems != null && campaignState.Paginate.CurrentItems.length > 0 ? campaignState.Paginate.CurrentItems.map((campaign, index) => {
                                            return [
                                                campaign.ID,
                                                <>
                                                    <p>{campaign.Title}</p>
                                                </>
                                                ,
                                                (campaign.DiscountType === 1 ? "Minimum Cart Quantity" : campaign.DiscountType === 2 ? "Minimum Same Product Quantity" : campaign.DiscountType === 3 ? "Minimum Same Variant Quantity" : ""),
                                                <List type="bullet" key={index}>
                                                    {
                                                        campaign.ListDetails != undefined && campaign.ListDetails != null && campaign.ListDetails.length ? campaign.ListDetails.map((item, index) => {
                                                            return (
                                                                index <= 1 ?
                                                                    <List.Item key={index}>Buy {item.Quantity}+ {campaign.PriceType !== 3 ? 'discount' : 'fixed price'} {item.PercentOrPrice}{campaign.PriceType === 1 ? '%' : '$'} </List.Item> : <></>
                                                            )

                                                        }) : <></>

                                                    }
                                                    {campaign.ListDetails != undefined && campaign.ListDetails != null && campaign.ListDetails.length > 2 ? <><p>...</p></> : ''}
                                                </List>
                                                ,
                                                // <>
                                                //     <p><Badge status="attention">{campaign.IsVariantProduct ? "Variant Campaign" : "Campaign"}</Badge></p>

                                                // </>,
                                                <>
                                                    <label className="switch">
                                                        <input type="checkbox" onClick={() => {
                                                            UpdateCampaignStatus(campaign)

                                                        }} className={campaign.Active ? 'active' : ''} id="togBtn" />
                                                        <div className="slider round">
                                                            <span className="on">ON</span>
                                                            <span className="off">OFF</span>
                                                        </div>
                                                    </label>
                                                </>,

                                                <>
                                                    <div className='group-button-merge'>
                                                        <Button icon={EditMinor}
                                                            onClick={() => { dispatch(setMenu(moreAppConfig.Menu.CREATECAMPAIGN)); dispatch(setIsEditCampaign(true)); dispatch(setNoCallTwices(true)); dispatch(setIsCreatingCampaign(false)); dispatch(editCampaign(campaign)); }} accessibilityLabel="Edit" />
                                                        <Button icon={DeleteMinor}
                                                            onClick={() => { onClickDeleteCampaign(campaign) }} accessibilityLabel="Remove item" />
                                                    </div>

                                                </>

                                            ];
                                        }) : []}
                                    />
                                    {campaignState.Paginate.CurrentItems !== undefined && campaignState.Paginate.CurrentItems !== null && campaignState.Paginate.CurrentItems.length > 0
                                        ? <>

                                        </> : <>
                                            <div className="Polaris-Card">
                                                <div className="Polaris-IndexTable">
                                                    <div className="Polaris-IndexTable__EmptySearchResultWrapper">
                                                        <div className="Polaris-Stack Polaris-Stack--vertical Polaris-Stack--alignmentCenter">
                                                            <div className="Polaris-Stack__Item"><span className="Polaris-TextStyle--variationSubdued"><p>There is no campaign</p></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }

                                </Card>
                                {
                                    campaignState.Paginate.CurrentItems !== undefined && campaignState.Paginate.CurrentItems !== null && campaignState.Paginate.CurrentItems.length > 0 ? <>
                                        <div className='paging-area'>
                                            {/* paginate */}
                                            <ReactPaginate
                                                nextLabel=">"
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={2}
                                                marginPagesDisplayed={2}
                                                pageCount={campaignState.Paginate.TotalPage}
                                                previousLabel="<"
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link"
                                                breakLabel="..."
                                                breakClassName="page-item"
                                                breakLinkClassName="page-link"
                                                containerClassName="pagination"
                                                activeClassName="active"
                                                renderOnZeroPageCount={null}
                                            />
                                        </div>
                                    </> : null
                                }

                            </div>
                        </div>

                    </div>
                </>}


            <Modal
                open={IsOpenDeleteModal}
                onClose={() => { setIsOpenDeleteModal(false) }}
                title="Delete Campaign"
                primaryAction={{
                    content: 'Ok',
                    onAction: handleDeleteCampaign,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => { setIsOpenDeleteModal(false) },
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <p>
                            Do you want to delete campaign "{Campaign === null ? '' : Campaign.Title}"?
                        </p>
                    </TextContainer>
                </Modal.Section>
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
                        dispatch(setMenu(moreAppConfig.Menu.PLAN))
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
            {Alert}
        </>

    )
}

export default ListCampaign;