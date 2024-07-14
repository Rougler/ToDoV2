import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ dates, setDates }) => {
  const [dateRange, setDateRange] = useState([dates.startDate, dates.endDate]);

  useEffect(() => {
    setDateRange([dates.startDate, dates.endDate]);
  }, [dates]);

  const handleChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      const formattedStartDate = formatDate(update[0]);
      const formattedEndDate = formatDate(update[1]);
      setDates({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    } else {
      setDates("");
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  return (
    <DatePicker
      selectsRange={true}
      startDate={dateRange[0]}
      endDate={dateRange[1]}
      onChange={handleChange}
      isClearable={true}
      dateFormat="MM/dd/yyyy"
    />
  );
};

export default DateRangePicker;
