import { Card, Badge, InlineError, Button, Modal, Toast, TextContainer, TextField, DataTable, List } from '@shopify/polaris';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUpdateLimitPurchase, setListLimitPurchase } from '../../state/modules/limitpurchase/actions';
import config from '../../config/config';
import { createEditLimitPurchase, fetchList, saveLimitPurchase, saveBulkLimitPurchase } from '../../state/modules/limitpurchase/operations';
import { DeleteMinor, EditMinor } from '@shopify/polaris-icons';
import moreAppConfig from '../../config/moreAppConfig';
import '../../assets/css/paginate.css';
import '../../assets/css/modal.css';
import ReactPaginate from 'react-paginate';
import TableCollection from './TableCollection';
import Select from 'react-select';


const LimitPurchase = () => {
    const [IsOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [IsBulkUpdate, setIsBulkUpdate] = useState(false);
    const [LimitPurchaseCurrent, setLimitPurchaseCurrent] = useState(null);
    const [Alert, setAlert] = useState(null);
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const limitPurchaseState = useSelector((state) => state.limitpurchase.ListLimitPurchase);
    const createLimitPurchaseState = useSelector((state) => state.limitpurchase.CreateUpdateLimitPurchase);
    const [IsOpenAdSpecificCollectionModal, setIsOpenAddSpecificCollectionModal] = useState(false);

    useEffect(() => {

        dispatch(fetchList());
        // Fetch items from another resources.
        // const endOffset = limitPurchaseState.Paginate.Offset + moreAppConfig.ItemPerPage;
        // if (limitPurchaseState.limitpurchases != undefined && limitPurchaseState.limitpurchases != null) {
        //     dispatch(setListLimitPurchase({
        //         ...limitPurchaseState,
        //         Paginate: {
        //             ...limitPurchaseState.Paginate,
        //             Offset: limitPurchaseState.Paginate.Offset,
        //             CurrentItems: limitPurchaseState.limitpurchases.slice(limitPurchaseState.Paginate.Offset, endOffset),
        //             TotalPage: limitPurchaseState.limitpurchases.length <= moreAppConfig.ItemPerPage ? 1 : Math.ceil(limitPurchaseState.limitpurchases.length / moreAppConfig.ItemPerPage)
        //         }
        //     }))
        // }

    }, []);
    const validateNumber = (e) => {
        if (isNaN(e)) {
            return false;
        } else {
            return true;
        }
    }
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        axios.get(config.rootLink + '/FrontEnd/GetLimitPurchasesPaginate', {
            params: {
                search: limitPurchaseState.TextSearchProduct,
                typeselected: limitPurchaseState.ProductSelected,
                shop: config.shop,
                page: event.selected + 1,
                pagezise: 10,
                token: config.token,

            }
        })
            .then(function (response) {
                const result = response?.data;
                dispatch(setListLimitPurchase({
                    ...limitPurchaseState,
                    Paginate: {
                        ...limitPurchaseState.Paginate,
                        CurrentItems: result.list,
                        TotalPage: result.totalpage
                    },
                    TotalLimitPurchase: result.totalitem
                }))
            })
            .catch(function (error) {
                const errorMsg = error.message;
                console.log(errorMsg);
            })
        
    };

    const onClickDeleteLimitPurchase = (limitpurchase) => {
        setLimitPurchaseCurrent(limitpurchase);
        setIsOpenDeleteModal(true);
    }
    const onClickCreateUpdateLimitPurchase = (limitpurchase) => {
        dispatch(setCreateUpdateLimitPurchase({
            ...createLimitPurchaseState,
            limitpurchase: limitpurchase,
            IsOpenCreateUpdateModal: true
        }))
    }
    const onClickBulkUpdateLimitPurchase = () => {
        dispatch(setCreateUpdateLimitPurchase({
            ...createLimitPurchaseState,
            BulkUpdate: {
                Min: 0,
                Max: 0,
                ListCollects: null
            },
            IsOpenCreateUpdateModal: true
        }))
    }
    const handleDeleteLimitPurchase = () => {
        if (limitPurchaseState.limitpurchases != null && limitPurchaseState.limitpurchases.length > 0 && LimitPurchaseCurrent != null && LimitPurchaseCurrent.ID > 0) {
            axios.post(config.rootLink + '/FrontEnd/DeleteLimitPurchase', { id: LimitPurchaseCurrent.ID, shop: config.shop, token: config.token })
                .then(function (response) {
                    if (response.data.IsSuccess) {
                        axios.get(config.rootLink + '/FrontEnd/GetLimitPurchasesPaginate', {
                            params: {
                                search: limitPurchaseState.TextSearchProduct,
                                typeselected: limitPurchaseState.ProductSelected,
                                shop: config.shop,
                                page: 1,
                                pagezise: 10, 
                                token: config.token
                            }
                        })
                            .then(function (response) {
                                const result = response?.data;
                                //Set List + paging
                                dispatch(setListLimitPurchase({
                                    ...limitPurchaseState,
                                    Paginate: {
                                        ...limitPurchaseState.Paginate,
                                        Offset: 0,
                                        CurrentItems: result.list,
                                        TotalPage: result.totalpage
                                    },
                                    TotalLimitPurchase: result.totalitem
                                }))
                                dispatch(setCreateUpdateLimitPurchase({
                                    ...createLimitPurchaseState,
                                    IsOpenSaveToolbar: false
                                }))
                                setAlert(<Toast content={'The limit purchase: ' + LimitPurchaseCurrent.Title + ' deleted successfully'} duration={1600} onDismiss={() => {
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
    const handleSearchProductLimit = (textSearch, productSelected) => {
        axios.get(config.rootLink + '/FrontEnd/GetLimitPurchasesPaginate', {
            params: {
                search: textSearch,
                typeselected: productSelected,
                shop: config.shop,
                page: 1,
                pagezise: 10,
                token: config.token
            }
        })
            .then(function (response) {
                const result = response?.data;
                //Set List + paging
                dispatch(setListLimitPurchase({
                    ...limitPurchaseState,
                    TextSearchProduct: textSearch,
                    ProductSelected: productSelected,
                    Paginate: {
                        ...limitPurchaseState.Paginate,
                        Offset: 0,
                        CurrentItems: result.list,
                        TotalPage: result.totalpage
                    },
                    TotalLimitPurchase: result.totalitem
                }))
            })
            .catch(function (error) {
                const errorMsg = error.message;
                console.log(errorMsg);
            })
    };

    function ValidForm() {
        if (createLimitPurchaseState.limitpurchase.Min === '') {
            dispatch(setCreateUpdateLimitPurchase({
                ...createLimitPurchaseState,
                MinValidation: moreAppConfig.MinValidationText
            }))
            return false;
        }
        if (createLimitPurchaseState.limitpurchase.Max === '') {
            dispatch(setCreateUpdateLimitPurchase({
                ...createLimitPurchaseState,
                MaxValidation: moreAppConfig.MaxValidationText
            }))
            return false;
        }
        if (createLimitPurchaseState.limitpurchase.Min != '' && createLimitPurchaseState.limitpurchase.Max != '') {
            let min = parseInt(createLimitPurchaseState.limitpurchase.Min);
            let max = parseInt(createLimitPurchaseState.limitpurchase.Max);
            if (min > max) {
                dispatch(setCreateUpdateLimitPurchase({
                    ...createLimitPurchaseState,
                    MaxValidation: moreAppConfig.MaxGreateThanMinValidationText
                }))
                return false;
            }
            else {
                dispatch(setCreateUpdateLimitPurchase({
                    ...createLimitPurchaseState,
                    MaxValidation: ''
                }))
            }
        }


        return true;
    }
    function ValidFormBulkUpdate() {
        if (createLimitPurchaseState.BulkUpdate.ListCollects === null || createLimitPurchaseState.BulkUpdate.ListCollects === undefined || createLimitPurchaseState.BulkUpdate.ListCollects.length === 0) {
            dispatch(setCreateUpdateLimitPurchase({
                ...createLimitPurchaseState,
                LimitPurchaseCollectValidation: moreAppConfig.LimitPurchaseCollectValidationText
            }))
            return false;
        }
        else {
            dispatch(setCreateUpdateLimitPurchase({
                ...createLimitPurchaseState,
                LimitPurchaseCollectValidation: ''
            }))
        }
        if (createLimitPurchaseState.BulkUpdate.Min === '') {
            dispatch(setCreateUpdateLimitPurchase({
                ...createLimitPurchaseState,
                MinValidation: moreAppConfig.MinValidationText
            }))
            return false;
        }
        if (createLimitPurchaseState.BulkUpdate.Max === '') {
            dispatch(setCreateUpdateLimitPurchase({
                ...createLimitPurchaseState,
                MaxValidation: moreAppConfig.MaxValidationText
            }))
            return false;
        }
        if (createLimitPurchaseState.BulkUpdate.Min != '' && createLimitPurchaseState.BulkUpdate.Max != '') {
            let min = parseInt(createLimitPurchaseState.BulkUpdate.Min);
            let max = parseInt(createLimitPurchaseState.BulkUpdate.Max);
            if (min > max) {
                dispatch(setCreateUpdateLimitPurchase({
                    ...createLimitPurchaseState,
                    MaxValidation: moreAppConfig.MaxGreateThanMinValidationText
                }))
                return false;
            }
            else {
                dispatch(setCreateUpdateLimitPurchase({
                    ...createLimitPurchaseState,
                    MaxValidation: ''
                }))
            }
        }


        return true;
    }
   
    function RemoveSpecificCollection(id) {
        var arrPro = createLimitPurchaseState.BulkUpdate.ListCollects.filter(p => p.ID != id);
        dispatch(setCreateUpdateLimitPurchase(
            {
                ...createLimitPurchaseState,
                BulkUpdate:
                {
                    ...createLimitPurchaseState.BulkUpdate,
                    ListCollects: arrPro
                },
                IsOpenSaveToolbar: true
            }));
    }
    return (

        <>
            <div className='campaign-products' style={{ margin: '10px 0' }}>
                <div className='campaign-products-list'>
                    <div className=''>
                        <div className='campaign-product-header'>
                            <div className='colLeft w50pt'>
                                <div className='colLeft w32pt'>
                                    <Select
                                        // placeholder={'Discount base on'}
                                        defaultValue={limitPurchaseState.ListProductHaveLimit[0]}
                                        options={limitPurchaseState.ListProductHaveLimit}
                                        onChange={(e) => {
                                            handleSearchProductLimit(limitPurchaseState.TextSearchProduct, e.value);
                                        }}
                                        isSearchable={false}
                                    // value={limitPurchaseState.ProductSelected}
                                    />
                                </div>
                                <div className='colLeft w66pt ml-5'>
                                    <TextField
                                        placeholder={'Search Product Title'}
                                        value={limitPurchaseState.TextSearchProduct}
                                        onChange={(e) => {
                                            handleSearchProductLimit(e, limitPurchaseState.ProductSelected)
                                        }}
                                        type="text"
                                    />
                                </div>

                                <div className='cb'>
                                </div>
                            </div>
                            <div className='colRight'>
                                <Button primary onClick={() => {
                                    setIsBulkUpdate(true);
                                    onClickBulkUpdateLimitPurchase();
                                }}>Bulk Action</Button>
                            </div>
                            <div className='cb'>
                            </div>
                        </div>
                    </div>
                    <p style={{ margin: '10px 0' }}>Total : {limitPurchaseState.TotalLimitPurchase} products</p>

                    <div className='campaign-product-list-content'>
                        <Card>
                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'text',
                                    '',
                                ]}
                                headings={[
                                    'Product Title',
                                    'Content Limit',
                                    'Action'
                                ]}
                                // footerContent={`Showing ${currentItems.length} of ${limitPurchaseState..length} results`}
                                rows={limitPurchaseState.Paginate.CurrentItems != null && limitPurchaseState.Paginate.CurrentItems.length > 0 ? limitPurchaseState.Paginate.CurrentItems.map((limitpurchase, index) => {
                                    return [
                                        <>
                                            <p key={index}>
                                                <a href={'https://'+appState?.Shop?.Domain+'/products/' + limitpurchase.Handle} target="_blank">{limitpurchase.Title}</a>
                                            </p>
                                        </>
                                        ,
                                        <>
                                            {
                                                limitpurchase.Min !== undefined && limitpurchase.Min !== null && limitpurchase.Max !== undefined && limitpurchase.Max !== null ?
                                                    <List type="bullet">
                                                        <List.Item>Min: {limitpurchase.Min}</List.Item>
                                                        <List.Item>Max: {limitpurchase.Max}</List.Item>
                                                    </List> : null
                                            }</>
                                        ,
                                        <>
                                            {
                                                limitpurchase.ID === null || limitpurchase.ID === 0 ? <>
                                                    <Button
                                                        onClick={() => { setIsBulkUpdate(false); dispatch(createEditLimitPurchase(limitpurchase)); onClickCreateUpdateLimitPurchase(limitpurchase); }} accessibilityLabel="Add limit">Add limit</Button>
                                                </> :
                                                    <>
                                                        <div className='group-button-merge'>
                                                            <Button icon={EditMinor}
                                                                onClick={() => { setIsBulkUpdate(false); dispatch(createEditLimitPurchase(limitpurchase)); onClickCreateUpdateLimitPurchase(limitpurchase); }} accessibilityLabel="Edit" />
                                                            <Button icon={DeleteMinor}
                                                                onClick={() => { setIsBulkUpdate(false); onClickDeleteLimitPurchase(limitpurchase) }} accessibilityLabel="Remove item" />
                                                        </div>

                                                    </>
                                            }

                                        </>

                                    ];
                                }) : []}
                            />
                            {limitPurchaseState.Paginate.CurrentItems !== undefined && limitPurchaseState.Paginate.CurrentItems !== null && limitPurchaseState.Paginate.CurrentItems.length > 0
                                ? <>

                                </> : <>
                                    <div className="Polaris-Card">
                                        <div className="Polaris-IndexTable">
                                            <div className="Polaris-IndexTable__EmptySearchResultWrapper">
                                                <div className="Polaris-Stack Polaris-Stack--vertical Polaris-Stack--alignmentCenter">
                                                    <div className="Polaris-Stack__Item"><span className="Polaris-TextStyle--variationSubdued"><p>There is no limit purchase</p></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </Card>
                        {
                            limitPurchaseState.Paginate.CurrentItems !== undefined && limitPurchaseState.Paginate.CurrentItems !== null && limitPurchaseState.Paginate.CurrentItems.length > 0 ? <>
                                <div className='paging-area'>
                                    {/* paginate */}
                                    <ReactPaginate
                                        nextLabel=">"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={2}
                                        marginPagesDisplayed={2}
                                        pageCount={limitPurchaseState.Paginate.TotalPage}
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

            <Modal
                open={IsOpenDeleteModal}
                onClose={() => { setIsOpenDeleteModal(false) }}
                title="Do you want to delete rule for this product?"
                primaryAction={{
                    content: 'Delete',
                    onAction: handleDeleteLimitPurchase,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => { setIsOpenDeleteModal(false) },
                    },
                ]}
            >
                {/* <Modal.Section>
                    <TextContainer>
                        <p>
                            Do you want to delete limit purchase "{LimitPurchaseCurrent === null ? '' : LimitPurchaseCurrent.Title}"?
                        </p>
                    </TextContainer>
                </Modal.Section> */}
            </Modal>
            <Modal
                open={createLimitPurchaseState.IsOpenCreateUpdateModal}
                onClose={() => {
                    dispatch(setCreateUpdateLimitPurchase({
                        ...createLimitPurchaseState,
                        IsOpenCreateUpdateModal: false
                    }))
                }}
                title={!IsBulkUpdate ? (LimitPurchaseCurrent !== null && LimitPurchaseCurrent != undefined && LimitPurchaseCurrent.ID > 0 ? 'Update' : 'Create') + " limit purchase for this product" : "Create limit purchase for collections"}
                primaryAction={{
                    content: 'Save',
                    onAction: () => {
                        if (IsBulkUpdate) {
                            if (ValidFormBulkUpdate()) {
                                dispatch(saveBulkLimitPurchase());
                            }
                        }
                        else {
                            if (ValidForm()) {
                                dispatch(saveLimitPurchase());
                            }
                        }

                    },
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => {
                            if (IsBulkUpdate) {
                                dispatch(setCreateUpdateLimitPurchase({
                                    ...createLimitPurchaseState,
                                    IsOpenCreateUpdateModal: false
                                }))
                            }
                            else {
                                dispatch(setCreateUpdateLimitPurchase({
                                    ...createLimitPurchaseState,
                                    IsOpenCreateUpdateModal: false
                                }))
                            }

                        },
                    },
                ]}
            >
                <Modal.Section>
                    <div className='create-update-limit-purchase'>
                        {
                            IsBulkUpdate ?
                                <><div className="tags-input-wrapper" onClick={() => {
                                    setIsOpenAddSpecificCollectionModal(true);
                                    dispatch(setCreateUpdateLimitPurchase({
                                        ...createLimitPurchaseState,
                                        LimitPurchaseCollectValidation: ''
                                    }))
                                }}>
                                    <span className="search">Search collections
                                    </span>
                                </div>
                                    {
                                        createLimitPurchaseState.BulkUpdate.ListCollects !== null && createLimitPurchaseState.BulkUpdate.ListCollects !== undefined && createLimitPurchaseState.BulkUpdate.ListCollects.length > 0 ?
                                        <div className={createLimitPurchaseState.BulkUpdate.ListCollects.length > 10 ? "tags-input-wrapper tags-input-wrapper-scroll" : "tags-input-wrapper"}>
                                                {
                                                    createLimitPurchaseState.BulkUpdate.ListCollects.map((item, index) => {

                                                        return (
                                                            <span className="tag" key={index}>{item.Title}
                                                                <a title='Remove' onClick={() => {
                                                                    setIsOpenAddSpecificCollectionModal(false);
                                                                    RemoveSpecificCollection(item.ID)
                                                                }}>??</a>
                                                            </span>
                                                        )
                                                    })
                                                }
                                            </div>
                                            :
                                            <>


                                            </>
                                    }
                                    <div className='error'>
                                        {createLimitPurchaseState.LimitPurchaseCollectValidation != null ? <>
                                            <InlineError message={createLimitPurchaseState.LimitPurchaseCollectValidation} fieldID="collect" />
                                            <div className='cb'>
                                            </div></> : <><div className='cb'>
                                            </div></>}

                                    </div>

                                    <div className='item'>
                                        <TextField
                                            label="Min limit purchase"
                                            value={createLimitPurchaseState.BulkUpdate.Min !== null ? createLimitPurchaseState.BulkUpdate.Min.toString() : '0'}
                                            onChange={(e) => {
                                                dispatch(setCreateUpdateLimitPurchase({
                                                    ...createLimitPurchaseState,
                                                    BulkUpdate: {
                                                        ...createLimitPurchaseState.BulkUpdate,
                                                        Min: validateNumber(e.trim()) ? e.trim() : "0"
                                                    },
                                                    MinValidation: e === '' ? moreAppConfig.MinValidationText : ''
                                                }))
                                            }}
                                            error={createLimitPurchaseState.MinValidation}
                                            type="text"
                                        />
                                    </div>
                                    <div className='item' style={{marginLeft: '30px' }}>
                                        <TextField
                                            label="Max limit purchase"
                                            value={createLimitPurchaseState.BulkUpdate.Max !== null ? createLimitPurchaseState.BulkUpdate.Max.toString() : '0'}
                                            onChange={(e) => {
                                                dispatch(setCreateUpdateLimitPurchase({
                                                    ...createLimitPurchaseState,
                                                    BulkUpdate: {
                                                        ...createLimitPurchaseState.BulkUpdate,
                                                        Max: validateNumber(e.trim()) ? e.trim() : "0"
                                                    },
                                                    MaxValidation: e === '' ? moreAppConfig.MaxValidationText : ''
                                                }))
                                            }}
                                            error={createLimitPurchaseState.MaxValidation}
                                            type="text"
                                        />
                                        <span className='rule-max-zero'>If you set this 0, it means unlimited</span>
                                    </div>
                                    <div className='cb'>
                                    </div>

                                </> : <></>
                        }
                        {
                            !IsBulkUpdate ? <>
                                <div className='item'>
                                    <TextField
                                        label="Min limit purchase"
                                        value={createLimitPurchaseState.limitpurchase.Min !== null ? createLimitPurchaseState.limitpurchase.Min.toString() : '0'}
                                        onChange={(e) => {
                                            dispatch(setCreateUpdateLimitPurchase({
                                                ...createLimitPurchaseState,
                                                limitpurchase: {
                                                    ...createLimitPurchaseState.limitpurchase,
                                                    Min: validateNumber(e.trim()) ? e.trim() : "0"
                                                },
                                                MinValidation: e === '' ? moreAppConfig.MinValidationText : ''
                                            }))
                                        }}
                                        error={createLimitPurchaseState.MinValidation}
                                        type="text"
                                    />
                                </div>
                                <div className='item' style={{marginLeft: '30px' }}>
                                    <TextField
                                        label="Max limit purchase"
                                        value={createLimitPurchaseState.limitpurchase.Max !== null ? createLimitPurchaseState.limitpurchase.Max.toString() : '0'}
                                        onChange={(e) => {
                                            dispatch(setCreateUpdateLimitPurchase({
                                                ...createLimitPurchaseState,
                                                limitpurchase: {
                                                    ...createLimitPurchaseState.limitpurchase,
                                                    Max: validateNumber(e.trim()) ? e.trim() : "0"
                                                },
                                                MaxValidation: e === '' ? moreAppConfig.MaxValidationText : ''
                                            }))
                                        }}
                                        error={createLimitPurchaseState.MaxValidation}
                                        type="text"
                                    />
                                    <span className='rule-max-zero'>If you set this 0, it means unlimited</span>
                                </div>
                                <div className='cb'>
                                </div>
                            </> : <></>
                        }

                    </div>
                </Modal.Section>
            </Modal>
            {
                IsOpenAdSpecificCollectionModal ? <>
                    <TableCollection Collections={limitPurchaseState.Collections} IsOpenAdSpecificCollectionModal={IsOpenAdSpecificCollectionModal} setIsOpenAddSpecificCollectionModal={setIsOpenAddSpecificCollectionModal} ItemSelected={createLimitPurchaseState.BulkUpdate.ListCollects}></TableCollection>

                </> : <></>
            }
            {Alert}
            {createLimitPurchaseState.IsOpenSaveResult ? <Toast content={createLimitPurchaseState.MessageSaveResult} duration={1600} onDismiss={() => {
                dispatch(setCreateUpdateLimitPurchase({
                    ...createLimitPurchaseState,
                    IsOpenSaveResult: false
                }))
            }} /> : null}
        </>

    )
}

export default LimitPurchase;