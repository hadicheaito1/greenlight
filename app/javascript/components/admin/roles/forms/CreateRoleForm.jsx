import React from 'react';
import {
  Button, Stack,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Form from '../../../shared_components/forms/Form';
import Spinner from '../../../shared_components/utilities/Spinner';
import FormControl from '../../../shared_components/forms/FormControl';
import useCreateRole from '../../../../hooks/mutations/admin/roles/useCreateRole';
import useRoleForm from '../../../../hooks/forms/admin/roles/useRoleForm';

export default function CreateRoleForm({ handleClose }) {
  const { t } = useTranslation();
  const createRole = useCreateRole({ onSettled: handleClose });
  const { methods, fields } = useRoleForm();

  return (
    <Form methods={methods} onSubmit={createRole.mutate}>
      <FormControl field={fields.name} type="text" />
      <Stack className="mt-1" direction="horizontal" gap={1}>
        <Button variant="neutral" className="ms-auto" onClick={handleClose}>
          {t('close')}
        </Button>
        <Button variant="brand" type="submit" disabled={createRole.isLoading}>
          {createRole.isLoading && <Spinner className="me-2" />}
          {t('admin.roles.create_role')}
        </Button>
      </Stack>
    </Form>
  );
}

CreateRoleForm.propTypes = {
  handleClose: PropTypes.func,
};

CreateRoleForm.defaultProps = {
  handleClose: () => { },
};
