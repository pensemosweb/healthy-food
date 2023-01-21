Feature: Editar Perfil

Como un usuario registrado
Yo quiero editar mi perfil
De esta manera datos importantes como el teléfono y la ubicación puedan reflejarse en mis publicaciones

Scenario: Abri edición de perfil
  Dado un usuario logueado
  Cuando quiere editar su teléfono y ubicacion a traves de su perfil
  Entonces las opciones de perfil son mostradas
  Cuando selecciona la opcione editar perfil
  Entonces un formulario de edición de perfil debe ser mostrado
