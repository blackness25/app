firebase.initializeApp({

    apiKey: "AIzaSyC6vyU6wJSkZbP2M7w05dXNz7ypUdypZLw",
    authDomain: "nuevo-f337c.firebaseapp.com",
    projectId: "nuevo-f337c"


});
var db = firebase.firestore();
//agregar usuarios
function guardar() {
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = document.getElementById('edad').value;

    db.collection("usuarios").add({
        nombre: nombre,
        apellido: apellido,
        edad: edad
    })
        .then(function (docRef) {
            console.log("Agregado correctamente su ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('edad').value = '';

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}
//Ver datos
var ver_datos = document.getElementById("ver_datos");
db.collection("usuarios").onSnapshot((querySnapshot) => {
    ver_datos.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        ver_datos.innerHTML += `
    <tr>
    <th scope="row">${doc.id}</th>
    <td>${doc.data().nombre}</td>
    <td>${doc.data().apellido}</td>
    <td>${doc.data().edad}</td>
    <td><button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')">Borrar</button></td>
    <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().edad}')">Editar</button></td>
    

</tr>
`
    });
});
//Borrar datos
function eliminar(id) {
    db.collection("usuarios").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//Editar datos
function editar(id,nombre,apellido,edad){

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('edad').value = edad;
    var guardar = document.getElementById('guardar');
    guardar.innerHTML = 'Editar';

    guardar.onclick = function(){
        var usuarioRef = db.collection("usuarios").doc(id);
        // Set the "capital" field of the city 'DC'

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var edad = document.getElementById('edad').value;

        return usuarioRef.update({
            nombre: nombre,
            apellido: apellido,
            edad: edad
        })
        .then(function() {
            console.log("Document successfully updated!");
            guardar.innerHTML = 'Ingresar';
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('edad').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
}
