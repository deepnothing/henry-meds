import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import { useAuth } from "../state/AuthContext";
import {
  reserveTimeSlotAsProvider,
  reserveTimeSlotAsClient,
  confirmTimeSlotAsClient,
} from "../api";
import {
  countDownToConfirm,
  getCalendarDateObjectFromDateString,
  isSlot24HoursAhead,
} from "../utils/dates";

// @ts-ignore for the sake of time
const TimeSlot: React.FC<Props> = ({
  reservation,
  providerId,
  isProviderAvailible,
  loadItems,
  setItems,
  reservationItem,
  selectedDay,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("--m --s");

  useEffect(() => {
    reservationItem &&
      reservationItem.createdAt &&
      countDownToConfirm(reservationItem.createdAt, setTimeRemaining);
  }, [reservationItem]);

  const { user } = useAuth();

  const isClientReservationDisabled: boolean =
    user.role === "client"
      ? isSlot24HoursAhead(reservation.day, reservation.name)
      : false;

  const refreshCalendar = () => {
    // workaround to updating the calendar UI
    // https://github.com/wix/react-native-calendars/issues/463

    setItems(null);
    loadItems(getCalendarDateObjectFromDateString(reservation.day));
  };

  const handleReservation = () => {
    if (user.role === "provider") {
      if (isProviderAvailible)
        Alert.alert("Error", "you've already marked this availible");
      else
        reserveTimeSlotAsProvider(
          user.id,
          reservation.day,
          reservation.name
        ).then(() => {
          refreshCalendar();
          Alert.alert("Success");
        });
    } else {
      if (isProviderAvailible) {
        if (reservationItem) {
        } else {
          reserveTimeSlotAsClient(
            user.id,
            providerId,
            reservation.day,
            reservation.name
          );
          refreshCalendar();
          Alert.alert("Reservation submitted");
        }
      } else Alert.alert("Provider not availible");
    }
  };

  const providerAvailibleMessage: string =
    user.role === "provider"
      ? "Availible"
      : reservationItem
      ? null
      : "Tap to reserve";

  const providerNotAvailibleMessage: string =
    user.role === "provider"
      ? "Tap to mark availible"
      : "Provider not availible";

  const handleConfirm = () => {
    if (!reservationItem.confirmed) {
      confirmTimeSlotAsClient(reservationItem.id);
      refreshCalendar();
      Alert.alert("Reservation confirmed");
    }
  };
  return (
    <Card
      disabled={isClientReservationDisabled}
      onPress={handleReservation}
      style={{
        marginTop: 20,
        marginRight: 10,
        backgroundColor: isProviderAvailible ? "#90EE90" : "#fff",
      }}
    >
      <Card.Content>
        <Text variant="bodyMedium">
          {reservation.name} -{" "}
          {isClientReservationDisabled
            ? "Reservations must be made at least 24 hours in advance."
            : !isProviderAvailible
            ? providerNotAvailibleMessage
            : providerAvailibleMessage}
        </Text>
        {user.role === "client" &&
        reservationItem &&
        reservationItem.clientId === user.id &&
        reservation.scheduleItem?.date === selectedDay &&
        !isClientReservationDisabled ? (
          <Chip
            icon="information"
            onPress={handleConfirm}
            textStyle={{ fontSize: 12 }}
          >
            {reservationItem.confirmed
              ? "Confirmed Reservation"
              : `Tap to confirm reservation in ${timeRemaining}`}
          </Chip>
        ) : reservationItem &&
          reservationItem.confirmed &&
          reservation.scheduleItem?.date === selectedDay ? (
          <Chip icon="information">
            Reserved by client: {reservationItem.clientId}
          </Chip>
        ) : null}
      </Card.Content>
    </Card>
  );
};
export default TimeSlot;
