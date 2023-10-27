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
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editingOrder = useSelector((state) => state.order.editingOrder);

  useEffect(() => {
    if (orderId) {
      dispatch(getOneItem(orderId));
    }
  }, [orderId, dispatch]);

  const onSubmit = async (values, { resetForm }) => {
    const formOrder = {
      ...editingOrder,
      ...values,
    };

    setLoading(true);
    setError('');

    try {
      await dispatch(saveItem(formOrder));
      resetForm();
      navigate('/order');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Edit Form">
      <Formik
        enableReinitialize
        initialValues={editingOrder}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="waiterId">Waiter</label>
            <Field type="text" name="waiterId" />
            <ValidationError name="waiterId" />
          </div>

          <div style={{ marginTop: '20px' }}>
            <label htmlFor="tableId">Table</label>
            <Field type="text" name="tableId" />
            <ValidationError name="tableId" />
          </div>

          <div style={{ marginTop: '20px' }}>
            <label htmlFor="dishes">Dishes</label>
            <Field type="text" name="dishes" />
            <ValidationError name="dishes" />
            <div>
              <label htmlFor="dish">Dish</label>
              <Field type="text" name="dish" />
              <ValidationError name="dish" />
            </div>
            <div>
              <label htmlFor="count">Count</label>
              <Field type="text" name="count" />
              <ValidationError name="count" />
            </div>
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