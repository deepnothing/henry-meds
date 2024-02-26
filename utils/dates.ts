import moment from "moment";

export const formatDateToCalendar = (date: Date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

export const isLessThan30MinutesAgo = (dateString: string | Date) => {
  const date = moment(dateString);
  const now = moment();

  const differenceInMinutes = now.diff(date, "minutes");

  return differenceInMinutes < 30;
};

export const getCalendarDateObjectFromDateString = (dateString: string) => {
  const date = moment(dateString);
  return {
    dateString,
    day: date.date(),
    month: date.month() + 1,
    year: date.year(),
    timestamp: date.valueOf(),
  };
};

export const countDownToConfirm = (
  createdAt: string,
  setTimeRemaining: Function
) => {
  const reservationTime = moment(createdAt);
  const expirationTime = reservationTime.clone().add(30, "minutes");
  const interval = setInterval(() => {
    const now = moment();
    const diffSeconds = expirationTime.diff(now, "seconds");
    if (diffSeconds > 0) {
      const minutes = Math.floor(diffSeconds / 60);
      const seconds = diffSeconds % 60;
      setTimeRemaining(`${minutes}m ${seconds}s`);
    } else {
      setTimeRemaining("Expired");
      clearInterval(interval);
    }
  }, 1000);

  return () => clearInterval(interval);
};

export const isSlot24HoursAhead = (day: string, time: string) => {
  const datetimeString = `${day} ${time}`;

  const slotDateTime = moment(datetimeString, "YYYY-MM-DD h:mm A");

  const currentDateTime = moment();

  const hoursDifference = slotDateTime.diff(currentDateTime, "hours");

  if (hoursDifference > 24) {
    return false;
  } else {
    return true;
  }
};
