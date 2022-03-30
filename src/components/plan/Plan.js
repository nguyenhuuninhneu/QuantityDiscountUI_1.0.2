import '../../assets/css/plan.css'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Icon, Toast } from '@shopify/polaris';
import { CircleTickMajor } from '@shopify/polaris-icons';
import { setPlan } from '../../state/modules/plan/actions';
import Loading from '../../components/plugins/Loading';
import { fetchPlan, Upgrade, Downgrade } from '../../state/modules/plan/operations';

function Plan() {
    const dispatch = useDispatch();
    const planState = useSelector((state) => state.plan.Plan);
    useEffect(() => {
        dispatch(fetchPlan());
    }, [dispatch]);
    return (
        <>
            {
                planState.IsLoadingPage ? <Loading></Loading> :
                    <>
                        <div className='plan'>
                            <div className='table-plan'>
                                <div className='header'>
                                    <div className='item'>
                                        <div className='col col1'>
                                            Plan
                                        </div>
                                        <div className='col col2'>
                                            Basic
                                        </div>
                                        <div className='col col3'>
                                            Advance
                                        </div>
                                        <div className='cb'></div>
                                    </div>
                                </div>
                                <div className='body'>
                                    <div className='item'>
                                        <div className='col col1'>
                                            Maximum number of discount campaigns
                                        </div>
                                        <div className='col col2'>
                                            5 campaigns
                                        </div>
                                        <div className='col col3'>
                                            Unlimited
                                        </div>
                                        <div className='cb'></div>
                                    </div>
                                    <div className='item'>
                                        <div className='col col1'>
                                            Maximum number of limit purchase campaigns
                                        </div>
                                        <div className='col col2'>
                                            Unlimited
                                        </div>
                                        <div className='col col3'>
                                            Unlimited
                                        </div>
                                        <div className='cb'></div>
                                    </div>
                                    <div className='item'>
                                        <div className='col col1'>
                                            Work with “Buy it now”
                                        </div>
                                        <div className='col col2'>
                                            -
                                        </div>
                                        <div className='col col3'>
                                            <Icon
                                                source={CircleTickMajor}
                                                color="base" />
                                        </div>
                                        <div className='cb'></div>
                                    </div>
                                    <div className='item'>
                                        <div className='col col1'>
                                            Show upsell notification in cart page
                                        </div>
                                        <div className='col col2'>
                                            -
                                        </div>
                                        <div className='col col3'>
                                            <Icon
                                                source={CircleTickMajor}
                                                color="base" />
                                        </div>
                                        <div className='cb'></div>
                                    </div>
                                    <div className='item'>
                                        <div className='col col1'>
                                            Statistical analysis
                                        </div>
                                        <div className='col col2'>
                                            -
                                        </div>
                                        <div className='col col3'>
                                            <Icon
                                                source={CircleTickMajor}
                                                color="base" />
                                        </div>
                                        <div className='cb'></div>
                                    </div>
                                    <div className='item price'>
                                        <div className='col col1'>
                                            Price
                                        </div>
                                        <div className='col col2'>
                                            $8/month
                                        </div>
                                        <div className='col col3'>
                                            $11/month
                                        </div>
                                        <div className='cb'></div>
                                    </div>
                                    <div className='item action'>
                                        <div className='col col1'>
                                            <span style={{ visibility: 'hidden' }}>.</span>
                                        </div>
                                        <div className='col col2'>
                                            {
                                                planState.PlanNumber === 0 ?
                                                    <>
                                                        <Button disabled={true} onClick={() => {

                                                        }}>Current plan</Button>
                                                    </>
                                                    :
                                                    <>
                                                        <Button onClick={() => {
                                                            dispatch(setPlan({
                                                                ...planState,
                                                                IsOpenDowngrade: true
                                                            }))
                                                        }}>Downgrade</Button>
                                                    </>
                                            }

                                        </div>
                                        <div className='col col3'>
                                            {
                                                planState.StartFreeTrial == 0 ? <>
                                                    <Button primary onClick={() => {
                                                        dispatch(setPlan({
                                                            ...planState,
                                                            IsOpenStartFreeTrial: true
                                                        }))
                                                    }}>Start free trial</Button>
                                                </> : planState.PlanNumber === 1 ?
                                                    <>
                                                        <Button disabled={true} onClick={() => {

                                                        }}>Current plan</Button>
                                                    </>
                                                    :
                                                    <>
                                                        <Button primary onClick={() => {
                                                            dispatch(setPlan({
                                                                ...planState,
                                                                IsOpenUpgrade: true
                                                            }))
                                                        }}>Upgrade</Button>
                                                    </>
                                            }

                                        </div>
                                        <div className='cb'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }

            <Modal
                open={planState.IsOpenUpgrade}
                onClose={() => {
                    dispatch(setPlan({
                        ...planState,
                        IsOpenUpgrade: false
                    }))

                }}
                title="Do you want to upgrade to Advance plan?"
                primaryAction={{
                    content: 'Upgrade',
                    onAction: () => {
                        dispatch(Upgrade(true))
                    },
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => {
                            dispatch(setPlan({
                                ...planState,
                                IsOpenUpgrade: false
                            }))
                        },
                    },
                ]}
            >

            </Modal>
            <Modal
                open={planState.IsOpenDowngrade}
                onClose={() => {
                    dispatch(setPlan({
                        ...planState,
                        IsOpenDowngrade: false
                    }))

                }}
                title="Do you want to downgrade to Basic plan?"
                primaryAction={{
                    content: 'Downgrade',
                    onAction: () => {
                        dispatch(Downgrade())
                    },
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => {
                            dispatch(setPlan({
                                ...planState,
                                IsOpenDowngrade: false
                            }))
                        },
                    },
                ]}
            >

            </Modal>
            <Modal
                open={planState.IsOpenStartFreeTrial}
                onClose={() => {
                    dispatch(setPlan({
                        ...planState,
                        IsOpenStartFreeTrial: false
                    }))

                }}
                title="Do you want to upgrade to Advance plan?"
                primaryAction={{
                    content: 'Upgrade',
                    onAction: () => {
                        dispatch(Upgrade(false))
                    },
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => {
                            dispatch(setPlan({
                                ...planState,
                                IsOpenStartFreeTrial: false
                            }))
                        },
                    },
                ]}
            >

            </Modal>
            {planState.IsOpenSaveResult ? <Toast content={planState.MessageSaveResult} duration={4000} onDismiss={() => {
                dispatch(setPlan({
                    ...planState,
                    IsOpenSaveResult: null
                }))
            }} /> : null}
        </>
    )
}

export default Plan