export function isValidDateFormat(dateString) {
  // The regex pattern for the desired date format
  const dateFormatPattern = /^\d{2}-\d{2}-\d{4}$/;

  // Test if the dateString matches the pattern
  return dateFormatPattern.test(dateString);
}

export function formatDateToDDMMYYYY(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function calculateDaysBetweenDates(startDateStr, endDateStr) {

  const startDate = new Date(startDateStr.split('-').reverse().join('-'));
  const endDate = new Date(endDateStr.split('-').reverse().join('-'));

  const timeDifference = endDate - startDate;

  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}


function getMonthFromDate(dateString) {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day).getMonth() + 1; // Adding 1 to match JavaScript's Date object month indexing
}

// Function to filter bookings for a specific month
export function getBookingsForMonth(bookings, targetMonth) {
  return bookings.filter(booking => {
    const fromMonth = getMonthFromDate(booking.fromDate);
    const toMonth = getMonthFromDate(booking.toDate);
    return fromMonth === targetMonth || toMonth === targetMonth;
  });
}

export function calculateAmount(numberOfDays, numberOfPeople) {

  const defaultPrice = 50 * numberOfDays * numberOfPeople;

   return numberOfDays <= 10 ? defaultPrice : (defaultPrice - 0.05 * defaultPrice);
}

export function calculateAmountAP(numberOfDays, numberOfPeople) {

  const defaultPrice = 90 * numberOfDays * numberOfPeople;

   return numberOfDays <= 10 ? defaultPrice : (defaultPrice - 0.05 * defaultPrice);
}

export const calculateTotalAmountPerMonth = (bookings, month) => {

  return getBookingsForMonth(bookings, month).map(booking => booking.totalAmount)
    .reduce((acc, curr) => acc + curr, 0);
};
export const calculateTotalCostPerMonth = (bookings, month) => {

  return getBookingsForMonth(bookings, month).map(booking => booking.roomID.length)
    .reduce((acc, curr) => acc + curr, 0);
};



export const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getMonthNumberByName = (monthName) => {
  return months.indexOf(monthName) + 1;
};
