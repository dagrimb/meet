

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const extractTimes = (events) => {
  var extractTimes = events.map((event) => event.start.originalStartTime);
  var times = [...new Set(extractTimes)];
  return times;
};

export const extractEvents = (events) => {
  var extractEvents = events.map((event) => event.summary);
  var eventnames = [...new Set(extractEvents)];
  return eventnames;
};

export const extractGroups = (events) => {
  var extractGroups = events.map((event) => event.organizer.email);
  var groups = [...new Set(extractGroups)];
  return groups;
};

export const extractAttendeeCount = (events) => {
  var extractAttendeeCount = events.map((event) => event.attendees);
  var attendees = [...new Set(extractAttendeeCount)];
  return attendees;
};

export const extractDescriptions = (events) => {
  var extractDescriptions = events.map((event) => event.description);
  var descriptions = [...new Set(extractDescriptions)];
  return descriptions;
};

export const extractLinks = (events) => {
  var extractLinks = events.map((event) => event.htmlLink);
  var links = [...new Set(extractLinks)];
  return links;
};
  



        