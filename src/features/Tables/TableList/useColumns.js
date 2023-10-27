import { useDispatch } from 'react-redux';
import { useLang } from '../../../components/LanguageProvider';
import { Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { removeItem } from '../store/thunks';
import React, { useState } from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';

export function useColumns() {
  const dispatch = useDispatch();
  const { translate } = useLang();

  return [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/table/edit/${record.id}`}>
            <Button>{translate('Edit', 'Редагувати')}</Button>
          </Link>
          <ErrorBoundary>
            <DeleteButton id={record.id} translate={translate} />
          </ErrorBoundary>
        </Space>
      ),
    },
  ];
}

function DeleteButton({ id, translate }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDeleteBtnClick = async () => {
    setLoading(true);
    setError('');

    try {
      await dispatch(removeItem(id));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Space>
      <Button
        onClick={onDeleteBtnClick}
        loading={loading}
        disabled={loading}
      >
        {translate('Delete', 'Видалити')}
      </Button>
      <Typography.Text type="danger">{error}</Typography.Text>
    </Space>
  )
}