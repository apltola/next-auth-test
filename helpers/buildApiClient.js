import axios from 'axios';

export default function buildApiClient(token) {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
