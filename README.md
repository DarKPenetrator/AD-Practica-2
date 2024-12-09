# AD Practica 2

---
<br>


## **Índice**

1. **Pasos Previos**
2. **Iniciar el Servidor Backend**
3. **Tests de Prueba**


<br><br>

### **1. Pasos Previos** 
---
Inicialmente el proyecto esta configurado para ser utilizado con tal solo iniciar el servidor pero primero hay que confirmar que todo funciona correctamente y tener instalado ``php`` en el sistema, si no lo tienes aquí tiene el link https://www.php.net/downloads.php.

Pasos previos:

1. **Descargue el repositorio y descomprímalo o clónelo directamente.**
```bash
git clone https://github.com/DarKPenetrator/AD-Practica-2.git
```
2. Abra el directorio en `cmd`.

```bash
cd .\AD-Practica-2
```
3. **Tendrá dos carpetas: Frontend y Backend.**
4. **Se necesita comprobar que el Backend funciona correctamente.**

Navega al directorio del backend
```bash
cd .\backend\ud2-storage-pub\
```

Y ejecuta el siguiente comando(Puede tardar unos segundos, si tarda demasiado presionar CTRL+C y volver a ejecutar)
```bash
php artisan test
```
<br>
Deberían salir tres test diferentes y salir todos en verde marcando que esta todo correcto
Si es el caso, todo estaría funcionando correctamente
Por tanto se podría iniciar el servidor del backend sin problemas.



<br><br>

### **2. Iniciar el Servidor**

---

Ubicados en el directorio `AD-Practica-2\backend\ud2-storage-pub\`, ejecutamos el siguiente comando para activar el servidor Backend:

```bash
php artisan serve
```


Una vez iniciado el servidor, podemos acceder a la parte visual para el cliente. Es algo bastante simple pero práctico.

Navegamos a la carpeta `Frontend` y abrimos el archivo llamado `index.html`. Desde ahí, podemos navegar a las diferentes opciones disponibles para elegir el tipo de datos que más nos convenga.

#### **Tipos de datos disponibles:**

- **Class Storage**   
- **JSON**    
- **CSV**
- **XML**(No implementado aun) 
<br><br>

Cada tipo de dato permite realizar 5 operaciones posibles:

- **GET FILES**:  
    Obtiene todos los archivos almacenados de ese tipo de datos. Al hacer clic, mostrará una lista con los nombres de los archivos disponibles.
    <br>
- **STORE**:  
    Permite crear un nuevo archivo. Al hacer clic, solicitará ingresar el nombre del archivo a guardar y, posteriormente, el contenido del mismo.
    <br>
- **SHOW**:  
    Muestra los datos de un archivo específico. Al hacer clic, pedirá el nombre de un archivo existente y, si se encuentra, mostrará su contenido.
    <br>
- **UPDATE**:  
    Actualiza el contenido de un archivo existente. Al hacer clic, solicitará el nombre del archivo que se desea modificar y, después, permitirá ingresar nuevos datos que reemplazarán a los existentes.
    <br>
- **DELETE**:  
    Elimina un archivo. Al hacer clic, pedirá el nombre del archivo que se desea eliminar y procederá a borrarlo si existe.
	<br>



<br><br>
### **3. Tests de Prueba**

---


Para cada tipo de dato se ha creado un archivo de prueba llamado `test.(extensión del formato)` que puede ser utilizado para verificar el funcionamiento de las operaciones. Además, se han agregado algunos comandos adicionales para que se pueda experimentar introduciendo, actualizando y gestionando nuevos datos.

<br>

#### Class Storage Ejemplo


Nombre Archivo
```bash
testTXT.txt
```



Datos a introducir
```bash
To-Do List:
1. Completar la práctica de Class Storage.
2. Revisar el contenido del archivo test.json.
3. Probar las funcionalidades con el archivo test.csv.
```
<br>

#### JSON Ejemplo


Nombre Archivo
```bash
testJSON.json
```



Datos a introducir
```bash
{
    "username": "coder123",
    "email": "coder123@example.com",
    "preferences": {
        "theme": "dark",
        "notifications": true,
        "language": "es"
    }
}
```
<br>

#### CSV Ejemplo


Nombre Archivo
```bash
testCSV.csv
```



Datos a introducir
```bash
id,producto,precio,stock
101,Laptop,899.99,15
102,Smartphone,599.99,30
103,Tablet,299.99,20
104,Monitor,199.99,10
```
