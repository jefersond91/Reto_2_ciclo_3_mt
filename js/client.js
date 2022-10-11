let new_client = document.getElementById("new" );
let details = document.getElementById("details" );
let data = document.getElementById("dataClient" );
let table = document.getElementById("tableClient" );
let delete_client = document.getElementById("finalDeleteClient" );

initial();
getList();

function initial () {
  new_client.style.display = "none";
  details.style.display = "none";
  data.style.display = "inline-flex";
  // table.style.display = "table";
  delete_client.style.display = "none";
}


// -----------------------------------------------------------
//actuliza la lista con los datos de la DB
function getList () {
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";

  //crear un objeto
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    //almacena el html para generar los registros de la tabla
    let registers = "";

    //valida si la peticion fue exitosa
    if ( this.readyState == 4 && this.status == 200 ){
      let response = JSON.parse( this.responseText );

      // console.log("Codigo de respuesta: " + this.status);
      // console.log("readyState: " + this.readyState);
      // console.log("Respuesta antes de convertir: " + this.responseText);
      // console.log("Respuesta despues de convertir a JSON: " + response);

      //crear html usando los datos de la respuesta que me da el servicio
      //variable 'response'
      for ( let i in response.items ){
        let id = response.items[i].id;

        registers +=
        '<tr>\
              <th scope="row">' + response.items[i].id + "</th>\
              <td>" + response.items[i].name + "</td>\
              <td>" + response.items[i].email + "</td>\
              <td>" + response.items[i].age + '</td>\
              <td>\
                    <button class="button_edit" onclick="edit(' + id + ')">Edit</button>\
                    <button class="button_delete" onclick="false_delete(' + id + ')">Delete</button>\
              </td>\
        </tr>';
      }
      table.innerHTML = registers;
    }
  };
  request.open( "GET", url, true );
  request.send();
}


// -----------------------------------------------------------
//mostrar formulario para nuevo ingreso
function add() {
  document.getElementById("id_client").value=""
  document.getElementById("name_client").value=""
  document.getElementById("email").value=""
  document.getElementById("age").value=""

  new_client.style.display = 'inline-flex';
  details.style.display = 'none';
  data.style.display = 'none';
  delete_client.style.display = 'none';
}


// -----------------------------------------------------------
//agregar un nuevo elemento al sistema (interfaz y DB)
function save() {
  //acceder a los inputs
  let idClient = document.getElementById("id_client").value;
  let nameClient = document.getElementById("name_client").value;
  let emailClient = document.getElementById("email").value;
  let ageClient = document.getElementById("age").value;

  // crear objecto javascript
  let object = {
    id: idClient,
    name: nameClient,
    email: emailClient,
    age: ageClient
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      //Configura el aspecto de la pagina
      getList()
      initial()
    }
  };
  request.open( "POST", url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}


// -----------------------------------------------------------
//recupera los datos para el formulario de modificacion
function edit(id) {
  //crear un objeto
  let request = new XMLHttpRequest();
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 )
    {
      let response = JSON.parse( this.responseText );

      let idUpdate_client = response.items[0].id;
      let nameUpdate_client = response.items[0].name;
      let emailUpdate_client = response.items[0].email;
      let ageUpdate_client = response.items[0].age;

      document.getElementById("idUpdate_client" ).value = idUpdate_client;
      document.getElementById("nameUpdate_client" ).value = nameUpdate_client;
      document.getElementById("emailUpdate_client" ).value = emailUpdate_client;
      document.getElementById("ageUpdate_client" ).value = ageUpdate_client;

      // se modifica el titulo para que muestre el id de la maquina y no pueda modificarse
      document.getElementById("idLabelClient").innerHTML = "<strong>ID :</strong>" + idUpdate_client;

      new_client.style.display = "none";
      details.style.display = "inline-flex";
      data.style.display = "none";
      delete_client.style.display = "none";
    }
  };
  request.open( "GET", url + "/" + id, true );
  request.send();
}


// -----------------------------------------------------------
// envía peticion PUT para modificar recurso en interfaz y DB
function update() {
  //acceder a los inputs
  let idClient = document.getElementById("idUpdate_client" ).value;
  let nameClient = document.getElementById("nameUpdate_client" ).value;
  let emailClient = document.getElementById("emailUpdate_client" ).value;
  let ageClient = document.getElementById("ageUpdate_client" ).value;

  // crear objecto javascript
  let object = {
    id: idClient,
    name: nameClient,
    email: emailClient,
    age: ageClient
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      getList();
      initial();
    }
  };
  request.open( "PUT", url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson)
}


// -----------------------------------------------------------
//recupera los datos para el formulario de eliminación
function false_delete(id) {
  //1 crear un objeto XMLHttpRequest
  let request = new XMLHttpRequest();
  let url = "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";

  
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let response = JSON.parse(this.responseText)

      let idClient = response.items[0].id
      let nameClient = response.items[0].name
      let emailClient = response.items[0].email
      let ageClient = response.items[0].age
      
      document.getElementById("idClientDelete").value = idClient
      document.getElementById("idClientList").innerHTML = "<strong> ID :</strong>" + idClient
      document.getElementById("nameClientList").innerHTML = "<strong>Name :</strong>" + nameClient
      document.getElementById("emailClientList").innerHTML = "<strong>Email :</strong>" + emailClient
      document.getElementById("ageClientList").innerHTML = "<strong> Age:</strong>" + ageClient

    new_client.style.display = "none";
    details.style.display = "none";
    data.style.display = "none";
    delete_client.style.display = "inline-flex";
    }
  };
  request.open("GET", url + "/" + id, true);
  request.send();
}


// -----------------------------------------------------------
//elimacion definitiva del recurso de la interfaz y DB
function final_delete() {
  //acceder a los inputs
  let idClient = document.getElementById("idClientDelete" ).value;

  // crear objecto javascript
  let object = {
    id: idClient
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 204 ){
      getList();
      initial();
    }
  };
  request.open( "DELETE", url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson)
}