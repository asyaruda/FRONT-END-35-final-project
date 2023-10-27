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
  const { dishId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editingDish = useSelector((state) => state.dish.editingDish);

  useEffect(() => {
    if (dishId) {
      dispatch(getOneItem(dishId));
    }
  }, [dishId, dispatch]);

  const onSubmit = async (values, { resetForm }) => {
    const formDish = {
      ...editingDish,
      ...values,
    };

    setLoading(true);
    setError('');

    try {
      await dispatch(saveItem(formDish));
      resetForm();
      navigate('/dish');
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
        initialValues={editingDish}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div style={{ marginTop: '20px' }}>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ValidationError name="name" />
          </div>

          <div style={{ marginTop: '20px' }}>
            <label htmlFor="name">Description</label>
            <Field type="text" name="description" />
            <ValidationError name="description" />
          </div>

          <div style={{ marginTop: '20px' }}>
            <label htmlFor="number">Price</label>
            <Field type="text" name="price" />
            <ValidationError name="price" />
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

