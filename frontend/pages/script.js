document.addEventListener('DOMContentLoaded', function () {
    const showInfo = document.querySelector('.ShowInfo');
    const options = document.querySelectorAll('.options li');
    
    options.forEach(option => {
        option.addEventListener('click', handleOptionClick);
    });

    function handleOptionClick(event) {
        const option = event.currentTarget.innerText.toLowerCase(); // Convertir el texto a minúsculas
        switch (option) {
            case 'get files':
                getFiles();
                break;
            case 'store':
                storeFile();
                break;
            case 'show':
                showFiles();
                break;
            case 'update':
                updateFile();
                break;
            case 'delete':
                deleteFile();
                break;
            default:
                showInfo.innerHTML = '<p>Opción no válida</p>';
        }
    }

    // Obtener los archivos almacenados en el backend
    function getFiles() {
        fetch('http://127.0.0.1:8000/api/hello', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.contenido.length === 0) {
                showInfo.innerHTML = '<p>No hay archivos almacenados.</p>';
            } else {
                showInfo.innerHTML = '<ul>' + data.contenido.map(file => `<li>${file}</li>`).join('') + '</ul>';
            }
        })
        .catch(error => {
            showInfo.innerHTML = '<p>Error al obtener los archivos: ' + error.message + '</p>';
        });
    }

    // Crear un archivo nuevo en el backend
    function storeFile() {
        const fileName = prompt("Ingresa el nombre del archivo:");
        const content = prompt("Ingresa el contenido del archivo:");

        if (fileName && content) {
            fetch('http://127.0.0.1:8000/api/hello', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename: fileName, content: content }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje === 'Guardado con éxito') {
                    showInfo.innerHTML = `<p>Archivo ${fileName} almacenado correctamente.</p>`;
                } else {
                    showInfo.innerHTML = `<p>${data.mensaje}</p>`;
                }
            })
            .catch(error => {
                showInfo.innerHTML = '<p>Error al guardar el archivo: ' + error.message + '</p>';
            });
        }
    }

    // Ver el contenido de un archivo específico en el backend
    function showFiles() {
        const fileName = prompt("Ingresa el nombre del archivo a mostrar:");

        fetch(`http://127.0.0.1:8000/api/hello/${fileName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === 'Archivo leído con éxito') {
                showInfo.innerHTML = `<p>Contenido del archivo ${fileName}: ${data.contenido}</p>`;
            } else {
                showInfo.innerHTML = `<p>${data.mensaje}</p>`;
            }
        })
        .catch(error => {
            showInfo.innerHTML = '<p>Error al mostrar el archivo: ' + error.message + '</p>';
        });
    }

    // Actualizar un archivo en el backend
    function updateFile() {
        const fileName = prompt("Ingresa el nombre del archivo a actualizar:");
        const content = prompt("Ingresa el nuevo contenido del archivo:");

        if (fileName && content) {
            fetch(`http://127.0.0.1:8000/api/hello/${fileName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: content }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje === 'Actualizado con éxito') {
                    showInfo.innerHTML = `<p>Archivo ${fileName} actualizado correctamente.</p>`;
                } else {
                    showInfo.innerHTML = `<p>${data.mensaje}</p>`;
                }
            })
            .catch(error => {
                showInfo.innerHTML = '<p>Error al actualizar el archivo: ' + error.message + '</p>';
            });
        }
    }

    // Eliminar un archivo en el backend
    function deleteFile() {
        const fileName = prompt("Ingresa el nombre del archivo a eliminar:");

        if (fileName) {
            fetch(`http://127.0.0.1:8000/api/hello/${fileName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje === 'Eliminado con éxito') {
                    showInfo.innerHTML = `<p>Archivo ${fileName} eliminado correctamente.</p>`;
                } else {
                    showInfo.innerHTML = `<p>${data.mensaje}</p>`;
                }
            })
            .catch(error => {
                showInfo.innerHTML = '<p>Error al eliminar el archivo: ' + error.message + '</p>';
            });
        }
    }
});
