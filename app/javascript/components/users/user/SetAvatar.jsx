import React, { useRef, useState } from 'react';
import { Button, Stack, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { PhotoIcon, FolderPlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import DeleteAvatarForm from './forms/DeleteAvatarForm';
import Avatar from './Avatar';
import useCreateAvatar from '../../../hooks/mutations/users/useCreateAvatar';
import { fileValidation, handleError } from '../../../helpers/FileValidationHelper';

export default function SetAvatar({ user }) {
  const { t } = useTranslation();

  const createAvatar = useCreateAvatar(user);

  // Use styled button instead of the default HTML input upload button
  const avatarUpload = useRef(null);
  const handleClick = () => avatarUpload?.current.click();

  // Editor Modal
  const [show, setShow] = useState(false);
  // Cropped Avatar Upload
  const [avatar, setAvatar] = useState();
  const [scale, setScale] = useState();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    document.getElementById('avatarUpload').value = '';
    setAvatar(undefined);
    setScale(undefined);
    setShow(false);
  };

  const handleNewAvatar = (e) => {
    try {
      fileValidation(e.target.files[0], 'image');
      const { files } = e.target;
      if (files.length > 0) {
        handleShow();
        setAvatar(e.target.files[0]);
      }
    } catch (error) {
      handleError(error, t, toast);
    }
  };

  const handleScale = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const editor = useRef(null);
  const handleSave = () => {
    if (editor) {
      createAvatar.mutate(editor.current.getImageScaledToCanvas());
      handleClose();
    }
  };

  return (
    <div id="profile-avatar" className="mt-5 d-block ms-auto me-auto">
      <Stack direction="vertical" gap={2}>
        <div onClick={handleClick} className="cursor-pointer position-relative mx-auto" aria-hidden="true">
          <div className="avatar-icon-circle float-end position-absolute rounded-circle">
            <FolderPlusIcon className="hi-s" />
          </div>
          <Avatar avatar={user?.avatar} size="large" />
        </div>
        <input
          id="avatarUpload"
          ref={avatarUpload}
          className="d-none"
          type="file"
          onChange={handleNewAvatar}
          accept=".png,.jpg,.jpeg,.svg"
        />
        <Button variant="brand" onClick={handleClick}>{ t('user.avatar.upload_avatar')}</Button>
        <DeleteAvatarForm user={user} />
      </Stack>

      <Modal show={show} onHide={handleClose} centered contentClassName="border-0 card-shadow">
        <Modal.Header closeButton>
          <Modal.Title>{ t('user.avatar.crop_avatar') }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <AvatarEditor
              ref={editor}
              image={avatar}
              width={300}
              height={300}
              border={50}
              borderRadius={250}
              color={[255, 255, 255, 0.8]} // RGBA
              scale={scale}
            />
            <div className="py-2">
              <PhotoIcon className="hi-s text-brand me-2" />
              <input
                name="scale"
                type="range"
                onChange={handleScale}
                min={1}
                max="2"
                step="0.1"
                defaultValue="1"
              />
              <PhotoIcon className="hi-l text-brand ms-2" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="neutral" onClick={handleClose}>
            { t('close') }
          </Button>
          <Button variant="brand" onClick={handleSave}>
            { t('save_changes') }
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// TODO - samuel: user object can be destructured (only id and avatar is needed here)
SetAvatar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    role: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
