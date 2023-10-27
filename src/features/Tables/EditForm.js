import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneItem, saveItem } from './store/thunks';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '../../components/Page';
import { Alert, Button } from 'antd';
import { ValidationError } from '../../components/ValidationError';

const validationSchema = Yup.object({
  id: Yup.string().required('ID is required'),
  number: Yup.string()
    .matches(/^[0-9-]*$/, 'Number can only contain digits and dashes')
    .required('Number is required'),
});

export function EditForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { tableId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editingTable = useSelector((state) => state.table.editingTable);

  useEffect(() => {
    if (tableId) {
      dispatch(getOneItem(tableId));
    }
  }, [tableId, dispatch]);

  const onSubmit = async (values, { resetForm }) => {
    const formTable = {
      ...editingTable,
      ...values,
    };

    setLoading(true);
    setError('');

    try {
      await dispatch(saveItem(formTable));
      resetForm();
      navigate('/table');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title='Edit Form'>
      <Formik
        enableReinitialize
        initialValues={editingTable}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="number">Number</label>
            <Field type="text" name="number" />
            <ValidationError name="number" />
          </div>

          <SaveButton loading={loading} />
        </Form>
      </Formik>
      {error && <Alert message={error} type="error" />}
    </Page>
  );
}

function SaveButton({ loading }) {
  return (
    <div style={{ marginLeft: '50px', marginTop: '20px' }}>
      <Button loading={loading} htmlType="submit" disabled={loading}>
        Save
      </Button>
    </div>
  );
}

