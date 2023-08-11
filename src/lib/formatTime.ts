import { format, getTime, formatDistanceToNowStrict } from "date-fns";

export const fDate = (date: string | number | Date) => {
  return format(formatDate(date), "MMM dd, yyyy");
};

export const fDateTime = (date: string | number | Date) => {
  return format(formatDate(date), "MMMM dd, yyyy HH:mm a");
};

export const fTimestamp = (date: string | number | Date) => {
  return getTime(new Date(date));
};

export const fDateTimeSuffix = (date: string | number | Date) => {
  return format(formatDate(date), "dd/MM/yyyy hh:mm p");
};

export const fToNow = (date: string | number | Date) => {
  return formatDistanceToNowStrict(formatDate(date), {
    addSuffix: true
  });
};

export const formatLocaleDate = (date: string) =>
  format(new Date(date), "yyyy-MM-dd");

export const formatDate = (date: string | number | Date): Date =>
  typeof date === "number" && String(date).length <= 10
    ? new Date(date * 1000)
    : new Date(date);

// ** calendar
export const formattedDate = (date: string | number | Date) =>
  format(new Date(date), "yyyy-MM-dd");

export const formattedDateTime = (date: string | number | Date) =>
  format(new Date(date), "yyyy-MM-dd'T'HH:mm");
