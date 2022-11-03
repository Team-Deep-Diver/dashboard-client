export async function fetchData(endpointURL, apiMethod, bodyObj) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_REQUEST_HOST}${endpointURL}`,
      {
        method: apiMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.jwt,
        },
        body: JSON.stringify(bodyObj),
      }
    );

    return res;
  } catch (err) {
    console.error(err);
  }
}
