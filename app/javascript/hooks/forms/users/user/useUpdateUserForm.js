import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';

export function useUpdateUserFormValidation() {
  return useMemo(() => (yup.object({
    name: yup.string().required('forms.validations.full_name.required')
      .min(2, 'forms.validations.full_name.min')
      .max(255, 'forms.validations.full_name.max'),

    email: yup.string().required('forms.validations.email.required').email('forms.validations.email.email')
      .min(6, 'forms.validations.email.min')
      .max(255, 'forms.validations.email.max'),
    language:
      yup.string().required(''),
    role_id:
      yup.string().required(''),
  })), []);
}

export default function useUpdateUserForm({ defaultValues: _defaultValues, ..._config } = {}) {
  const { t, i18n } = useTranslation();

  const fields = useMemo(() => ({
    name: {
      label: t('forms.user.update_user.fields.full_name.label'),
      controlId: 'updateUserFormName',
      hookForm: {
        id: 'name',
      },
    },
    email: {
      label: t('forms.user.update_user.fields.email.label'),
      controlId: 'updateUserFormEmail',
      hookForm: {
        id: 'email',
      },
    },
    language: {
      label: t('forms.user.update_user.fields.language.label'),
      controlId: 'updateUserFormLanguage',
      hookForm: {
        id: 'language',
      },
    },
    role_id: {
      label: t('forms.user.update_user.fields.role.label'),
      controlId: 'updateUserFormRole',
      hookForm: {
        id: 'role_id',
      },
    },
  }), [i18n.resolvedLanguage]);

  const validationSchema = useUpdateUserFormValidation();

  const config = useMemo(() => ({
    ...{
      mode: 'onChange',
      criteriaMode: 'firstError',
      defaultValues: {
        ...{
          name: '',
          email: '',
          language: '',
          role_id: '',
        },
        ..._defaultValues,
      },
      resolver: yupResolver(validationSchema),
    },
    ..._config,
  }), [validationSchema, _defaultValues]);

  const methods = useForm(config);

  const reset = useCallback(() => methods.reset(config.defaultValues), [methods.reset, config.defaultValues]);

  return { methods, fields, reset };
}
