firebase.initializeApp({

    apiKey: "AIzaSyC6vyU6wJSkZbP2M7w05dXNz7ypUdypZLw",
    authDomain: "nuevo-f337c.firebaseapp.com",
    projectId: "nuevo-f337c"
  
   
});
var db = firebase.firestore();
//agregar usuarios
function guardar(){
    var nombre=document.getElementById('nombre').value;
    var apellido=document.getElementById('apellido').value;
    var edad=document.getElementById('edad').value;

    db.collection("usuarios").add({
        nombre: nombre,
        apellido: apellido,
        edad: edad
    })
        .then(function (docRef) {
            console.log("Agregado correctamente su ID: ", docRef.id);
            document.getElementById('nombre').value='';
            document.getElementById('apellido').value='';
            document.getElementById('edad').value='';

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}
//Ver datos
var ver_datos=document.getElementById("ver_datos");
db.collection("usuarios").onSnapshot((querySnapshot) => {
    ver_datos.innerHTML ='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
    ver_datos.innerHTML += `
    <tr>
    <th scope="row">${doc.id}</th>
    <td>${doc.data().nombre}</td>
    <td>${doc.data().apellido}</td>
    <td>${doc.data().edad}</td>
</tr>
`
    });
});