class DateManager {
  static formatDate(dateString) {
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedHours = ((hours + 11) % 12) + 1;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const period = hours >= 12 ? 'PM' : 'AM';

    const formattedDate = `${formattedHours}:${formattedMinutes} ${period} · ${month} ${day}, ${year}`;

    return formattedDate;
  }
}

export default DateManager;
