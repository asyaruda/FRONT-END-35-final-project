import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'
import { Filters } from '../Filters'
import { Page } from '../../../components/Page'
import { Alert, Button, Table } from 'antd'
import { useColumns } from './useColumns'
import { getList } from '../store/thunks'
import { tableListFilteredSelector } from '../store/selectors'


export function TableList () {
  const dispatch = useDispatch()
  const { loading, error, tables } = useSelector(tableListFilteredSelector)
  const columns = useColumns()

  useEffect(() => {
    dispatch(getList())
  }, [dispatch])

  return (
    <Page title='Tables'>
      <div style={{ marginBottom: '20px' }}>
        <Link to='/table/edit'><Button>Add New</Button></Link>

        <Filters />
      </div>

      <Table loading={loading} columns={columns} dataSource={tables} rowKey='id' />

      {error && <Alert message={error} type="error" />}

      
    </Page>
  )
}

