import useSWR from 'swr';
import fetcher from './fetcher';

function useUser() {
  const { data, error } = useSWR('/v2/user/me', fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUser;
