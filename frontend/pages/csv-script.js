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

    // Obtener todos los archivos CSV
    function getFiles() {
        fetch('http://127.0.0.1:8000/api/csv', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verifica toda la respuesta
            console.log(data.contenido); // Inspecciona 'contenido'
            if (!Array.isArray(data.contenido)) {
                showInfo.innerHTML = `<p>Error: contenido no es un array. Respuesta: ${JSON.stringify(data)}</p>`;
                return;
            }
            if (data.contenido.length === 0) {
                showInfo.innerHTML = '<p>No hay archivos CSV almacenados.</p>';
            } else {
                showInfo.innerHTML = '<ul>' + data.contenido.map(file => `<li>${file}</li>`).join('') + '</ul>';
            }
        })
        .catch(error => {
            showInfo.innerHTML = `<p>Error al obtener los archivos CSV: ${error.message}</p>`;
        });
        
    }

    // Crear un nuevo archivo CSV
    function storeFile() {
        const fileName = prompt("Ingresa el nombre del archivo CSV:");
        const content = prompt("Ingresa el contenido del archivo CSV (en formato CSV):");

        if (fileName && content) {
            fetch('http://127.0.0.1:8000/api/csv', {
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
                showInfo.innerHTML = `<p>Error al guardar el archivo CSV: ${error.message}</p>`;
            });
        }
    }

    // Mostrar el contenido de un archivo CSV
    function showFile() {
        const fileName = prompt("Ingresa el nombre del archivo CSV a mostrar:");

        fetch(`http://127.0.0.1:8000/api/csv/${fileName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.contenido) {
                const table = generateTable(data.contenido);
                showInfo.innerHTML = `<p>${data.mensaje}</p>${table}`;
            } else {
                showInfo.innerHTML = `<p>${data.mensaje}</p>`;
            }
        })
        .catch(error => {
            showInfo.innerHTML = `<p>Error al mostrar el archivo CSV: ${error.message}</p>`;
        });
    }

    // Generar una tabla HTML a partir de los datos CSV
    function generateTable(data) {
        if (!Array.isArray(data) || data.length === 0) return '<p>No hay datos para mostrar.</p>';

        let table = '<table border="1"><thead><tr>';
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            table += `<th>${header}</th>`;
        });
        table += '</tr></thead><tbody>';
        data.forEach(row => {
            table += '<tr>';
            headers.forEach(header => {
                table += `<td>${row[header]}</td>`;
            });
            table += '</tr>';
        });
        table += '</tbody></table>';
        return table;
    }

    // Actualizar un archivo CSV
    function updateFile() {
        const fileName = prompt("Ingresa el nombre del archivo CSV a actualizar:");
        const newContent = prompt("Ingresa el nuevo contenido del archivo CSV (en formato CSV):");

        if (fileName && newContent) {
            fetch(`http://127.0.0.1:8000/api/csv/${fileName}`, {
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
                showInfo.innerHTML = `<p>Error al actualizar el archivo CSV: ${error.message}</p>`;
            });
        }
    }

    // Eliminar un archivo CSV
    function deleteFile() {
        const fileName = prompt("Ingresa el nombre del archivo CSV a eliminar:");

        fetch(`http://127.0.0.1:8000/api/csv/${fileName}`, {
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
            showInfo.innerHTML = `<p>Error al eliminar el archivo CSV: ${error.message}</p>`;
        });
    }
});
