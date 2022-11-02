export async function fetchData(Endpoint, APImethod, bodyObj) {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_REQUEST_HOST}${Endpoint}`,
    {
      method: APImethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.jwt,
      },
      body: JSON.stringify(bodyObj),
    }
  );

  return res;
}
