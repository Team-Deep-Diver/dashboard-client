export async function fetchData(endPoint, apiMethod, bodyObj) {
  try{
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_REQUEST_HOST}${endPoint}`,
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
