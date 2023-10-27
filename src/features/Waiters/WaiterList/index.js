import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'
import { Filters } from '../Filters'
import { Page } from '../../../components/Page'
import { Alert, Button, Table } from 'antd'
import { useColumns } from './useColumns'
import { getList } from '../store/thunks'
import { waiterListFilteredSelector } from '../store/selectors'


export function WaiterList () {
  const dispatch = useDispatch()
  const { loading, error, waiters } = useSelector(waiterListFilteredSelector)
  const columns = useColumns()

  useEffect(() => {
    dispatch(getList())
  }, [dispatch])

  return (
    <Page title='Waiters'>
      <div style={{ marginBottom: '20px' }}>
        <Link to='/waiter/edit'><Button>Add New</Button></Link>

        <Filters />
      </div>

      <Table loading={loading} columns={columns} dataSource={waiters} rowKey='id' />

      {error && <Alert message={error} type="error" />}

      
    </Page>
  )
}

