import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from '../../../helpers/Axios';

export default function useChangePwd() {
  const { t } = useTranslation();

  return useMutation(
    (user) => axios.post('/users/change_password.json', { user }),
    {
      onSuccess: () => {
        toast.success(t('toast.success.user.password_updated'));
      },
      onError: (err) => {
        if (err.response.data.errors === 'IncorrectOldPassword') {
          toast.error(t('toast.error.users.old_password'));
        } else {
          toast.error(t('toast.error.problem_completing_action'));
        }
      },
    },
  );
}
