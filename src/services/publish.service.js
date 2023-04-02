async function post(url, body) {
  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });

    if (response?.ok === false) {
      return {
        hasError: true,
        message: `Error ${response.status} ${response.statusText}`,
      };
    }

    return {
      success: true,
      message: 'Publicación Realizada',
      ...(await response.json()),
    };
  } catch (err) {
    return { hasError: true, message: err.message, error: err };
  }
}

export default { post };
