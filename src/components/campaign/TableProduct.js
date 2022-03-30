import React, { useEffect, useState, useCallback } from 'react';
import { Modal, TextField } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUpdateCampaign } from '../../state/modules/campaign/actions';
import '../../assets/css/paginate.css';
// import ReactPaginate from 'react-paginate';
import axios from 'axios';
import config from '../../config/config';
import DataTable from 'react-data-table-component';
import InfiniteScroll from "react-infinite-scroll-component";


function TableProduct(props) {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state.app);
    const campaignState = useSelector((state) => state.campaign.CreateUpdateCampaign);
    const campaign = campaignState.campaign;


    const [textSearch, setTextSearch] = useState('');
    const [textLoading, setTextLoading] = useState('');
    const [nextPage, setNextPage] = useState(1);
    const [wholeSelected, setWholeSelected] = React.useState(props.ItemSelected || []);
    const [selectedRows, setSelectedRows] = React.useState([]);//props.ItemSelected ||
    const [data, setData] = useState([]);

    const columns = [
        {
            name: 'Title',
            selector: row => row.Title,
        },
        {
            name: 'Handle',
            selector: row => row.Handle,
        },
    ];



    useEffect(() => {
        setNextPage(1)
        axios.get(config.rootLink + '/FrontEnd/SearchProductPaginate', {
            params: {
                search: textSearch,
                shopID: appState.Shop?.ID,
                shop: config.shop,
                page: 1,
                pagezise: 10,
                token: config.token,

            }
        })
            .then(function (response) {
                const result = response?.data;
                setData(result.products)
                // setTotalPage(result.totalpage);
                if (result.page < result.totalpage) {
                    setNextPage(result.page + 1)
                } else {
                    setNextPage(0)
                }
            })
            .catch(function (error) {
                const errorMsg = error.message;
                console.log(errorMsg);
            })

    }, []);
    const handleChangeTextSearch = (e) => {
        setTextSearch(e);
        setNextPage(1)
        axios.get(config.rootLink + '/FrontEnd/SearchProductPaginate', {
            params: {
                search: e,
                shopID: appState.Shop?.ID,
                shop: config.shop,
                page: 1,
                pagezise: 10,
                token: config.token,
            }
        })
            .then(function (response) {
                const result = response?.data;
                setData(result.products)
                if (result.page < result.totalpage) {
                    setNextPage(result.page + 1)
                } else {
                    setNextPage(0)
                }
            })
            .catch(function (error) {
                const errorMsg = error.message;
                console.log(errorMsg);
            })
    };
    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
        if (wholeSelected.length === 0) {
            setWholeSelected(...wholeSelected, state.selectedRows)
        } else {
            var arrWhole = wholeSelected;
            var arrAdd = state.selectedRows.filter(x => !arrWhole.map(p=>p.ProductID).includes(x.ProductID));
            if (arrAdd.length > 0) {
                arrWhole = arrWhole.concat(arrAdd);
            }
            setWholeSelected(arrWhole)
        }

    }, []);
    function AddProductToInput() {
        dispatch(setCreateUpdateCampaign(
            {
                ...campaignState,
                campaign:
                {
                    ...campaign,
                    ListProducts: wholeSelected
                },
                IsOpenSaveToolbar: true
            }));
        props.setIsOpenAddSpecificProductModal(false);

    }
    // Invoke when user click to request another page.
    // const handlePageClick = (event) => {
    //     axios.get(config.rootLink + '/FrontEnd/SearchProductPaginate', {
    //         params: {
    //             search: textSearch,
    //             shopID: appState.Shop?.ID,
    //             page: event.selected + 1,
    //             pagezise: 100
    //         }
    //     })
    //         .then(function (response) {
    //             const result = response?.data;
    //             setData(result.products)
    //         })
    //         .catch(function (error) {
    //             const errorMsg = error.message;
    //             console.log(errorMsg);
    //         })
    // };
    const fetchMoreData = () => {
        if (nextPage !== 0) {
            setTextLoading(<><h4 style={{ textAlign: 'center', padding: '10px 0' }}>Loading...</h4></>);
            axios.get(config.rootLink + '/FrontEnd/SearchProductPaginate', {
                params: {
                    search: textSearch,
                    shopID: appState.Shop?.ID,
                    shop: config.shop,
                    page: nextPage,
                    pagezise: 10,
                    token: config.token,
                }
            })
                .then(function (response) {
                    const result = response?.data;
                    var newArr = data.concat(result.products);
                    setData(newArr)
                    if (result.page < result.totalpage) {
                        setNextPage(result.page + 1)
                    } else {
                        setNextPage(0)
                    }
                    setTextLoading('');
                })
                .catch(function (error) {
                    const errorMsg = error.message;
                    console.log(errorMsg);
                })
        }

    };
    return (


        <Modal
            open={props.IsOpenAdSpecificProductModal}
            onClose={() => { props.setIsOpenAddSpecificProductModal(false) }}
            title="Choose product"
            primaryAction={{
                content: 'Done',
                onAction: () => {
                    AddProductToInput()
                },
            }}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: () => { props.setIsOpenAddSpecificProductModal(false) },
                },
            ]}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={true}
                // loader={textLoading}
                height={420}
                marginTop={10}
            >
                <Modal.Section>

                    <div className='search-sticky'>
                        <TextField
                            value={textSearch}
                            onChange={(e) => {
                                handleChangeTextSearch(e)
                            }}
                            type="text"
                            placeholder='Search Product'
                        />
                        <div className="selected-item">
                            {wholeSelected.length} product selected
                        </div>
                        <div className="shadow">
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        selectableRows
                        onSelectedRowsChange={handleRowSelected}
                        selectableRowSelected={row => wholeSelected != undefined && wholeSelected.map(p => p.ProductID).indexOf(row.ProductID) >= 0}
                    />

                    {/* {
data !== undefined && data !== null && data.length > 0 ? <>
<div className='paging-area'>
<ReactPaginate
nextLabel=">"
onPageChange={handlePageClick}
pageRangeDisplayed={2}
marginPagesDisplayed={2}
pageCount={TotalPage}
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
} */}

                </Modal.Section>

            </InfiniteScroll>
        </Modal>
    )
}

export default TableProduct