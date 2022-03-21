import React, { useEffect, useState, useCallback } from 'react';
import { Modal, TextField } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUpdateLimitPurchase } from '../../state/modules/limitpurchase/actions';
import DataTable from 'react-data-table-component';


function TableCollection(props) {
  const dispatch = useDispatch();
  const createUpdateLimitPurchase = useSelector((state) => state.limitpurchase.CreateUpdateLimitPurchase);
  const [textSearch, setTextSearch] = useState('');

  const [selectedRows, setSelectedRows] = React.useState([]);
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
      setData(props.Collections);
    } else {
      var arr = props.Collections.filter(p => p.Title.toLowerCase().includes(textSearch.toLowerCase()) || p.Handle.toLowerCase().includes(textSearch.toLowerCase()));
      setData(arr);
    }

  };
  useEffect(() => {
    setData(props.Collections)
  }, []);
  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);
  function AddCollectionToInput() {
    dispatch(setCreateUpdateLimitPurchase(
      {
        ...createUpdateLimitPurchase,
        BulkUpdate:
        {
          ...createUpdateLimitPurchase.BulkUpdate,
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