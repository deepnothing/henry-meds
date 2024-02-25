import axios from "axios";
import { Provider } from "../types/users";
import { Reservation } from "../types/scheduling";

const baseUrl = "http://localhost:3001";

export const getProviderList = async () => {
  try {
    const response = await axios.get(`${baseUrl}/providers`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProviderTimeSlots = async (providerId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/providers/${providerId}`);
    return response.data.schedule;
  } catch (error) {
    console.error(error);
  }
};

export const getReservations = async () => {
  try {
    const response = await axios.get(`${baseUrl}/reservations`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const reserveTimeSlotAsProvider = async (
  providerId: string,
  date: string,
  time: string
) => {
  try {
    // have to replace the provider object due to json-server limitations

    const providerResponse = await axios.get(`${baseUrl}/providers`);
    let providerResponseData: Provider[] = providerResponse.data;

    const providerIndexToUpdate = providerResponseData.findIndex(
      (provider) => provider.id === providerId
    );

    if (providerIndexToUpdate !== -1) {
      providerResponseData[providerIndexToUpdate].schedule.push({ date, time });

      await axios.put(
        `${baseUrl}/providers/${providerId}`,
        providerResponseData[providerIndexToUpdate]
      );
    } else {
      console.log("provider not found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const reserveTimeSlotAsClient = async (
  clientId: string,
  providerId: string,
  date: string,
  time: string
) => {
  await axios.post(`${baseUrl}/reservations`, {
    clientId: clientId,
    providerId: providerId,
    date,
    time,
    createdAt: new Date(),
    confirmed: false,
  });
};

export const confirmTimeSlotAsClient = async (reservationId: string) => {
  try {
    const reservationsResponse = await axios.get(`${baseUrl}/reservations`);
    const reservations = reservationsResponse.data;

    const reservationToUpdate = reservations.find(
      (reservation: Reservation) => reservation.id === reservationId
    );

    if (reservationToUpdate) {
      reservationToUpdate.confirmed = true;

      await axios.put(
        `${baseUrl}/reservations/${reservationId}`,
        reservationToUpdate
      );
      console.log("Reservation confirmed successfully.");
    } else {
      console.log("Reservation not found.");
    }
  } catch (error) {
    console.error("Error confirming reservation:", error);
  }
};
