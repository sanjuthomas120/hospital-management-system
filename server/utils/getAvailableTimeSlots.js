function getAvailableTimeSlots(appointments, workingHours, breaks) {
  const availableSlots = [];
  const timeSlotDuration = 30;

  const isDuringBreak = (time) => {
    return breaks.some((breakSlot) => {
      return time >= breakSlot.start && time < breakSlot.end;
    });
  };

  const formatTime = (time) => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  let currentTime = new Date(workingHours.start);

  while (currentTime < workingHours.end) {
    if (!isDuringBreak(currentTime)) {
      const isBooked = appointments.some((appointment) => {
        const appointmentTime = new Date(appointment.time);
        return appointmentTime.getHours() === currentTime.getHours() &&
               appointmentTime.getMinutes() === currentTime.getMinutes();
      });

      if (!isBooked) {
        availableSlots.push(formatTime(currentTime));
      }
    }
    currentTime.setMinutes(currentTime.getMinutes() + timeSlotDuration);
  }

  return availableSlots;
}

module.exports = getAvailableTimeSlots;
