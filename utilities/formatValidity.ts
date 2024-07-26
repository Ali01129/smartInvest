import { addDays, intervalToDuration } from "date-fns";

export const formatValidity = (totalDays: number) => {
    const startDate = new Date(0);
    const endDate = addDays(startDate, totalDays);
  
    const duration = intervalToDuration({ start: startDate, end: endDate });
    const { years, months } = duration;
    let result = '';
    if (years && years > 0) {
      result += `${years} years`;
    }
    if (months && months > 0) {
      if (result) result += ', ';
      result += `${months} months`;
    }
    return result;
  };
  