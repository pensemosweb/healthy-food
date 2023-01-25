const host = 'http://localhost:8000';
export async function post(url, body) {
  let response;
  try {
    response = await fetch(host + url, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (response?.ok === false) {
      return {
        hasError: true,
        errorMessage: `Error ${response.status} ${response.statusText}`,
      };
    }

    return { hasError: false, ...(await response.json()) };
  } catch (err) {
    return { hasError: true, errorMessage: err.message, error: err };
  }
}
