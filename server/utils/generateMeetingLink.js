function generateMeetingLink(sessionId) {
  return `http://localhost:3000/meeting/${sessionId || Math.random().toString(36).substring(2, 15)}`;
}

module.exports = generateMeetingLink;
