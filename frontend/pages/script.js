// URL del backend
const backendUrl = 'http://127.0.0.1:8000/api/hello'; 

// Función para obtener los datos
function obtenerDatos() {
  fetch(backendUrl) // Realiza la solicitud GET
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
      console.log('Datos recibidos:', data); // Muestra los datos en la consola
      // Aquí puedes manipular el DOM con los datos recibidos
    })
    .catch(error => console.error('Error al obtener datos:', error));
}

// Llamar a la función para obtener los datos
obtenerDatos();
