import apiClient from "../interceptors/authInterceptor";


export const fetchMyRegistrations = async () => {
  const response = await apiClient.get("/registrations/my-registrations/");
  return response.data;
};

export const registerForEvent = async (eventId: number) => {
  try {
    const response = await apiClient.post("/registrations/register/", { event: eventId });

    if (response?.status === 201) {
      return "Successfully registered for the event!";
    }

    return "Unexpected response from the server.";
  } catch (error: any) {
    if (error.response?.status === 401) {
      return "Unauthorized. Please log in.";
    }
    if (
      error.response?.status === 400
    ) {
      return "You are already registered for the event.";
    }
    if (error.response?.status === 400) {
      return "Bad request. Please check the event details.";
    }

    return "An unexpected error occurred. Please try again.";
  }
};

