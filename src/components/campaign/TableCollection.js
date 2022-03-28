import React, { useEffect, useState, useCallback } from 'react';
import { Modal, TextField } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUpdateCampaign } from '../../state/modules/campaign/actions';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import config from '../../config/config';

function TableCollection(props) {
  const dispatch = useDispatch();
  const campaignState = useSelector((state) => state.campaign.CreateUpdateCampaign);
  const campaign = campaignState.campaign;
  const appState = useSelector((state) => state.app);
  const [textSearch, setTextSearch] = useState('');
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
  const handleChangeTextSearch = (e) => {
    setTextSearch(e);
    setNextPage(1)
    axios.get(config.rootLink + '/FrontEnd/GetCollectPaginate', {
      params: {
        search: e,
        shopID: appState.Shop?.ID,
        shop: appState?.Shop.Domain,
        page: 1,
        pagezise: 10
      }
    })
      .then(function (response) {
        const result = response?.data;
        setData(result.collects)
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


  useEffect(() => {
    setNextPage(1)
    axios.get(config.rootLink + '/FrontEnd/GetCollectPaginate', {
      params: {
        search: textSearch,
        shopID: appState.Shop?.ID,
        shop: appState?.Shop.Domain,
        page: 1,
        pagezise: 10
      }
    })
      .then(function (response) {
        const result = response?.data;
        setData(result.collects)
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
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    if (wholeSelected.length === 0) {
      setWholeSelected(...wholeSelected, state.selectedRows)
    } else {
      var arrWhole = wholeSelected;
      var arrAdd = state.selectedRows.filter(x => !arrWhole.map(p => p.ProductID).includes(x.ProductID));
      if (arrAdd.length > 0) {
        arrWhole = arrWhole.concat(arrAdd);
      }
      setWholeSelected(arrWhole)
    }
  }, []);
  function AddCollectionToInput() {
    dispatch(setCreateUpdateCampaign(
      {
        ...campaignState,
        campaign:
        {
          ...campaign,
          ListCollects: wholeSelected
        },
        IsOpenSaveToolbar: true
      }));
    props.setIsOpenAddSpecificCollectionModal(false);

  }

  return (
    <Modal
      open={props.IsOpenAdSpecificCollectionModal}
      onClose={() => { props.setIsOpenAddSpecificCollectionModal(false) }}
      title="Choose collect"
      primaryAction={{
        content: 'Done',
        onAction: () => {
          AddCollectionToInput()
        },
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => { props.setIsOpenAddSpecificCollectionModal(false) },
        },
      ]}
    >

      <Modal.Section>
        <div className='search-sticky'>
          <TextField
            value={textSearch}
            onChange={(e) => {
              handleChangeTextSearch(e)
            }}
            type="text"
            placeholder='Search Collection'
          />
          <div className="selected-item">
            {wholeSelected.length} collection selected
          </div>

        </div>
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          selectableRowSelected={row => wholeSelected != undefined && wholeSelected.map(p => p.CollectID).indexOf(row.CollectID) >= 0}
        />
      </Modal.Section>

    </Modal>
  )
}

export default TableCollection