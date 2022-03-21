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

    useEffect(() => {

        dispatch(fetchList());
        // dispatch(setCreateUpdateCampaign(
        //     {
        //         ...campaignCreateState,
        //         campaign:
        //         {
        //             ...campaignCreateState.campaign,
        //             ListVariantsProduct: []
        //         }
        //     }));
        // Fetch items from another resources.
        const endOffset = campaignState.Paginate.Offset + moreAppConfig.ItemPerPage;
        if (campaignState.campaigns != undefined && campaignState.campaigns != null) {
            dispatch(setListCampaign({
                ...campaignState,
                Paginate: {
                    ...campaignState.Paginate,
                    Offset: campaignState.Paginate.Offset,
                    CurrentItems: campaignState.campaigns.slice(campaignState.Paginate.Offset, endOffset),
                    TotalPage: campaignState.campaigns.length <= moreAppConfig.ItemPerPage ? 1 : Math.ceil(campaignState.campaigns.length / moreAppConfig.ItemPerPage)
                }
            }))
        }

    }, []);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {

        var listCampaign = campaignState.campaigns;
        if (campaignState.TextSearchProduct !== undefined && campaignState.TextSearchProduct !== null && campaignState.TextSearchProduct !== '') {
            listCampaign = listCampaign.filter(p => p.Title.toLowerCase().includes(campaignState.TextSearchProduct.toLowerCase()));
        }
        if (campaignState.DiscountType !== undefined && campaignState.DiscountType !== null && campaignState.DiscountType > 0) {
            listCampaign = listCampaign.filter(p => p.DiscountType === campaignState.DiscountType);
        }
        const newOffset = (event.selected * moreAppConfig.ItemPerPage) % listCampaign.length;
        const endOffset = newOffset + moreAppConfig.ItemPerPage;
        dispatch(setListCampaign({
            ...campaignState,
            Paginate: {
                ...campaignState.Paginate,
                Offset: newOffset,
                CurrentItems: listCampaign.slice(newOffset, endOffset),
            }
        }))
    };

    const onClickDeleteCampaign = (campaign) => {
        setCampaign(campaign);
        setIsOpenDeleteModal(true);
    }

    const handleDeleteCampaign = () => {
        if (campaignState.campaigns != null && campaignState.campaigns.length > 0 && Campaign != null && Campaign.ID > 0) {
            axios.post(config.rootLink + '/FrontEnd/DeleteCampaign', { id: Campaign.ID, shop: config.shop, isVariantCampaign: Campaign.IsVariantProduct })
                .then(function (response) {
                    if (response.data.IsSuccess) {
                        var newArr = campaignState.campaigns.filter(p => p.ID != Campaign.ID);
                        var totlapage = Math.ceil(newArr.length / moreAppConfig.ItemPerPage);
                        console.log(totlapage);
                        dispatch(setListCampaign({
                            ...campaignState,
                            campaigns: newArr,
                            Paginate: {
                                ...campaignState.Paginate,
                                Offset: 0,
                                CurrentItems: newArr.slice(0, moreAppConfig.ItemPerPage),
                                TotalPage: newArr.length <= moreAppConfig.ItemPerPage ? 1 : Math.ceil(newArr.length / moreAppConfig.ItemPerPage)
                            },
                            TotalCampaign: newArr.length
                        }))
                        if (newArr.length == 0) {
                            dispatch(setIsNoCampaign(true));

                        } else {
                            dispatch(setIsNoCampaign(false));
                        }
                        dispatch(setIsCreatingCampaign(false));
                        setAlert(<Toast content={'The campaign: ' + Campaign.Title + ' deleted successfully'} duration={3000} onDismiss={() => {
                            setAlert(null);
                        }} />);
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
        var listCampaign = campaignState.campaigns;
        if (textSearch !== undefined && textSearch !== null && textSearch !== '') {
            listCampaign = listCampaign.filter(p => p.Title.includes(textSearch));
        }
        if (discountType !== undefined && discountType !== null && discountType.value > 0) {
            listCampaign = listCampaign.filter(p => p.DiscountType === discountType.value);
        }
        //Set List + paging
        dispatch(setListCampaign({
            ...campaignState,
            TextSearchProduct: textSearch,
            DiscountType: discountType.value,
            DiscountTypeSelected: discountType,
            Paginate: {
                ...campaignState.Paginate,
                Offset: 0,
                CurrentItems: listCampaign.slice(0, moreAppConfig.ItemPerPage),
                TotalPage: listCampaign.length <= moreAppConfig.ItemPerPage ? 1 : Math.ceil(listCampaign.length / moreAppConfig.ItemPerPage)
            },
            TotalCampaign: listCampaign.length
        }))
    };
    var newArrdiscounttype = [{ label: 'Discount based on', value: 0 }];
    newArrdiscounttype = [...newArrdiscounttype, ...moreAppConfig.discounttype]


    function UpdateCampaignStatus(campaign) {
        axios.post(config.rootLink + '/FrontEnd/UpdateCampaignStatus', { id: campaign.ID, shop: config.shop, status: campaign.Active, isVariantCampaign: campaign.IsVariantProduct })
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
                        campaigns: campaignState.campaigns.map((p, i) => (p.ID == campaign.ID ? {
                            ...p,
                            Active: !campaign.Active
                        } : p)),
                    }))
                    // setCurrentItems(currentItems.map((p, i) => (p.ID == campaign.ID ? {
                    //     ...p,
                    //     Active: !campaign.Active
                    // } : p)))
                    setAlert(<Toast content={'The campaign: ' + campaign.Title + ' update status successfully'} duration={3000} onDismiss={() => {
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
            {campaignState.IsLoadingPage
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
                                                    handleSearchCampaign(e, campaignState.DiscountTypeSelected)
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

                                            if (campaignState.TotalCampaign === 0) {
                                                dispatch(setIsNoCampaign(true))
                                            }
                                            dispatch(setIsCreatingCampaign(true))
                                            dispatch(setIsEditCampaign(false))
                                            dispatch(setNoCallTwices(true));
                                            dispatch(createCampaign());
                                            dispatch(setMenu(moreAppConfig.Menu.CREATECAMPAIGN));
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
                                        rows={campaignState.Paginate.CurrentItems != null && campaignState.Paginate.CurrentItems.length > 0 ? campaignState.Paginate.CurrentItems.map((campaign, index) => {
                                            return [
                                                campaign.ID,
                                                <>
                                                    <p>{campaign.Title}</p>
                                                </>
                                                ,
                                                (campaign.DiscountType === 1 ? "Minimum Cart Quantity" : campaign.DiscountType === 2 ? "Minimum Same Product Quantity" : campaign.DiscountType === 3 ? "Minimum Same Variant Quantity" : ""),
                                                <List type="bullet">
                                                    {
                                                        campaign.ListDetails.map((item, index) => {
                                                            return (
                                                                index <= 1 ?
                                                                    <List.Item>Buy {item.Quantity}+ {campaign.PriceType !== 3 ? 'discount': 'fixed price'} {item.PercentOrPrice}{campaign.PriceType === 1 ? '%' : '$'} </List.Item> : <></>
                                                            )

                                                        })

                                                    }
                                                    {campaign.ListDetails.length > 2 ? <><p>...</p></> : ''}
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
                                            <div class="Polaris-Card">
                                                <div class="Polaris-IndexTable">
                                                    <div class="Polaris-IndexTable__EmptySearchResultWrapper">
                                                        <div class="Polaris-Stack Polaris-Stack--vertical Polaris-Stack--alignmentCenter">
                                                            <div class="Polaris-Stack__Item"><span class="Polaris-TextStyle--variationSubdued"><p>There is no campaign</p></span>
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
            {Alert}
        </>

    )
}

export default ListCampaign;