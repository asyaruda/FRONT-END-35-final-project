import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'
import { Filters } from '../Filters'
import { Page } from '../../../components/Page'
import { Alert, Button, Table} from 'antd'
import { useColumns } from './useColumns'
import { getList } from '../store/thunks'
import { dishListFilteredSelector } from '../store/selectors'
import { DishesApi } from '../api/server'


export function DishesList () {
  const dispatch = useDispatch()
  const { loading, error, dishes } = useSelector(dishListFilteredSelector)
  const columns = useColumns()

  useEffect(() => {
    dispatch(getList())
  }, [dispatch])

  return (
    <Page title='Dishes'>
      <div style={{ marginBottom: '20px' }}>
        <Link to='/dishes/edit'><Button>Add New</Button></Link>

        <Filters />
      </div>

      <Table loading={loading} columns={columns} dataSource={dishes} rowKey='id' />

      {error && <Alert message={error} type="error" />}

      
    </Page>
  )
}

