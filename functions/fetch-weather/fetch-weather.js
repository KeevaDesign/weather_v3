// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const axios = require("axios");

const handler = async (event) => {
  // try {
  //   const subject = event.queryStringParameters.name || "World";
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ message: `Hello ${subject}` }),
  //     // // more keys you can return:
  //     // headers: { "headerName": "headerValue", ... },
  //     // isBase64Encoded: true,
  //   };
  // } catch (error) {
  //   return { statusCode: 500, body: error.toString() };
  // }

  // localhost:8080/.netlify/functions/fetch-weaterh.js

  const { lat, lon } = event.queryStringParameters;

  const API_SECRET = "07d67f84cd34e2452408a52a5a0c1414";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_SECRET}`;

  try {
    const { data } = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data }),
    };
  }
};

module.exports = { handler };
