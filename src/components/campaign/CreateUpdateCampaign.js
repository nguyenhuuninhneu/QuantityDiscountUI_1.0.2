
import { DataTable, Link, TextStyle, Button, InlineError, OptionList, Card, ContextualSaveBar, Heading, Layout, TextField, Toast, Stack, Modal, List, Checkbox, FormLayout, Icon } from '@shopify/polaris';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUpdateCampaign, setSetting } from '../../state/modules/campaign/actions';
import { setIsNoCampaign, setIsCreatingCampaign, setMenu } from '../../state/modules/app/actions';
import config from '../../config/config';
import { saveCampaign } from '../../state/modules/campaign/operations';
import moreAppConfig from '../../config/moreAppConfig';
import TShirtYellow from '../../assets/images/t-shirt-yellow.svg';
import TShirtGreen from '../../assets/images/t-shirt-green.svg';
import TShirtGray from '../../assets/images/t-shirt-gray.svg';
import TShirtGrey from '../../assets/images/t-shirt-grey.svg';
import ShoeGreen from '../../assets/images/shoe-green.svg';
import AlmostDone from '../../assets/images/almost-done.svg';
import Congratulation from '../../assets/images/congratulation.svg';
import { DeleteMinor, QuestionMarkMajor, CircleInformationMajor, TickMinor, ViewMinor, ConfettiMajor, DiamondAlertMajor, CancelSmallMinor } from '@shopify/polaris-icons';
import Loading from '../../components/plugins/Loading';
import TableCollection from './TableCollection';
import TableProduct from './TableProduct';
import Select from 'react-select';
import axios from 'axios';
import CardOrange from '../../assets/images/card-orange.svg';



const CreateUpdateCampaign = (props) => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const campaignState = useSelector((state) => state.campaign.CreateUpdateCampaign);
    const campaign = campaignState.campaign;
    const myRefTitle = useRef(null);
    const myRefCampaignType = useRef(null);
    const myRefCampaignDetail = useRef(null);
    const myRefDate = useRef(null);
    const scrollToDiscountTitle = () => myRefTitle.current.scrollIntoView();
    const scrollToCampaignType = () => myRefCampaignType.current.scrollIntoView();
    const scrollToCampaignDetail = () => myRefCampaignDetail.current.scrollIntoView();
    const scrollToDate = () => myRefDate.current.scrollIntoView();
    const getOptions = async (input) => {
        await axios.get(config.rootLink + '/FrontEnd/SearchProductPaginateVariant', {
            params: {
                search: input,
                shopID: appState?.Shop.ID,
                shop: appState?.Shop.Domain,
                page: 1,
                pagezise: 100
            }
        })
            .then((res) => {
                // dispatch(setCreateUpdateCampaign(
                //     {
                //         ...campaignState,
                //         SelectOptionProducts: res.data.listOptionProduct,
                //     }));
                var campaignVariants = [];
                if (!appState.IsEditCampaign) {
                    var product = res.data.listOptionProduct;
                    var listVariant = product !== undefined && product !== null && product.map(m => m.ListVariant) != null && product.map(m => m.ListVariant) != undefined ? product.map(m => m.ListVariant)[0] : [];
                    var listVariant2 = product !== undefined && product !== null && product.map(m => m.ListVariant) != null && product.map(m => m.ListVariant) != undefined ? product.map(m => m.ListVariant)[1] : [];
                    campaignVariants = [
                        {
                            ID: Math.floor(100000000 + Math.random() * 900000000),
                            ProductID: 0,
                            VariantID: 0,
                            ListVariant: listVariant,
                            ListVariantSelected: []
                        },
                        {
                            ID: Math.floor(100000000 + Math.random() * 900000000),
                            ProductID: 0,
                            VariantID: 0,
                            ListVariant: listVariant,
                            ListVariantSelected: []
                        }
                    ]
                    // setRowPreview(campaign.ListDetails);
                    dispatch(setCreateUpdateCampaign(
                        {
                            ...campaignState,
                            campaign:
                            {
                                ...campaign,
                                ListVariantsProduct: campaignVariants,
                            },
                            SelectOptionProducts: res.data.listOptionProduct,
                        }));
                }
                if (appState.IsEditCampaign) {
                    dispatch(setCreateUpdateCampaign(
                        {
                            ...campaignState,
                            SelectOptionProducts: res.data.listOptionProduct,
                        }));
                }


            })
            .catch(
                err => console.log(err)
            );
    };
    const getSettingOne = async () => {
        await axios.get(config.rootLink + '/FrontEnd/GetSettingOne', {
            params: {
                shopID: appState?.Shop.ID
            }
        })
            .then((res) => {
                const result = res?.data;
                dispatch(setSetting(result));
            })
            .catch(err => console.log(err))
    }
    const [rowsPreview, setRowPreview] = useState([]);

    useEffect(() => {
        getSettingOne();
        setRowPreview(campaign.ListDetails);
        getOptions('');
    }, []);


    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    const makeMoney = (x, expect) => {
        const result = numberWithCommas(x);
        const pass = result === expect;
        console.log(`${pass ? "✓" : "ERROR ====>"} ${x} => ${result}`);
        return result;
    }
    const [IsOpenAdSpecificCollectionModal, setIsOpenAddSpecificCollectionModal] = useState(false);
    const [IsOpenAdSpecificProductModal, setIsOpenAddSpecificProductModal] = useState(false);
    const [IsHideNotification, setIsHideNotification] = useState(false);


    const handleSelectChangeDiscountType = (value) => {
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                DiscountType: value.value
            },
            IsOpenSaveToolbar: true
        }))
    };

    const [isLoadingStep, setIsLoadingStep] = useState(false);
    const [isEndDate, setIsEndDate] = useState(campaign !== undefined && campaign !== null ? (campaign.ID > 0 && campaign.EndDateEdit !== '' ? true : false) : false);

    function ChangeStep(step) {
        setIsLoadingStep(true);
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                Step: step
            },
            IsOpenSaveToolbar: true
        }))
        setIsLoadingStep(false);
    }

    const [isFirstCampaign, setIsFirstCampaign] = useState(props.IsNoCampaign);

    const handleSelectChangePriceType = (value) => {
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                PriceType: value.value
            },
            IsOpenSaveToolbar: true
        }))
    };

    const handleChangeAcrossAllProduct = (value) => {
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                AllProducts: value,
                // IsSpecificCollect: false,
                // IsSpecificProduct: false,
                // IsVariantProduct: false,
            },
            CheckTypeDiscountVariantValidation: "",
            IsOpenSaveToolbar: true
        }))
    }


    const [checkedSendReportToMail, setCheckedSendReportToMail] = useState(false);
    const handleChangeSendReportToMail = useCallback((newChecked) => setCheckedSendReportToMail(newChecked), []);

    const handleChangeSpecificCollection = (value) => {
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                IsSpecificCollect: value,
                // AllProducts: false,
                // IsVariantProduct: false,
            },
            CheckTypeDiscountVariantValidation: "",
            CheckTypeDiscountCollectValidation: "",
            CheckTypeDiscountProductValidation: "",
            IsOpenSaveToolbar: true
        }))
    }
    const handleChangeSpecificProduct = (value) => {
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                IsSpecificProduct: value,
                // AllProducts: false,
                // IsVariantProduct: false,
            },
            CheckTypeDiscountVariantValidation: "",
            CheckTypeDiscountCollectValidation: "",
            CheckTypeDiscountProductValidation: "",
            IsOpenSaveToolbar: true
        }))
    }
    const handleChangeSpecificVariants = (value) => {
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                IsVariantProduct: value,
                AllProducts: false,
                IsSpecificProduct: false,
                IsSpecificCollect: false,
            },
            CheckTypeDiscountVariantValidation: "",
            CheckTypeDiscountCollectValidation: "",
            CheckTypeDiscountProductValidation: "",
            IsOpenSaveToolbar: true
        }))
    }

    function ValidFormSuportRequest() {

        if (campaignState.YourName.toString() == '' || campaignState.YourName.toString() === null) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                YourNameValidation: 'Name is required'
            }))
            return false;
        }
        if (campaignState.YourEmail.toString() == '' || campaignState.YourEmail.toString() === null) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                YourEmailValidation: 'Email is required'
            }))
            return false;
        }
        if (campaignState.DescribeYourProblem.toString() == '' || campaignState.DescribeYourProblem.toString() === null) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                DescribeYourProblemValidation: 'Describe is required'
            }))
            return false;
        }
        return true;
    }
    function ValidForm() {

        if (campaign.Title.toString() == '' || campaign.Title.toString() === null) {
            scrollToDiscountTitle();
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                TitleValidation: moreAppConfig.TilteValidationText
            }))
            return false;
        }


        var justOneDiscountType = (campaign.AllProducts && !campaign.IsVariantProduct && !campaign.IsSpecificCollect && !campaign.IsSpecificProduct)
            || (campaign.IsVariantProduct && !campaign.AllProducts && !campaign.IsSpecificCollect && !campaign.IsSpecificProduct)
            || ((campaign.IsSpecificCollect || campaign.IsSpecificProduct) && !campaign.IsVariantProduct && !campaign.AllProducts);
        if (!justOneDiscountType) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                CheckTypeDiscountVariantValidation: "Just choose at least one type of discount"
            }))
            scrollToCampaignType();
            return false;
        }
        else {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                CheckTypeDiscountVariantValidation: ""
            }))
        }
        if (campaign.IsSpecificCollect && campaign.ListCollects.length === 0) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                CheckTypeDiscountCollectValidation: "Please choose at least one collection"
            }))
            scrollToCampaignType();
            return false;
        } else {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                CheckTypeDiscountCollectValidation: ""
            }))
        }
        if (campaign.IsSpecificProduct && campaign.ListProducts.length === 0) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                CheckTypeDiscountProductValidation: "Please choose at least one product"
            }))
            scrollToCampaignType();
            return false;
        } else {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                CheckTypeDiscountProductValidation: ""
            }))
        }
        if (campaign.IsVariantProduct && campaign.ListVariantsProduct !== undefined && campaign.ListVariantsProduct !== null && campaign.ListVariantsProduct.length === 0) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                CheckTypeDiscountVariantValidation: "Please choose at least one variant"
            }))
            scrollToCampaignType();
            return false;
        } else {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                CheckTypeDiscountVariantValidation: ""
            }))
        }

        if (!campaign.IsVariantProduct && !campaign.IsSpecificCollect && !campaign.IsSpecificProduct && !campaign.AllProducts) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                CheckTypeDiscountVariantValidation: "Please choose collections, products or variants"
            }))
            scrollToCampaignType();
            return false;
        }
        else {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                CheckTypeDiscountVariantValidation: ""
            }))
        }
        if (campaign.IsVariantProduct && campaign.ListVariantsProduct != undefined && campaign.ListVariantsProduct != null && campaign.ListVariantsProduct.length > 0) {
            var checkVariantsProduct = campaign.ListVariantsProduct.filter(p => p.ListVariantSelected.length === 0).length > 0 ? false : true;
            if (!checkVariantsProduct) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveToolbar: false,
                    CheckTypeDiscountVariantValidation: "Please choose variant for each product"
                }))
                scrollToCampaignType();
                return false;
            }
            let isDuplicate = false;
            // call some function with callback function as argument
            var listProductVariants = campaign.ListVariantsProduct.map(p => p.ProductID)
            isDuplicate = listProductVariants.some((element, index) => {
                return listProductVariants.indexOf(element) !== index
            });
            if (isDuplicate) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveToolbar: false,
                    CheckTypeDiscountVariantValidation: "Duplicate products"
                }))
                scrollToCampaignType();
                return false;
            }
        }
        if (campaign.IsVariantProduct && (campaign.ListVariantsProduct == undefined || campaign.ListVariantsProduct == null)) {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                CheckTypeDiscountVariantValidation: "Please choose at least one variant"
            }))
            scrollToCampaignType();
            return false;

        }
        if (campaign.ListDetails != undefined && campaign.ListDetails.length > 0) {
            var checkQuantityNull = campaign.ListDetails.filter(p => p.Quantity === '').length > 0 ? false : true;
            if (!checkQuantityNull) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveToolbar: false,
                    CampaignDetailValidation: "Minimum quantity is required"
                }))
                scrollToCampaignDetail();
                return false;
            }
            var checkQuantityZero = campaign.ListDetails.filter(p => parseInt(p.Quantity) === 0).length > 0 ? false : true;
            if (!checkQuantityZero) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveToolbar: false,
                    CampaignDetailValidation: "Minimum quantity must be greater than 0"
                }))
                scrollToCampaignDetail();
                return false;
            }
            if (checkQuantityZero && checkQuantityNull) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    CampaignDetailValidation: ""
                }))
            }
            var checkPriceNull = campaign.ListDetails.filter(p => p.PercentOrPrice === '').length > 0 ? false : true;
            if (!checkPriceNull) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveToolbar: false,
                    CampaignDetailValidation: "Discount value is required"
                }))
                scrollToCampaignDetail();
                return false;
            }
            var checkPriceZero = campaign.ListDetails.filter(p => parseInt(p.PercentOrPrice) === 0).length > 0 ? false : true;
            if (!checkPriceZero) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveToolbar: false,
                    CampaignDetailValidation: "Discount value must be greater than 0"
                }))
                scrollToCampaignDetail();
                return false;
            }
            if (checkPriceZero && checkPriceNull) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    CampaignDetailValidation: ""
                }))
            }
        }
        else {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                CampaignDetailValidation: "Campaign detail is required"
            }))
            scrollToCampaignDetail();
            return false;
        }
        if (isEndDate && campaign.EndDateEdit.toString() === '') {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                IsOpenSaveToolbar: false,
                EndTimeValidation: 'Set end date.'
            }))
            scrollToDate();
            return false;
        }
        if ((campaign.StartDateEdit.toString() != '' && isEndDate && campaign.EndDateEdit.toString() != '')) {
            var startTime = Date.parse(campaign.StartDateEdit);
            var endTime = Date.parse(campaign.EndDateEdit);
            if (endTime <= startTime) {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveToolbar: false,
                    EndTimeValidation: moreAppConfig.EndTimeGreateThanStartTimeValidationText
                }))
                scrollToDate();
                return false;
            }
        }
        return true;
    }
    const validateNumber = (e) => {
        if (isNaN(e)) {
            return false;
        } else {
            return true;
        }
    }
    const AddRule = () => {

        var listOld = campaign.ListDetails;
        var item = {
            ID: Math.floor(100000000 + Math.random() * 900000000),
            Quantity: 0,
            PercentOrPrice: 0
        }
        listOld.push(item);
        setRowPreview(listOld);
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                ListDetails: listOld
            }
        }));
    }

    const RemoveCampaignDetail = (id) => {
        var newRows = rowsPreview.filter(p => p.ID != id);
        setRowPreview(newRows);
        var arrPro = campaign.ListDetails.filter(p => p.ID != id);
        dispatch(setCreateUpdateCampaign(
            {
                ...campaignState,
                campaign:
                {
                    ...campaign,
                    ListDetails: arrPro
                },
                IsOpenSaveToolbar: true
            }));
    }
    const AddProduct = () => {
        var listOld = campaign.ListVariantsProduct !== undefined && campaign.ListVariantsProduct !== null ? campaign.ListVariantsProduct : [];
        var firstProduct = campaignState.SelectOptionProducts;
        var listVariant = firstProduct !== undefined ? firstProduct.map(m => m.ListVariant)[0] : [];
        var item = {
            ID: Math.floor(100000000 + Math.random() * 900000000),
            ProductID: firstProduct !== undefined ? firstProduct.ID : 0,
            VariantID: 0,
            ListVariant: listVariant,
            ListVariantSelected: []
        }
        listOld.push(item);
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                ListVariantsProduct: listOld
            }
        }));
    }
    //Variant
    const handleSelectChangeVariant = (item, id, index) => {

        var listVariant = campaignState.SelectOptionProducts.filter(p => p.ProductID == item.value).map(m => m.ListVariant)[0];
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                ListVariantsProduct: campaign.ListVariantsProduct.map((p, i) => (i == index ? {
                    ...p,
                    ProductID: item.value,
                    ListVariant: listVariant
                    // ListVariantSelected: listVariantSelected
                } : p))
            },
            CheckTypeDiscountVariantValidation: "",
            IsOpenSaveToolbar: true
        }))
    }
    const handleChangeCheckVariantByProduct = (item, productID, index) => {

        var listVariant = campaignState.SelectOptionProducts.filter(p => p.ProductID == productID).map(m => m.ListVariant)[0];
        // var listVariantSelected = campaignState.SelectOptionProducts.filter(p=>p.ProductID == productID).map(m=>m.ListVariant).map(k=> k.VariantID);
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                ListVariantsProduct: campaign.ListVariantsProduct.map((p, i) => (p.ProductID == productID ? {
                    ...p,
                    ListVariantSelected: item
                } : p))
            },
            CheckTypeDiscountVariantValidation: "",
            IsOpenSaveToolbar: true
        }))
    }

    const RemoveVariantsProduct = (id) => {
        var arrPro = campaign.ListVariantsProduct.filter(p => p.ID != id);
        dispatch(setCreateUpdateCampaign(
            {
                ...campaignState,
                campaign:
                {
                    ...campaign,
                    ListVariantsProduct: arrPro
                },
                IsOpenSaveToolbar: true
            }));

    }


    function RemoveSpecificCollection(id) {
        var arrPro = campaign.ListCollects.filter(p => p.ID != id);
        dispatch(setCreateUpdateCampaign(
            {
                ...campaignState,
                campaign:
                {
                    ...campaign,
                    ListCollects: arrPro
                },
                CheckTypeDiscountCollectValidation: '',
                IsOpenSaveToolbar: true
            }));
    }



    function RemoveSpecificProduct(id) {
        var arrPro = campaign.ListProducts.filter(p => p.ID != id);
        dispatch(setCreateUpdateCampaign(
            {
                ...campaignState,
                campaign:
                {
                    ...campaign,
                    ListProducts: arrPro
                },
                CheckTypeDiscountProductValidation: '',
                IsOpenSaveToolbar: true
            }));
    }

    return (
        <>
            {
                campaignState.IsLoadingPage ? <Loading></Loading> :
                    <>
                        {campaignState.IsOpenSaveToolbar ?
                            <div className='head'>
                                {
                                    isFirstCampaign && campaign.Step == 1 ? <>
                                        <ContextualSaveBar
                                            message={isFirstCampaign ? "" : "Unsaved changes"}
                                            saveAction={{
                                                content: isFirstCampaign ? (campaign.Step === 2 ? "Save" : "Next Step") : "Save",
                                                onAction: () => {
                                                    if (isFirstCampaign) {
                                                        if (ValidForm()) {
                                                            if (campaign.Step === 2) {
                                                                dispatch(saveCampaign(isFirstCampaign));
                                                            } else {
                                                                ChangeStep(2);
                                                            }
                                                            // dispatch(setCreateUpdateCampaign({
                                                            //     ...campaignState,
                                                            //     IsOpenSaveToolbar: true
                                                            // }))
                                                        }
                                                    }
                                                    else {
                                                        if (ValidForm()) {
                                                            dispatch(saveCampaign(isFirstCampaign));
                                                        }
                                                    }

                                                },
                                                loading: campaignState.IsSaveLoading,
                                            }}

                                        />
                                    </>
                                        : <>
                                            <ContextualSaveBar
                                                message={isFirstCampaign ? "" : "Unsaved changes"}
                                                saveAction={{
                                                    content: isFirstCampaign ? (campaign.Step === 2 ? "Save" : "Next Step") : "Save",
                                                    onAction: () => {
                                                        if (isFirstCampaign) {
                                                            if (ValidForm()) {
                                                                if (campaign.Step === 2) {
                                                                    dispatch(saveCampaign(isFirstCampaign));
                                                                } else {
                                                                    ChangeStep(2);
                                                                }
                                                                // dispatch(setCreateUpdateCampaign({
                                                                //     ...campaignState,
                                                                //     IsOpenSaveToolbar: true
                                                                // }))
                                                            }
                                                        }
                                                        else {
                                                            if (ValidForm()) {
                                                                dispatch(saveCampaign(isFirstCampaign));
                                                            }
                                                        }

                                                    },
                                                    loading: campaignState.IsSaveLoading,
                                                }}
                                                discardAction={{
                                                    content: campaign.Step == 2 && isFirstCampaign ? "Prev Step" : "Discard",
                                                    onAction: () => {
                                                        if (isFirstCampaign) {
                                                            if (campaign.Step == 2) {
                                                                ChangeStep(1);
                                                            } else {
                                                                dispatch(setCreateUpdateCampaign({
                                                                    ...campaignState,
                                                                    IsOpenSaveToolbar: false
                                                                }))
                                                            }
                                                        }
                                                        else {
                                                            dispatch(setCreateUpdateCampaign({
                                                                ...campaignState,
                                                                IsOpenSaveToolbar: false
                                                            }))
                                                        }
                                                    },
                                                }}

                                            />
                                        </>
                                }

                            </div>
                            : <></>}
                        {
                            isFirstCampaign ?
                                <>

                                    <div className="onboarding">
                                        <Heading>Onboarding in minutes!</Heading>
                                        <div className='steper'>
                                            <div className='node node1 complete'>
                                                <div className='number'>
                                                    <span>1</span>
                                                    <Icon
                                                        source={TickMinor}
                                                        color="base" />
                                                </div>
                                                <span className='title'>Install app</span>
                                            </div>
                                            <div className={campaign.Step === 2 || campaign.Step === 3 ? 'node node2 complete' : 'node node2'}>
                                                <div className='number'>
                                                    <span>2</span>
                                                    <Icon
                                                        source={TickMinor}
                                                        color="base" />
                                                </div>
                                                <span className={campaign.Step === 1 ? 'title active' : 'title'}>Create 1st campaign</span>
                                            </div>
                                            <div className={campaign.Step === 3 ? 'node node3 complete' : 'node node3'}>
                                                <div className='number'>
                                                    <span>3</span>
                                                    <Icon
                                                        source={TickMinor}
                                                        color="base" />
                                                </div>
                                                <span className={campaign.Step === 2 || campaign.Step === 3 ? 'title active' : 'title'}>Test campaign</span>
                                            </div>
                                            <div className='cb'>

                                            </div>
                                        </div>
                                    </div>
                                </>
                                : ''
                        }

                        {

                            !isFirstCampaign || (isFirstCampaign && campaign.Step === 1) ? <>
                                <div className="campaign-form">
                                    <div className='colLeft'>
                                        <div className='section general'>
                                            <Layout>
                                                <Layout.Section oneThird>
                                                    <Card>
                                                        <Card.Section>
                                                            <Heading size="small">1. General</Heading>
                                                            <div className='element-general'>
                                                                <div className='flex mt-10'>
                                                                    <span style={{ marginRight: '15px' }} ref={myRefTitle}>Campaign Status</span>
                                                                    <label className="switch">
                                                                        <input type="checkbox" onClick={() => {
                                                                            dispatch(setCreateUpdateCampaign({
                                                                                ...campaignState,
                                                                                campaign: {
                                                                                    ...campaign,
                                                                                    Active: !campaign.Active
                                                                                },
                                                                                IsOpenSaveToolbar: true
                                                                            }))
                                                                        }} className={campaign.Active ? 'active' : ''} id="togBtn" />
                                                                        <div className="slider round">
                                                                            <span className="on">ON</span>
                                                                            <span className="off">OFF</span>
                                                                        </div>
                                                                    </label>
                                                                </div>

                                                                <div className='flex mt-20'>
                                                                    <span className='campaign-title'>
                                                                        <span className='text-title'>Discount title</span>
                                                                        <span className='show-tooltip'>
                                                                            <Icon source={QuestionMarkMajor} color='base' />
                                                                            <span className='tooltip'>Customers will see this in cart and at checkout.</span>
                                                                        </span>
                                                                    </span>
                                                                    <div style={{ flex: '1' }}>
                                                                        <TextField
                                                                            value={campaign.Title}
                                                                            onChange={(e) => {
                                                                                dispatch(setCreateUpdateCampaign({
                                                                                    ...campaignState,
                                                                                    campaign: {
                                                                                        ...campaign,
                                                                                        Title: e
                                                                                    },
                                                                                    IsOpenSaveToolbar: true,
                                                                                    TitleValidation: e == '' ? moreAppConfig.TilteValidationText : null
                                                                                }))
                                                                            }}
                                                                            type="text"
                                                                            placeholder='Flash Sales'
                                                                            error={campaignState.TitleValidation}
                                                                            maxLength={150}
                                                                            showCharacterCount
                                                                        />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </Card.Section>
                                                    </Card>
                                                </Layout.Section>
                                            </Layout>
                                        </div>
                                        <div className='section'>
                                            <Layout>
                                                <Layout.Section oneThird>
                                                    <Card>
                                                        <Card.Section>
                                                            <Heading size="small">2. Campaign Type</Heading>

                                                            <div className='campaign-type pt-10'>
                                                                <div className='flex' ref={myRefCampaignType}>
                                                                    <div className='flex-half'>
                                                                        <Select
                                                                            label="Discount based on"
                                                                            options={moreAppConfig.discounttype}
                                                                            defaultValue={moreAppConfig.discounttype[0]}
                                                                            onChange={(value) => {

                                                                                // value = parseInt(value);
                                                                                handleSelectChangeDiscountType(value);
                                                                                // if (value !== null && value !== undefined && value !== '') {
                                                                                //     dispatch(setSetting({
                                                                                //         ...settingState,
                                                                                //         TitleValidationTheme: ''
                                                                                //     }))
                                                                                // } else {
                                                                                //     dispatch(setSetting({
                                                                                //         ...settingState,
                                                                                //         TitleValidationTheme: moreAppConfig.SettingValidationSelectTheme
                                                                                //     }))
                                                                                // }
                                                                            }}
                                                                            isSearchable={false}
                                                                            value={moreAppConfig.discounttype.filter(p => p.value == campaign.DiscountType)[0] || moreAppConfig.discounttype[0]}
                                                                        />
                                                                    </div>
                                                                    <div className='flex-half'>
                                                                        <Select
                                                                            label="Type of discount"
                                                                            options={moreAppConfig.pricetype}
                                                                            defaultValue={moreAppConfig.pricetype[0]}
                                                                            onChange={(value) => {
                                                                                // value = parseInt(value);
                                                                                handleSelectChangePriceType(value);
                                                                                // if (value !== null && value !== undefined && value !== '') {
                                                                                //     dispatch(setSetting({
                                                                                //         ...settingState,
                                                                                //         TitleValidationTheme: ''
                                                                                //     }))
                                                                                // } else {
                                                                                //     dispatch(setSetting({
                                                                                //         ...settingState,
                                                                                //         TitleValidationTheme: moreAppConfig.SettingValidationSelectTheme
                                                                                //     }))
                                                                                // }
                                                                            }}
                                                                            isSearchable={false}
                                                                            value={moreAppConfig.pricetype.filter(p => p.value == campaign.PriceType)[0] || moreAppConfig.pricetype[0]}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="Polaris-Card" style={{ backgroundColor: '#EBF9FC', marginTop: '15px', marginBottom: '15px' }}>
                                                                    <div className="Polaris-CalloutCard__Container">
                                                                        <div className="Polaris-Card__Section">
                                                                            <div className="Polaris-CalloutCard">
                                                                                <div className="Polaris-CalloutCard__Content">
                                                                                    <div className="Polaris-CalloutCard__Title">
                                                                                        <h2 className="Polaris-Heading Heading-Icon"> <Icon source={CircleInformationMajor} color='red'></Icon>{campaign.DiscountType == 1 ? 'Minimum Cart Quantity' : campaign.DiscountType == 2 ? 'Minimum Same Product Quantity' : campaign.DiscountType == 3 ? 'Minimum Same Variant Quantity' : ''}</h2>
                                                                                    </div>
                                                                                    <div className="Polaris-TextContainer">
                                                                                        {campaign.DiscountType == 1 ?
                                                                                            <>
                                                                                                <p>Discounts are applied based on the total quantity of products in the cart.</p>
                                                                                                <p style={{ fontStyle: 'italic', marginTop: '5px' }}>Example: With a minimum quantity of <strong>3 products</strong> in the cart (shoes, T-shirts, shirts), shoppers can get a 10% discount for the total order value.</p>
                                                                                            </> :
                                                                                            campaign.DiscountType == 2 ?
                                                                                                <>
                                                                                                    <p>Discounts are applied based on the total quantity of a certain product in the cart.</p>
                                                                                                    <p style={{ fontStyle: 'italic', marginTop: '5px' }}>Example: With a minimum quantity of <strong>3 T-shirts</strong> in the cart, shoppers can get a 10% discount for the total value of the <strong>T-shirts</strong></p>
                                                                                                </> :
                                                                                                campaign.DiscountType == 3 ?
                                                                                                    <>
                                                                                                        <p>Discounts are applied based on the total quantity of a certain variant of a product in the cart.</p>
                                                                                                        <p style={{ fontStyle: 'italic', marginTop: '5px' }}>Example: With a minimum quantity of <strong>3 yellow T-shirts</strong> in the cart, shoppers can get a 10% discount for the total value of the yellow <strong>T-shirts</strong></p>
                                                                                                    </>
                                                                                                    : ''}
                                                                                    </div>
                                                                                    <div className="Polaris-CalloutCard__Buttons" style={{ display: 'flex' }}>
                                                                                        {campaign.DiscountType == 3 ?
                                                                                            <>
                                                                                                <img src={TShirtYellow} alt="" style={{ marginLeft: '0' }} className="Polaris-CalloutCard__Image" />
                                                                                                <img src={TShirtYellow} alt="" className="Polaris-CalloutCard__Image" />
                                                                                                <img src={TShirtYellow} alt="" className="Polaris-CalloutCard__Image" />
                                                                                            </> :
                                                                                            campaign.DiscountType == 2 ?
                                                                                                <>
                                                                                                    <img src={TShirtGreen} alt="" style={{ marginLeft: '0' }} className="Polaris-CalloutCard__Image" />
                                                                                                    <img src={TShirtYellow} alt="" className="Polaris-CalloutCard__Image" />
                                                                                                    <img src={TShirtGray} alt="" className="Polaris-CalloutCard__Image" />
                                                                                                </>
                                                                                                : <>
                                                                                                    <>
                                                                                                        <img src={ShoeGreen} alt="" style={{ marginLeft: '0' }} className="Polaris-CalloutCard__Image" />
                                                                                                        <img src={TShirtYellow} alt="" className="Polaris-CalloutCard__Image" />
                                                                                                        <img src={TShirtGrey} alt="" className="Polaris-CalloutCard__Image" />
                                                                                                    </>
                                                                                                </>
                                                                                        }

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <Stack>
                                                                    <Checkbox
                                                                        disabled={campaign.IsVariantProduct}
                                                                        label="Apply the discounts across all products"
                                                                        checked={campaign.AllProducts}
                                                                        onChange={(e) => { handleChangeAcrossAllProduct(e) }}
                                                                    />
                                                                </Stack>
                                                                <div className='throw-line'>
                                                                    <span className='text'>Or</span>
                                                                </div>
                                                                <Stack>
                                                                    <Checkbox
                                                                        disabled={campaign.IsVariantProduct}
                                                                        label="Apply the discounts to specific collections"
                                                                        checked={campaign.IsSpecificCollect}
                                                                        onChange={(e) => { handleChangeSpecificCollection(e) }}
                                                                    />

                                                                </Stack>

                                                                {campaign.IsSpecificCollect ?
                                                                    <>
                                                                        <div className="tags-input-wrapper" onClick={() => {
                                                                            setIsOpenAddSpecificCollectionModal(true)
                                                                        }}>

                                                                            <span className="search">Search collections
                                                                            </span>
                                                                        </div>
                                                                        {


                                                                            campaign.ListCollects != null && campaign.ListCollects != undefined && campaign.ListCollects.length > 0 ?

                                                                                <div className={campaign.ListCollects.length > 10 ? "tags-input-wrapper tags-input-wrapper-scroll" : "tags-input-wrapper"}>
                                                                                    {
                                                                                        campaign.ListCollects.map((item, index) => {

                                                                                            return (
                                                                                                <span className="tag" key={index}>{item.Title}
                                                                                                    <a title='Remove' onClick={() => {
                                                                                                        setIsOpenAddSpecificCollectionModal(false);
                                                                                                        RemoveSpecificCollection(item.ID)

                                                                                                    }}>×</a>
                                                                                                </span>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                                :
                                                                                <>

                                                                                </>

                                                                        }
                                                                    </>
                                                                    : ''}
                                                                <InlineError message={campaignState.CheckTypeDiscountCollectValidation} fieldID="collect" />
                                                                <Stack>
                                                                    <Checkbox
                                                                        disabled={campaign.IsVariantProduct}
                                                                        label="Apply the discounts to specific products"
                                                                        checked={campaign.IsSpecificProduct}
                                                                        onChange={(e) => { handleChangeSpecificProduct(e) }}
                                                                    />

                                                                </Stack>
                                                                {campaign.IsSpecificProduct ?
                                                                    <>
                                                                        <div className="tags-input-wrapper" onClick={() => {

                                                                            setIsOpenAddSpecificProductModal(true)
                                                                        }}>
                                                                            <span className="search">Search products
                                                                            </span>

                                                                        </div>
                                                                        {
                                                                            campaign.ListProducts != null && campaign.ListProducts != undefined && campaign.ListProducts.length > 0 ?
                                                                            <div className={campaign.ListProducts.length > 10 ? "tags-input-wrapper tags-input-wrapper-scroll" : "tags-input-wrapper"}>
                                                                                    {
                                                                                        campaign.ListProducts.map((item, index) => {
                                                                                            return (
                                                                                                <span className="tag" key={index}>{item.Title}
                                                                                                    <a title='Remove' onClick={() => {
                                                                                                        RemoveSpecificProduct(item.ID)
                                                                                                    }}>×</a>
                                                                                                </span>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </div>
                                                                                :
                                                                                <>

                                                                                </>
                                                                        }
                                                                        <InlineError message={campaignState.CheckTypeDiscountProductValidation} fieldID="product" />
                                                                    </>
                                                                    : ''}
                                                                <div className='throw-line'>
                                                                    <span className='text'>Or</span>
                                                                </div>
                                                                <Stack >
                                                                    <Checkbox
                                                                        label="Apply the discounts to specific variants"
                                                                        checked={campaign.IsVariantProduct}
                                                                        disabled={campaign.ID > 0 ? true : false}
                                                                        onChange={(e) => { handleChangeSpecificVariants(e) }}
                                                                    />

                                                                </Stack>
                                                                {campaign.IsVariantProduct ?
                                                                    <>
                                                                        <div className='variant-product'>
                                                                            <div className='timeline'>
                                                                                {campaign.ListVariantsProduct !== undefined && campaign.ListVariantsProduct !== null && campaign.ListVariantsProduct
                                                                                    .map(
                                                                                        ({ ID, ProductID, VariantID, ListVariant, ListVariantSelected }, index) => (
                                                                                            <div className='node'>
                                                                                                <Stack wrap={false} alignment="leading" spacing="loose">
                                                                                                    <Stack.Item fill>
                                                                                                        <FormLayout>
                                                                                                            <FormLayout.Group condensed>
                                                                                                                {/* <Select
                                                                                                                        // label="Discount based on"
                                                                                                                        options={campaignState.SelectOptionProducts}
                                                                                                                        defaultValue={campaignState.SelectOptionProducts[0]}
                                                                                                                        onChange={(value) => {

                                                                                                                            handleSelectChangeVariant(value, ID, index);

                                                                                                                        }}
                                                                                                                        isSearchable={false}
                                                                                                                        value={campaignState.SelectOptionProducts.filter(p => p.ProductID == ProductID)[0] || campaignState.SelectOptionProducts[0]}
                                                                                                                    /> */}
                                                                                                                <Select
                                                                                                                    name="form-field-name"
                                                                                                                    value="one"
                                                                                                                    loadOptions={getOptions}
                                                                                                                    options={campaignState.SelectOptionProducts}
                                                                                                                    onChange={(value) => {
                                                                                                                        handleSelectChangeVariant(value, ID, index);
                                                                                                                    }}
                                                                                                                    value={campaignState.SelectOptionProducts != null && campaignState.SelectOptionProducts.filter(p => p.ProductID == ProductID)[0] || campaignState.SelectOptionProducts != null && campaignState.SelectOptionProducts[0]}
                                                                                                                />
                                                                                                                <Card>
                                                                                                                    <OptionList
                                                                                                                        onChange={(e) => { handleChangeCheckVariantByProduct(e, ProductID, index) }}
                                                                                                                        options={ListVariant}
                                                                                                                        selected={ListVariantSelected}
                                                                                                                        allowMultiple
                                                                                                                    />
                                                                                                                </Card>
                                                                                                            </FormLayout.Group>
                                                                                                        </FormLayout>
                                                                                                    </Stack.Item>
                                                                                                    <Button icon={DeleteMinor}
                                                                                                        onClick={() => { RemoveVariantsProduct(ID) }} accessibilityLabel="Remove item" />
                                                                                                </Stack>
                                                                                            </div>
                                                                                        ))}
                                                                                <div className='node'>
                                                                                    <Button primary onClick={() => {
                                                                                        AddProduct()
                                                                                    }}>Add Product</Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                    : ''}
                                                                <InlineError message={campaignState.CheckTypeDiscountVariantValidation} fieldID="collection12" />
                                                            </div>



                                                        </Card.Section>
                                                    </Card>
                                                </Layout.Section>
                                            </Layout>
                                        </div>
                                        <div className='section'>
                                            <Layout>
                                                <Layout.Section oneThird>
                                                    <Card>
                                                        <Card.Section>
                                                            <div className="campaign-detail" ref={myRefCampaignDetail}>
                                                                <Heading size="small">3. Campaign Detail</Heading>
                                                                <div className='timeline'>
                                                                    <Stack wrap={false} alignment="leading" spacing="loose">
                                                                        <Stack.Item fill>
                                                                            <FormLayout>
                                                                                <FormLayout.Group condensed>
                                                                                    <TextStyle>{campaign.DiscountType === 1 ? 'Minimum Cart Quantity' : campaign.DiscountType === 2 ? 'Minimum Same Product Quantity' : campaign.DiscountType === 3 ? 'Minimum Same Variant Quantity' : 'Minimum Cart Quantity'}</TextStyle>
                                                                                    <p>{campaign.PriceType === 1 ? '% discount' : campaign.PriceType === 2 ? 'Discount amount' : campaign.PriceType === 3 ? 'Fixed price per item' : '% discount'}</p>
                                                                                </FormLayout.Group>
                                                                            </FormLayout>
                                                                        </Stack.Item>

                                                                    </Stack>
                                                                    {campaign.ListDetails != null && campaign.ListDetails != undefined && campaign.ListDetails
                                                                        .map(
                                                                            ({ ID, Quantity, PercentOrPrice }, index) => (
                                                                                <div className='node'>
                                                                                    <Stack wrap={false} alignment="leading" spacing="loose">
                                                                                        <Stack.Item fill>
                                                                                            <FormLayout>
                                                                                                <FormLayout.Group condensed>
                                                                                                    <TextField
                                                                                                        value={Quantity.toString()}
                                                                                                        onChange={(e) => {
                                                                                                            var newRows = rowsPreview.map((p, i) =>
                                                                                                                (i == index ? { ...p, Quantity: e } : p)
                                                                                                            )
                                                                                                            setRowPreview(newRows);
                                                                                                            dispatch(setCreateUpdateCampaign({
                                                                                                                ...campaignState,
                                                                                                                campaign: {
                                                                                                                    ...campaign,
                                                                                                                    ListDetails: campaign.ListDetails.map((p, i) => (i == index ? {
                                                                                                                        ...p,
                                                                                                                        Quantity: validateNumber(e.trim()) ? e.trim() : "0"
                                                                                                                    } : p))
                                                                                                                },
                                                                                                                CampaignDetailValidation: "",
                                                                                                                IsOpenSaveToolbar: true
                                                                                                            }))
                                                                                                        }}
                                                                                                        type="text"
                                                                                                    />
                                                                                                    <div className='price-discount'>
                                                                                                        <TextField
                                                                                                            value={PercentOrPrice.toString()}
                                                                                                            onChange={(e) => {

                                                                                                                dispatch(setCreateUpdateCampaign({
                                                                                                                    ...campaignState,
                                                                                                                    campaign: {
                                                                                                                        ...campaign,
                                                                                                                        ListDetails: campaign.ListDetails.map((p, i) => (i == index ? {
                                                                                                                            ...p,
                                                                                                                            PercentOrPrice: validateNumber(e.trim()) ? e.trim() : "0"
                                                                                                                        } : p))
                                                                                                                    },
                                                                                                                    CampaignDetailValidation: "",
                                                                                                                    IsOpenSaveToolbar: true
                                                                                                                }))
                                                                                                                var newRows = rowsPreview.map((p, i) =>
                                                                                                                    (i == index ? { ...p, PercentOrPrice: e } : p)
                                                                                                                )
                                                                                                                setRowPreview(newRows);
                                                                                                            }}
                                                                                                            type="text"
                                                                                                        />
                                                                                                        <span className='unit'>{campaign.PriceType === 1 ? '%' : '$'}</span>
                                                                                                    </div>

                                                                                                </FormLayout.Group>
                                                                                            </FormLayout>
                                                                                        </Stack.Item>
                                                                                        <Button icon={DeleteMinor}
                                                                                            onClick={() => {
                                                                                                RemoveCampaignDetail(ID)
                                                                                            }} accessibilityLabel="Remove item" />
                                                                                    </Stack>
                                                                                </div>

                                                                            ))}
                                                                    <InlineError message={campaignState.CampaignDetailValidation} fieldID="myFieldID" />

                                                                    <div className='node'>
                                                                        <Button primary onClick={() => {
                                                                            AddRule()
                                                                        }}>Add Rule</Button>

                                                                    </div>

                                                                </div>

                                                                <div className='campaign-time'>
                                                                    {/* <div className="Polaris-Labelled__LabelWrapper">
                                            <div className="Polaris-Label">
                                                <label id="PolarisTextField2Label" htmlFor="PolarisTextField2" className="Polaris-Label__Text">Campaign Duration <span className="risk-text">(*)</span>
                                                </label>
                                            </div>
                                        </div> */}
                                                                    <div className='flex' ref={myRefDate}>
                                                                        <div className='flex-half'>
                                                                            <TextField
                                                                                label='Start date'
                                                                                value={campaign.StartDateEdit}
                                                                                type="date"
                                                                                error={campaignState.StartTimeValidation}
                                                                                onChange={(e) => {
                                                                                    dispatch(setCreateUpdateCampaign({
                                                                                        ...campaignState,
                                                                                        campaign: {
                                                                                            ...campaign,
                                                                                            StartDateEdit: e,
                                                                                            StartDate: e
                                                                                        },
                                                                                        IsOpenSaveToolbar: true,
                                                                                        StartTimeValidation: e == '' ? moreAppConfig.StartTimeValidationText : null,
                                                                                        EndTimeValidation: ''
                                                                                    }))

                                                                                }}

                                                                            />
                                                                        </div>
                                                                        <div className='flex-half'>
                                                                            <Checkbox
                                                                                label="Set end date"
                                                                                checked={isEndDate}
                                                                                onChange={(e) => {
                                                                                    setIsEndDate(e);
                                                                                    dispatch(setCreateUpdateCampaign({
                                                                                        ...campaignState,
                                                                                        IsOpenSaveToolbar: true,
                                                                                        EndTimeValidation: '',
                                                                                    }))
                                                                                    if (e == false) {
                                                                                        dispatch(setCreateUpdateCampaign({
                                                                                            ...campaignState,
                                                                                            campaign: {
                                                                                                ...campaign,
                                                                                                EndDateEdit: '',
                                                                                                EndDate: '',
                                                                                            },
                                                                                        }))
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <TextField
                                                                                disabled={!isEndDate}
                                                                                value={isEndDate ? campaign.EndDateEdit : campaign.EndDateEditEmpty}
                                                                                type={isEndDate ? "date" : "text"}
                                                                                error={campaignState.EndTimeValidation}
                                                                                onChange={(e) => {
                                                                                    dispatch(setCreateUpdateCampaign({
                                                                                        ...campaignState,
                                                                                        campaign: {
                                                                                            ...campaign,
                                                                                            EndDateEdit: e,
                                                                                            EndDate: e
                                                                                        },
                                                                                        IsOpenSaveToolbar: true,
                                                                                        EndTimeValidation: e == '' ? moreAppConfig.EndTimeValidationText : null
                                                                                    }))

                                                                                }}


                                                                            />
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
                                                        <h2 className="Polaris-Heading Heading-Bottom-10 Heading-Icon-Right"> {campaignState.Setting.TextQuantityBreaks}
                                                            {/* <Icon source={ConfettiMajor} color='base'></Icon> */}

                                                        </h2>
                                                        <Card>
                                                            <div className='item-center'>
                                                                {campaignState.Setting.LayoutInProductPage === 4 ? <>
                                                                    <DataTable
                                                                        columnContentTypes={[
                                                                            'text',
                                                                            (campaign.PriceType !== 3 ? 'text' : <></>),
                                                                            'text',
                                                                        ]}
                                                                        headings={[
                                                                            'Quantity',
                                                                            (campaign.PriceType !== 3 ? 'Discount' : <></>),
                                                                            'Discounted Price'
                                                                        ]}
                                                                        rows={
                                                                            rowsPreview.map((item, index) => {
                                                                                return (
                                                                                    ['Buy ' + item.Quantity + '+',
                                                                                    (campaign.PriceType === 1 ? item.PercentOrPrice + '%' : campaign.PriceType === 2 ? item.PercentOrPrice + '$' : <></>),
                                                                                    item.PercentOrPrice === 0 ? 0 : (campaign.PriceType === 1 ? Math.floor(100 * (1 - (item.PercentOrPrice / 100)), 2) : campaign.PriceType === 2 ? 100 - item.PercentOrPrice : campaign.PriceType === 3 ? item.PercentOrPrice : 0) + '$']
                                                                                )
                                                                            })
                                                                        }
                                                                    />
                                                                </> : campaignState.Setting.LayoutInProductPage === 1 ? <>
                                                                    <div className=""><div className="Polaris-DataTable__Navigation">
                                                                        <button className="Polaris-Button Polaris-Button--disabled Polaris-Button--plain Polaris-Button--iconOnly" aria-label="" type="button" disabled=""><span className="Polaris-Button__Content">
                                                                            <span className="Polaris-Button__Icon"><span className="Polaris-Icon"><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M12 16a.997.997 0 0 1-.707-.293l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L8.414 10l4.293 4.293A.999.999 0 0 1 12 16z"></path></svg></span></span></span></button><button className="Polaris-Button Polaris-Button--plain Polaris-Button--iconOnly" aria-label="" type="button"><span className="Polaris-Button__Content"><span className="Polaris-Button__Icon"><span className="Polaris-Icon"><svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true"><path d="M8 16a.999.999 0 0 1-.707-1.707L11.586 10 7.293 5.707a.999.999 0 1 1 1.414-1.414l5 5a.999.999 0 0 1 0 1.414l-5 5A.997.997 0 0 1 8 16z"></path></svg></span></span></span></button></div><div className="Polaris-DataTable"><div className="Polaris-DataTable__ScrollContainer">
                                                                                <table className="Polaris-DataTable__Table" >
                                                                                    {/* style={{ padding: settingState.Setting.TablePadding + 'px', border: settingState.Setting.TableBorderSize + 'px solid #fff' }} */}
                                                                                    <tbody>
                                                                                        <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                                                                            {/* style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px' }} */}
                                                                                            <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">
                                                                                                {/* {settingState.Setting.TextQuantity} */}
                                                                                                Quantity
                                                                                            </th>
                                                                                            {
                                                                                                rowsPreview.map((item, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">
                                                                                                                Buy {item.Quantity}+
                                                                                                            </td>
                                                                                                        </>
                                                                                                    )
                                                                                                })
                                                                                            }

                                                                                        </tr>
                                                                                        <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                                                                            {/* style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px' }} */}
                                                                                            <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">
                                                                                                Discount
                                                                                                {/* {settingState.Setting.TextDiscount} */}
                                                                                            </th>
                                                                                            {
                                                                                                rowsPreview.map((item, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">
                                                                                                                {(campaign.PriceType === 1 ? item.PercentOrPrice + '%' : campaign.PriceType === 2 ? item.PercentOrPrice + '$' : <></>)}
                                                                                                            </td>
                                                                                                        </>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </tr>
                                                                                        <tr className="Polaris-DataTable__TableRow Polaris-DataTable--hoverable">
                                                                                            {/* style={{ fontSize: settingState.Setting.TableFontSizeHeading + 'px' }} */}
                                                                                            <th data-polaris-header-cell="true" className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop Polaris-DataTable__Cell--firstColumn Polaris-DataTable__Cell--header Polaris-DataTable__Cell--header-border-none" scope="col">
                                                                                                Discounted price
                                                                                                {/* {settingState.Setting.TextDiscountPrice} */}
                                                                                            </th>
                                                                                            {
                                                                                                rowsPreview.map((item, index) => {
                                                                                                    return (
                                                                                                        <>
                                                                                                            <td className="Polaris-DataTable__Cell Polaris-DataTable__Cell--verticalAlignTop">
                                                                                                                {item.PercentOrPrice === 0 ? 0 : (campaign.PriceType === 1 ? Math.floor(100 * (1 - (item.PercentOrPrice / 100)), 2) : campaign.PriceType === 2 ? 100 - item.PercentOrPrice : campaign.PriceType === 3 ? item.PercentOrPrice : 0) + '$'}
                                                                                                            </td>
                                                                                                        </>
                                                                                                    )
                                                                                                })
                                                                                            }
                                                                                        </tr>


                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </> : <>

                                                                </>}

                                                            </div>


                                                        </Card>
                                                        {

                                                            campaignState.Setting.LayoutInProductPage === 3 ? <>

                                                                <div className="Polaris-CalloutCard__Buttons">
                                                                    <div className={rowsPreview != null && rowsPreview != undefined && rowsPreview.length > 3 ? 'list-card-scroll' : 'list-card'}>
                                                                        {
                                                                            rowsPreview.map((item, index) => {
                                                                                return (
                                                                                    <>

                                                                                        <div className='card-orange'>
                                                                                            <img src={CardOrange} alt="" style={{ marginLeft: '0' }} className="Polaris-CalloutCard__Image" />
                                                                                            <p className="buy">Buy {item.Quantity}+</p>
                                                                                            <p className="get">get</p>
                                                                                            <p className="off">{item.PercentOrPrice}{campaign.PriceType === 1 ? '%' : '$'} off</p>
                                                                                        </div>
                                                                                        {/* {
                                                                                        (index + 1) % 3 === 0 ? <>
                                                                                            <div className="cb"></div>
                                                                                        </> : <></>
                                                                                    }       */}

                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                                : <></>
                                                        }
                                                        <div className="cb"></div>
                                                        {
                                                            campaignState.Setting.ShowDescription ? <>
                                                                <p className='discount-applied'> {
                                                                    campaign.DiscountType === 3 ?
                                                                        "This discount is applied to the total quantity of the following variants in your cart: M / Black, L - Yellow"
                                                                        :
                                                                        "This discount is applied to the total quantity of products in your cart"
                                                                }</p>
                                                            </> : <></>
                                                        }

                                                    </div>

                                                </div>
                                                <p style={{ fontStyle: 'italic' }}>Note:</p>
                                                <List type="bullet">
                                                    <List.Item>Customized design and CSS can be set up later in Settings Tab</List.Item>
                                                    <List.Item> Original product price in the preview is 100$</List.Item>
                                                </List>
                                                {/* <p style={{ fontStyle: 'italic', paddingLeft: '10px' }}>Customized design and CSS can be set up later in Settings Tab</p> */}

                                            </div>
                                        </div>
                                    </div>
                                    <div className='cb'>

                                    </div>

                                    {
                                        IsOpenAdSpecificCollectionModal ? <>
                                            <TableCollection Collections={campaignState.Collections} IsOpenAdSpecificCollectionModal={IsOpenAdSpecificCollectionModal} setIsOpenAddSpecificCollectionModal={setIsOpenAddSpecificCollectionModal} ItemSelected={campaign.ListCollects}></TableCollection>

                                        </> : <></>
                                    }
                                    {
                                        IsOpenAdSpecificProductModal ? <>
                                            <TableProduct Products={campaignState.Products} IsOpenAdSpecificProductModal={IsOpenAdSpecificProductModal} setIsOpenAddSpecificProductModal={setIsOpenAddSpecificProductModal} ItemSelected={campaign.ListProducts}></TableProduct>

                                        </> : <></>
                                    }

                                </div>
                            </> : ''
                        }

                        {
                            isFirstCampaign && campaign.Step === 2 ?
                                <>
                                    <div className='create-1st-campaign'>
                                        <Layout>
                                            <Layout.Section>
                                                <img src={AlmostDone} alt="" className="Polaris-CalloutCard__Image image-campaign" />
                                                <p className='title'>Almost Done!</p>
                                                <p style={{ marginTop: '25px', marginBottom: '10px' }}>Visit <Link onClick={() => {
                                                    window.open('https://' + appState.Shop?.Domain, '_blank');

                                                }} title={appState.Shop?.Domain + ' Shop'}> {appState.Shop?.Domain} Shop</Link>, move to the products that have the discounts applied and check in turn:</p>
                                                <List type="number">
                                                    <List.Item>In product detail page: there is a table that shows the discounts program.</List.Item>
                                                    <List.Item>In the cart: the discounts work correctly.</List.Item>
                                                    <List.Item>In the check-out page: the discounts work correctly.</List.Item>
                                                </List>

                                                <p style={{ marginTop: '20px', marginBottom: '20px' }}>If all of the above are correct, you can save the campaign to finish. If not, dont worry! You can send the support request and we will respond in the shortest amount of time.</p>
                                                <div className='group-button'>
                                                    <Button primary={false} onClick={() => {
                                                        //save campaign
                                                        dispatch(setCreateUpdateCampaign({
                                                            ...campaignState,
                                                            IsShowSendSupport: true,
                                                        }))
                                                        // dispatch(saveCampaign(isFirstCampaign));
                                                    }}>Send support request</Button>
                                                    <Button primary={true} onClick={() => {
                                                        //save campaign
                                                        dispatch(saveCampaign(isFirstCampaign));
                                                    }}>Save campaign</Button>
                                                </div>
                                                {
                                                    !IsHideNotification ? <>
                                                        <div className="Polaris-Card" style={{ backgroundColor: '#FFF4F4', marginTop: '15px', marginBottom: '15px' }}>
                                                            <div className="Polaris-CalloutCard__Container">
                                                                <div className="Polaris-Card__Section relative">
                                                                    <div className="absolute" onClick={() => {
                                                                        setIsHideNotification(true);
                                                                    }}><Icon source={CancelSmallMinor}></Icon></div>
                                                                    <div className="Polaris-CalloutCard">
                                                                        <div className="Polaris-CalloutCard__Content">
                                                                            <div className="Polaris-CalloutCard__Title">
                                                                                <h2 className="Polaris-Heading Heading-Icon Diamond-Red"> <Icon source={DiamondAlertMajor} ></Icon> Activate Quantity Discount before publishing a new campaign
                                                                                </h2>
                                                                            </div>
                                                                            <div className="Polaris-TextContainer">
                                                                                <p>Our Quantity Discount app uses the new Shopify app embed feature. You need to enable this feature in the Shopify Editor before publish a new campaign.</p>
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
                                                    </>
                                                        :
                                                        <></>
                                                }

                                                {/* <div className="Polaris-Card" style={{ backgroundColor: '#EBF9FC', marginTop: '15px', marginBottom: '15px' }}>
                                                    <div className="Polaris-CalloutCard__Container">
                                                        <div className="Polaris-Card__Section">
                                                            <div className="Polaris-CalloutCard">
                                                                <div className="Polaris-CalloutCard__Content">
                                                                    <div className="Polaris-CalloutCard__Title">
                                                                        <h2 className="Polaris-Heading Heading-Icon"> <Icon source={CircleInformationMajor} color='red'></Icon> Tip for quick fix if the campaign doesn’t work
                                                                        </h2>
                                                                    </div>
                                                                    <div className="Polaris-TextContainer">
                                                                        <p>If your store is using the "Debut" theme or extends from the "Debut theme" of Shopify, or if you have some errors when updating cart, checking out cart,... please click in here to fix conflict with our app with your theme.</p>
                                                                    </div>
                                                                    <div className="Polaris-CalloutCard__Buttons">
                                                                        <Button primary={false} onClick={() => {
                                                                        }}>Fix the conflict</Button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}


                                            </Layout.Section>
                                        </Layout>
                                    </div>
                                    <Modal
                                        open={campaignState.IsShowSendSupport}
                                        onClose={() => {
                                            dispatch(setCreateUpdateCampaign({
                                                ...campaignState,
                                                IsShowSendSupport: false
                                            }))
                                        }}
                                        title="Support request"
                                        primaryAction={{
                                            content: 'Send',
                                            onAction: () => {
                                                if (ValidFormSuportRequest()) {
                                                    dispatch(saveCampaign(isFirstCampaign))
                                                }
                                            },
                                        }}
                                        secondaryActions={[
                                            {
                                                content: 'Cancel',
                                                onAction: () => {
                                                    dispatch(setCreateUpdateCampaign({
                                                        ...campaignState,
                                                        IsShowSendSupport: false
                                                    }))
                                                },
                                            },
                                        ]}
                                    >
                                        <Modal.Section>
                                            <TextField
                                                label="Your name"
                                                value={campaignState.YourName}
                                                onChange={(e) => {
                                                    dispatch(setCreateUpdateCampaign({
                                                        ...campaignState,
                                                        YourName: e,
                                                        YourNameValidation: e == '' ? 'Name is required' : ''
                                                    }))
                                                }}
                                                error={campaignState.YourNameValidation}
                                                type="text"
                                            />
                                            <div class="break-line"></div>
                                            <TextField
                                                label="Your email"
                                                value={campaignState.YourEmail}
                                                onChange={(e) => {
                                                    dispatch(setCreateUpdateCampaign({
                                                        ...campaignState,
                                                        YourEmail: e,
                                                        YourEmailValidation: e == '' ? 'Email is required' : ''
                                                    }))
                                                }}
                                                error={campaignState.YourEmailValidation}
                                                type="text"
                                            />
                                            <div class="break-line"></div>
                                            <TextField
                                                label="Describe your problem"
                                                value={campaignState.DescribeYourProblem}
                                                onChange={(e) => {
                                                    dispatch(setCreateUpdateCampaign({
                                                        ...campaignState,
                                                        DescribeYourProblem: e,
                                                        DescribeYourProblemValidation: e == '' ? 'Describe is required' : ''
                                                    }))
                                                }}
                                                multiline={4}
                                                error={campaignState.DescribeYourProblemValidation}
                                                type="text"
                                            />
                                        </Modal.Section>
                                    </Modal>
                                </> : ''
                        }
                        {
                            isFirstCampaign && campaign.Step === 3 ?
                                <>
                                    <div className='congratulation'>
                                        <Layout>
                                            <Layout.Section>
                                                <img src={Congratulation} alt="" className="Polaris-CalloutCard__Image image-campaign" />
                                                <p className='title'>Congratulation!</p>
                                                <p style={{ marginTop: '25px', marginBottom: '10px' }}>You have successfully created your first campaign! Let’s wait for the sales to explode!
                                                </p>
                                                <p style={{ marginTop: '20px', marginBottom: '20px' }}>One more thing: You can subcribe to receive our email about the campaign report as well as suggestions to make the campaign more effective. If you find this app work well, don’t forget to rate us in Shopify!</p>
                                                <Stack>
                                                    <Checkbox
                                                        label="Send the report and suggestions about the campaign to my email."
                                                        checked={checkedSendReportToMail}
                                                        onChange={(e) => { setCheckedSendReportToMail(e); handleChangeSendReportToMail(e) }}
                                                    />
                                                </Stack>
                                                <div className='group-button mt-20'>
                                                    <Button primary={false} onClick={() => {
                                                        dispatch(setCreateUpdateCampaign({
                                                            ...campaignState,
                                                            campaign: {
                                                                ...campaign,
                                                                Step: 1
                                                            },
                                                        }))
                                                        dispatch(setIsCreatingCampaign(false))
                                                        dispatch(setMenu(moreAppConfig.Menu.MANAGECAMPAIGN))
                                                        dispatch(setIsNoCampaign(false))
                                                    }}>Manage campaign</Button>
                                                    <Button primary={true} onClick={() => {
                                                    }}>Rate us in Shopify</Button>
                                                </div>

                                            </Layout.Section>
                                        </Layout>
                                    </div>
                                </>
                                : ''
                        }

                    </>
            }
            {campaignState.IsOpenSaveResult ? <Toast content={campaignState.MessageSaveResult} duration={4000} onDismiss={() => {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveResult: null
                }))
            }} /> : null}
        </>

    )
}

export default CreateUpdateCampaign;