const URL = 'http://localhost:3000/results';

export const publihPost = datos => {
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(res => {
      if (!res.ok) throw Error(res.status);

      console.log('Solicitud realizada con exito');
      console.log(res);

      return res;
    })
    .catch(error => {
      this.hasError = true;
      this.messageError = `Eror en la peticion, ${error}`;
    });
};
