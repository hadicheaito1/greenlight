import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button, Stack,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Form from '../../../shared_components/forms/Form';
import useDeleteUser from '../../../../hooks/mutations/users/useDeleteUser';
import { useAuth } from '../../../../contexts/auth/AuthProvider';
import Spinner from '../../../shared_components/utilities/Spinner';

export default function DeleteUserForm({ handleClose }) {
  const { t } = useTranslation();
  const currentUser = useAuth();
  const methods = useForm();
  const deleteUserAPI = useDeleteUser(currentUser?.id);

  return (
    <>
      <Stack direction="horizontal" className="mb-3">
        <ExclamationTriangleIcon className="text-danger hi-xl" />
        <Stack direction="vertical" className="ps-3">
          <h3> { t('user.account.delete_account') } </h3>
          <p className="mb-0"> { t('user.account.are_you_sure_delete_account') } </p>
          <p className="mt-0"><strong> { t('action_permanent') } </strong></p>
        </Stack>
      </Stack>
      <Form methods={methods} onSubmit={deleteUserAPI.mutate}>
        <Stack direction="horizontal" gap={1} className="float-end">
          <Button variant="neutral" onClick={handleClose}> { t('close') } </Button>
          <Button variant="danger" type="submit" disabled={deleteUserAPI.isLoading}>
            { deleteUserAPI.isLoading && <Spinner className="me-2" /> }
            { t('user.account.delete_account') }
          </Button>
        </Stack>
      </Form>
    </>
  );
}

DeleteUserForm.propTypes = {
  handleClose: PropTypes.func,
};

DeleteUserForm.defaultProps = {
  handleClose: () => {},
};
