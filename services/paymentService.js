import axios from 'axios';

const API_URL = 'https://apirone.com/api/v2';

export const createWallet = async (currency) => {
  try {
    const response = await axios.post(`${API_URL}/wallets`, { currency });
    return response.data.wallet;
  } catch (error) {
    console.error('Create wallet error:', error);
    throw error;
  }
};

export const sendPayment = async (walletId, destinations) => {
  try {
    const response = await axios.post(`${API_URL}/wallets/${walletId}/send`, { destinations });
    return response.data;
  } catch (error) {
    console.error('Send payment error:', error);
    throw error;
  }
};

export const getWalletInfo = async (walletId) => {
  try {
    const response = await axios.get(`${API_URL}/wallets/${walletId}`);
    return response.data;
  } catch (error) {
    console.error('Get wallet info error:', error);
    throw error;
  }
};
