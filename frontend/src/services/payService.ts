import apiClient from "../interceptors/authInterceptor";


export const getDnaTransactionId = async () => {
    const response = await apiClient.post(
        '/payments/pay/', {amount: 650}
    );
    return response.data;
};
