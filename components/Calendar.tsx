import React, { useState } from "react";
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import {
  formatDateToCalendar,
  isLessThan30MinutesAgo,
  timeToString,
} from "../utils/dates";
import { getProviderTimeSlots, getReservations } from "../api";
import TimeSlot from "./TimeSlot";
import { Reservation, Schedule } from "../types/scheduling";

interface CalendarProps {
  providerId: string;
}
const Calendar: React.FC<CalendarProps> = ({ providerId }) => {
  const [items, setItems] = useState<AgendaSchedule | undefined>(undefined);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const loadItems = async (day: DateData) => {
    try {
      const data = await getProviderTimeSlots(providerId);
      setSchedule(data);

      const reservations = await getReservations();
      setReservations(reservations);

      // Create default items (time slots)
      const newItems: AgendaSchedule = {};

      for (let days = -15; days < 15; days++) {
        const date = new Date(day.year, day.month - 1, day.day + days);
        const strDate = timeToString(date.getTime());

        if (!newItems[strDate]) {
          newItems[strDate] = [];

          // Render a collection of 15 minute time slots daily between 9am and 5pm
          for (let hour = 9; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
              const hour12 = hour % 12 || 12;
              const ampm = hour < 12 ? "AM" : "PM";
              const minuteString = minute === 0 ? "00" : minute;
              const timeString = `${hour12}:${minuteString} ${ampm}`;

              newItems[strDate].push({
                name: timeString,
                height: 50,
                day: strDate,
                // Add matching schedule date and reservation item as metadata
                scheduleItem: data.find(
                  (i: Schedule) => i.date === strDate && i.time === timeString
                ),
                reservationItem: reservations.find(
                  (i: Reservation) =>
                    i.providerId === providerId &&
                    i.time === timeString &&
                    isLessThan30MinutesAgo(i.createdAt)
                ),
              });
            }
          }
        }
      }
      setItems(newItems);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = (reservation: AgendaEntry) => {
    return (
      <TimeSlot
        reservation={reservation}
        providerId={providerId}
        reservationItem={reservation.reservationItem}
        isProviderAvailible={reservation.scheduleItem}
        loadItems={loadItems}
        setItems={setItems}
      />
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  const reservationsKeyExtractor = (item: any, index: number) => {
    return `${item?.reservation?.day}${index}`;
  };

  const today = new Date();

  const scheduleObject = schedule.reduce(
    (acc, schedule) => {
      acc[schedule.date] = {
        marked: true,
        dotColor: "red",
      };
      return acc;
    },
    {
      [formatDateToCalendar(today)]: {
        marked: true,
        dotColor: "green",
      },
    }
  );

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={formatDateToCalendar(today)}
      renderItem={renderItem}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
      markingType={"period"}
      markedDates={scheduleObject}
      monthFormat={"MMMM - yyyy"}
      theme={{ calendarBackground: "#fff", agendaKnobColor: "grey" }}
      hideExtraDays={false}
      showOnlySelectedDayItems
      reservationsKeyExtractor={reservationsKeyExtractor}
    />
  );
};

export default Calendar;
