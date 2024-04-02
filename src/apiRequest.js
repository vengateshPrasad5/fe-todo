const apiRequest = async (API_URL, options = null) => {
  let response = null;
  console.log(API_URL);
  try {
    response = await fetch(API_URL, options);
    // const result = await response.json();
    console.log(response);
    if (!response.ok) throw new Error("Data Not Found");
  } catch (error) {
    console.log(error.message);
  }
  return response;
};

export const apiRequest1 = (API_URL, options = null) => {
  new Promise((resolve, reject) => {
    const response = fetch(API_URL, options).then((resp) => {
      resolve({
        output: resp,
        status: resp.status,
      }).catch((error) => {
        reject({
          error: error.message,
          status: 404,
        });
      });
    });
    return response;
  });
};
export default apiRequest;
