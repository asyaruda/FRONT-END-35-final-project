import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneItem, saveItem } from './store/thunks';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '../../components/Page';
import { Alert, Button, } from 'antd';
import { ValidationError } from '../../components/ValidationError';

const validationSchema = Yup.object({
  firstName: Yup.string().min(3).required(),
  phone: Yup.string()
    .matches(/^[0-9-]*$/, 'Phone number can only contain digits and dashes')
    .matches(/^\d{3}(\s|-)?\d{3}(\s|-)?\d{2}(\s|-)?\d{2}$/, 'Invalid phone format. Use xxx-xxx-xx-xx')
    .required('Phone number is required'),
});

export function EditForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { waiterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const editingWaiter = useSelector((state) => state.waiter.editingWaiter);

  useEffect(() => {
    if (waiterId) {
      dispatch(getOneItem(waiterId));
    }
  }, [waiterId, dispatch]);

  const onSubmit = async (values, { resetForm }) => {
    const formWaiter = {
      ...editingWaiter,
      ...values,
    };

    setLoading(true);
    setError('');

    try {
      await dispatch(saveItem(formWaiter));
      resetForm();
      navigate('/waiter');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title='Edit Form'>
      <Formik
        enableReinitialize
        initialValues={editingWaiter}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field style={{ marginLeft: '10px' }} type="text" name="firstName" />
            <ValidationError name="firstName" />
          </div>

          <div style={{ marginLeft: '27px', marginTop: '20px' }}>
            <label htmlFor="phone">Phone</label>
            <Field style={{ marginLeft: '10px' }} type="text" name="phone" />
            <ValidationError name="phone" />
          </div>

          <SaveButton loading={loading} />
        </Form>
      </Formik>
      {error && <Alert message={error} type="error" />}
    </Page>
  )
}

function SaveButton({ loading }) {
  return (
    <div style={{ marginLeft: '50px', marginTop: '20px' }}>
      <Button loading={loading} htmlType="submit" disabled={loading}>
        Save
      </Button>
    </div>
  )
}