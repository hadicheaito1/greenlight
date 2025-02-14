import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import axios from '../../../helpers/Axios';

export default function useCreateSession() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('location');

  return useMutation(
    ({ session, token }) => axios.post('/sessions.json', { session, token }).then((resp) => resp.data.data),
    {
      onSuccess: async (response) => {
        await queryClient.refetchQueries('useSessions');
        // if the current user does NOT have the CreateRoom permission, then do not re-direct to rooms page

        if (redirect) {
          navigate(redirect);
        } else if (response.permissions.CreateRoom === 'false') {
          navigate('/home');
        } else {
          navigate('/rooms');
        }
      },
      onError: (err) => {
        if (err.response.data.errors === 'PendingUser') {
          navigate('/pending');
        } else if (err.response.data.errors === 'BannedUser') {
          toast.error(t('toast.error.users.banned'));
        } else if (err.response.data.errors === 'UnverifiedUser') {
          navigate(`/verify?id=${err.response.data.data}`);
        } else {
          toast.error(t('toast.error.session.invalid_credentials'));
        }
      },
    },
  );
}
