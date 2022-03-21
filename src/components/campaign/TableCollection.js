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
  const [textSearch, setTextSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState(props.ItemSelected);
  const [colletions, setCollections] = useState([]);
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
    if (e === '') {
      setData(colletions);
    } else {
      var arr = colletions.filter(p => p.Title.toLowerCase().includes(textSearch.toLowerCase()));
      setData(arr);
    }

  };


  useEffect(() => {
    // setSelectedRows(props.ItemSelected)
    axios.get(config.rootLink + '/FrontEnd/GetCollect', {
      params: {
        shopID: campaign.ShopID,
        shop: config.shop,
      }
    })
      .then(function (response) {
        setData(response?.data.collects)
        setCollections(response?.data.collects)
      })
      .catch(function (error) {
        const errorMsg = error.message;
      })
  }, []);
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);
  function AddCollectionToInput() {
    dispatch(setCreateUpdateCampaign(
      {
        ...campaignState,
        campaign:
        {
          ...campaign,
          ListCollects: selectedRows
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
            {selectedRows.length} collection selected
          </div>

        </div>
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          selectableRowSelected={row => props.ItemSelected != undefined && props.ItemSelected.map(p => p.CollectID).indexOf(row.CollectID) >= 0}
        />
      </Modal.Section>

    </Modal>
  )
}

export default TableCollection