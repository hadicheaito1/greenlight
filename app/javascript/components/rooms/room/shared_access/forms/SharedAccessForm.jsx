/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import {
  Button, Form, Stack, Table,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useShareAccess from '../../../../../hooks/mutations/shared_accesses/useShareAccess';
import Avatar from '../../../../users/user/Avatar';
import SearchBar from '../../../../shared_components/search/SearchBar';
import useShareableUsers from '../../../../../hooks/queries/shared_accesses/useShareableUsers';

export default function SharedAccessForm({ handleClose }) {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const { friendlyId } = useParams();
  const createSharedUser = useShareAccess({ friendlyId, closeModal: handleClose });
  const [searchInput, setSearchInput] = useState();
  const { data: shareableUsers } = useShareableUsers(friendlyId, searchInput);

  return (
    <div id="shared-access-form">
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <Form onSubmit={handleSubmit(createSharedUser.mutate)}>
        <div className="table-scrollbar-wrapper">
          <Table hover responsive className="text-secondary my-3">
            <thead>
              <tr className="text-muted small">
                <th className="fw-normal">{ t('user.name') }</th>
              </tr>
            </thead>
            <tbody className="border-top-0">
              {
                (() => {
                  if (searchInput?.length >= 3 && shareableUsers?.length) {
                    return (
                      shareableUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="align-middle"
                        >
                          <td>
                            <Stack direction="horizontal" className="py-2">
                              <Form.Label className="w-100 mb-0 text-brand">
                                <Form.Check
                                  id={`${user.id}-checkbox`}
                                  type="checkbox"
                                  value={user.id}
                                  className="d-inline-block"
                                  {...register('shared_users')}
                                />
                                <Avatar avatar={user.avatar} size="small" className="d-inline-block px-3" />
                                {user.name}
                              </Form.Label>
                            </Stack>
                          </td>
                        </tr>
                      )));
                  } if (searchInput?.length >= 3) {
                    return (<tr className="fw-bold"><td>{ t('user.no_user_found') }</td><td /></tr>);
                  }
                  return (<tr className="fw-bold"><td colSpan="2">{ t('user.type_three_characters') }</td></tr>);
                })()
              }
            </tbody>
          </Table>
        </div>
        <Stack id="shared-access-modal-buttons" className="mt-3" direction="horizontal" gap={1}>
          <Button variant="neutral" className="ms-auto" onClick={handleClose}>
            { t('close') }
          </Button>
          <Button variant="brand" type="submit">
            { t('share') }
          </Button>
        </Stack>
      </Form>
    </div>
  );
}

SharedAccessForm.propTypes = {
  handleClose: PropTypes.func,
};

SharedAccessForm.defaultProps = {
  handleClose: () => { },
};
