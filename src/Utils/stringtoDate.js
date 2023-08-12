export const dateOfMonth = (dateString) => {
    const date =  new Date(dateString)
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();
      const day = date.getUTCDate();
      
      return `${month}, ${day} ${year}`;
}

export const daily = (dateString) => {
    const date =  new Date(dateString)
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      const month = months[date.getUTCMonth()];
      const year = date.getUTCFullYear();
      const day = date.getUTCDate();

      return `${dayOfWeek}, ${month} ${day} ${year}`;
}

export const dailyHours = (utcTimestamp) => {
const date = new Date(utcTimestamp);


const hours = date.getUTCHours().toString().padStart(2, "0");
const minutes = date.getUTCMinutes().toString().padStart(2, "0");
const seconds = date.getUTCSeconds().toString().padStart(2, "0");

const hourformat = (hours % 12) || 12
const period = hours >= 12 ? 'PM':'AM'

return `${hourformat}:${minutes}:${seconds} ${period}`;

}

