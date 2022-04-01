import axios from 'axios';
import NProgress  from 'nprogress';
import { mockData } from './mock-data';

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

    return result;
};

export const getEvents = async () => { 
  NProgress.start();

  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done(); 
    return mockData; // if using localhost, return mockData
  }

  if (!navigator.onLine) { // check whether user is offline
    const events = /*await*/ localStorage.getItem("lastEvents"); // load stored event
    NProgress.done();
    console.log(events);
    return events ? JSON.parse(events).events:[];;
  }

    const token = await getAccessToken();

    if (token) {
      removeQuery();
      const url = `https://jzmo612yz6.execute-api.us-west-2.amazonaws.com/dev/api/get-events/${token}`;
      const result = await axios.get(url); // if access token is found make GET request to the Google Calendar API
      if (result.data) {
        var locations = extractLocations(result.data.events);
        localStorage.setItem("lastEvents", JSON.stringify(result.data)); // store list of events for future use
        localStorage.setItem("locations", JSON.stringify(locations));
      }
      NProgress.done();
      return result.data.events;
    }
  };

  export const getAccessToken = async () => { 
    const accessToken = localStorage.getItem('access_token'); // check user storage to see if they have access token
    const tokenCheck = accessToken && (await checkToken(accessToken));
  
    if(!accessToken || tokenCheck.error) { // check whether access token is found 
      await localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = await searchParams.get("code");
      if (!code) { // check for an authorization code
        const results = await axios.get( // if none found, user automatically redirected to Google Auth screen
          "https://jzmo612yz6.execute-api.us-west-2.amazonaws.com/dev/api/get-auth-url"
        );
        const { authUrl } = results.data;
        return (window.location.href = authUrl);
      }
      return code && getToken(code);
    }
    return accessToken;
  };

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) { // check whether there's a path
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState("", "", newurl); //  build the URL without a path using window.history.pushState()
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code); // take your code and encode it using encodeURIComponent
  const { access_token } = await fetch(
    `https://jzmo612yz6.execute-api.us-west-2.amazonaws.com/dev/api/token/${encodeCode}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token; // use the encoded code to get your token
};  









