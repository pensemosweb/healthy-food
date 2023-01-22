export function collectFormData(form) {
  const data = new FormData(form);
  const requestData = {};

  for (const item of data.entries()) {
    requestData[item.at(0)] = item.at(1);
  }

  return requestData;
}
