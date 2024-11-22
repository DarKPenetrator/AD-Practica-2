document.addEventListener('DOMContentLoaded', function () {
    const showInfo = document.querySelector('.ShowInfo');
    const options = document.querySelectorAll('.options li');

    options.forEach(option => {
        option.addEventListener('click', handleOptionClick);
    });

    function handleOptionClick(event) {
        const option = event.target.innerText.toLowerCase(); // Convertir el texto a minúsculas
        switch (option) {
            case 'get files':
                getFiles();
                break;
            case 'store':
                storeFile();
                break;
            case 'show':
                showFile();
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

    // Obtener todos los archivos JSON válidos
    function getFiles() {
        fetch('http://127.0.0.1:8000/api/json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.contenido.length === 0) {
                showInfo.innerHTML = '<p>No hay archivos JSON válidos almacenados.</p>';
            } else {
                showInfo.innerHTML = '<ul>' + data.contenido.map(file => `<li>${file}</li>`).join('') + '</ul>';
            }
        })
        .catch(error => {
            showInfo.innerHTML = `<p>Error al obtener los archivos JSON: ${error.message}</p>`;
        });
    }

    // Crear un nuevo archivo JSON
    function storeFile() {
        const fileName = prompt("Ingresa el nombre del archivo JSON:");
        const content = prompt("Ingresa el contenido del archivo JSON (en formato JSON):");

        if (fileName && content) {
            try {
                const parsedContent = JSON.parse(content); // Validar si el contenido es un JSON válido
                fetch('http://127.0.0.1:8000/api/json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ filename: fileName, content: content }),
                })
                .then(response => response.json())
                .then(data => {
                    showInfo.innerHTML = `<p>${data.mensaje}</p>`;
                })
                .catch(error => {
                    showInfo.innerHTML = `<p>Error al guardar el archivo JSON: ${error.message}</p>`;
                });
            } catch (err) {
                showInfo.innerHTML = '<p>Error: El contenido debe ser un JSON válido.</p>';
            }
        }
    }

    // Mostrar un archivo JSON específico
    function showFile() {
        const fileName = prompt("Ingresa el nombre del archivo JSON a mostrar:");

        fetch(`http://127.0.0.1:8000/api/json/${fileName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.contenido) {
                showInfo.innerHTML = `<pre>${JSON.stringify(data.contenido, null, 2)}</pre>`;
            } else {
                showInfo.innerHTML = `<p>${data.mensaje}</p>`;
            }
        })
        .catch(error => {
            showInfo.innerHTML = `<p>Error al mostrar el archivo JSON: ${error.message}</p>`;
        });
    }

    // Actualizar un archivo JSON
    function updateFile() {
        const fileName = prompt("Ingresa el nombre del archivo JSON a actualizar:");
        const newContent = prompt("Ingresa el nuevo contenido del archivo JSON (en formato JSON):");

        if (fileName && newContent) {
            try {
                const parsedContent = JSON.parse(newContent); // Validar si el contenido es un JSON válido
                fetch(`http://127.0.0.1:8000/api/json/${fileName}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: newContent }),
                })
                .then(response => response.json())
                .then(data => {
                    showInfo.innerHTML = `<p>${data.mensaje}</p>`;
                })
                .catch(error => {
                    showInfo.innerHTML = `<p>Error al actualizar el archivo JSON: ${error.message}</p>`;
                });
            } catch (err) {
                showInfo.innerHTML = '<p>Error: El contenido debe ser un JSON válido.</p>';
            }
        }
    }

    // Eliminar un archivo JSON
    function deleteFile() {
        const fileName = prompt("Ingresa el nombre del archivo JSON a eliminar:");

        fetch(`http://127.0.0.1:8000/api/json/${fileName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            showInfo.innerHTML = `<p>${data.mensaje}</p>`;
        })
        .catch(error => {
            showInfo.innerHTML = `<p>Error al eliminar el archivo JSON: ${error.message}</p>`;
        });
    }
});
