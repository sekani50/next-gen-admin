export const filterSalesByDay = (sales, targetDate) => {
  return sales.filter((sale) => {
    const saleDate = new Date(sale.createdAt);
    const targetDay = new Date(targetDate);
    const startofToday = targetDay.getTime();
    const beginningofTomorrow = targetDay.getTime() + 86400000;
    //console.log(beginningofTomorrow)
    //console.log(saleDate.getTime())
    if (
      saleDate.getTime() >= startofToday &&
      saleDate.getTime() < beginningofTomorrow
    ) {
      console.log("this", saleDate.getTime());
    }

    return (
      saleDate.getTime() >= startofToday &&
      saleDate.getTime() < beginningofTomorrow
    );
  });
};

// Function to group sales by week
export const filterSalesByWeek = (sales) => {
  const groupedSales = {};

  sales.forEach((sale) => {
    const saleDate = new Date(sale.createdAt);
    const weekStartDate = new Date(saleDate);
    weekStartDate.setUTCDate(saleDate.getUTCDate() - saleDate.getUTCDay());
    const weekStartKey = weekStartDate.toISOString().split("T")[0];
    //console.log(weekStartKey)
    console.log(groupedSales)

    if (!groupedSales[weekStartKey]) {
      groupedSales[weekStartKey] = [];
    }

    groupedSales[weekStartKey].push(sale);
  });

  const moment = require("moment-timezone");
  const currentDate = moment();
  const nigeriaTimezone = "Africa/Lagos";
  currentDate.tz(nigeriaTimezone);
  //console.log('yeah',currentDate)
  const beginningOfWeek = currentDate.startOf("week");

  console.log('Beginning of the Week:', beginningOfWeek.format('YYYY-MM-DD'));
  return groupedSales[beginningOfWeek.format("YYYY-MM-DD")];
};
