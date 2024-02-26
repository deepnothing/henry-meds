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
  const [selectedDay, setSelectedDay] = useState<string>(
    formatDateToCalendar(new Date())
  );

  const onDayPress = (day: DateData) => {
    setSelectedDay(day.dateString);
  };

  const loadItems = async (day: DateData) => {
    try {
      const data = await getProviderTimeSlots(providerId);
      setSchedule(data);

      const reservations = await getReservations();

      // Create default schedule items for each day
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
                scheduleItem: data?.find(
                  (i: Schedule) => i.date === strDate && i.time === timeString
                ),
                reservationItem: reservations?.find(
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
        selectedDay={selectedDay}
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

  const scheduleObject = schedule?.reduce(
    (acc, schedule) => {
      acc[schedule.date] = {
        marked: false,
        dotColor: "purple",
        color: schedule.date === selectedDay ? "blue" : "#90EE90",
      };
      return acc;
    },
    {
      // one for todays date
      [formatDateToCalendar(new Date())]: {
        marked: true,
        dotColor: "red",
      },
      // another for selected date
      [selectedDay]: {
        selected: true,
        color: "blue",
      },
    }
  );

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={selectedDay}
      onDayPress={onDayPress}
      onCalendarToggled={() => setSelectedDay(null)}
      renderItem={renderItem}
      rowHasChanged={rowHasChanged}
      allowSelectionOutOfRange={false}
      pastScrollRange={1}
      futureScrollRange={6}
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
