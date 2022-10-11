let new_client = document.getElementById("newClient" );
let update_client = document.getElementById("detailsClient" );
let data_client = document.getElementById("dataClient" );
let table_client = document.getElementById("tableClient" );
let delete_client = document.getElementById("finalDeleteClient" );

initial();
getClientList();

function initial () {
  new_machine.style.display = "none";
  update_machine.style.display = "none";
  data_machine.style.display = "inline-flex";
  // table_machine.style.display = "table";
  delete_machine.style.display = "none";

  new_client.style.display = "none";
  update_client.style.display = "none";
  data_client.style.display = "inline-flex";
  // table_client.style.display = "table";
  delete_client.style.display = "none";

  new_message.style.display = "none";
  update_message.style.display = "none";
  data_message.style.display = "inline-flex";
  // table_message.style.display = "table";
  delete_message.style.display = "none";
}

// -----------------------------------------------------------
//actuliza la lista con los datos de la DB
function getClientList () {
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
                    <button class="button_edit" onclick="edit_Client(' + id + ')">Edit</button>\
                    <button class="button_delete" onclick="false_delete_Client(' + id + ')">Delete</button>\
              </td>\
        </tr>';
      }
      table_client.innerHTML = registers;
    }
  };
  request.open( "GET", url, true );
  request.send();
}


// -----------------------------------------------------------
//mostrar formulario para nuevo ingreso
function new_Client () {
  new_machine.style.display = 'none';
  update_machine.style.display = 'none';
  data_machine.style.display = 'none';
  // table_machine.style.display = "none";
  delete_machine.style.display = 'none';

  new_client.style.display = 'inline-flex';
  update_client.style.display = 'none';
  data_client.style.display = 'none';
  // table_client.style.display = "none";
  delete_client.style.display = 'none';

  new_message.style.display = 'none';
  update_message.style.display = 'none';
  data_message.style.display = 'none';
  // table_message.style.display = "none";
  delete_message.style.display = 'none';
}


// -----------------------------------------------------------
//agregar un nuevo elemento al sistema (interfaz y DB)
function save_Client() {
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
      getClientList()
      getMachineList()
      getMessageList()
      initial()
    }
  };
  request.open( "POST", url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}


// -----------------------------------------------------------
//recupera los datos para el formulario de modificacion
function edit_Client (id) {
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

      new_machine.style.display = "none";
      update_machine.style.display = "none";
      data_machine.style.display = "none";
      // table_machine.style.display = "none";
      delete_machine.style.display = "none";

      new_client.style.display = "none";
      update_client.style.display = "inline-flex";
      data_client.style.display = "none";
      // table_client.style.display = "none";
      delete_client.style.display = "none";

      new_message.style.display = "none";
      update_message.style.display = "none";
      data_message.style.display = "none";
      // table_message.style.display = "none";
      delete_message.style.display = "none";
    }
  };
  request.open( "GET", url + "/" + id, true );
  request.send();
}


// -----------------------------------------------------------
// envía peticion PUT para modificar recurso en interfaz y DB
function update_Client() {
  //acceder a los inputs
  let idClient = document.getElementById("idUpdate_client" ).value;
  let nameClient = document.getElementById("nameUpdate_client" ).value;
  let emailClient = document.getElementById("emaillUpdate_client" ).value;
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
      getMachineList();
      getMessageList();
      getClientList();
      initial();
    }
  };
  request.open( "POST", url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson)
}


// -----------------------------------------------------------
//recupera los datos para el formulario de eliminación
function false_delete_Client (id) {
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

    new_machine.style.display = "none";
    update_machine.style.display = "none";
    data_machine.style.display = "none";
    // table_machine.style.display = "none";
    delete_machine.style.display = "none";

    new_client.style.display = "none";
    update_client.style.display = "none";
    data_client.style.display = "none";
    // table_client.style.display = "none";
    delete_client.style.display = "inline-flex";

    new_message.style.display = "none";
    update_message.style.display = "none";
    data_message.style.display = "none";
    // table_message.style.display = "none";
    delete_message.style.display = "none";
    }
  };
  request.open("GET", url + "/" + id, true);
  request.send();
}


// -----------------------------------------------------------
//elimacion definitiva del recurso de la interfaz y DB
function final_delete_Client() {
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
      getMachineList();
      getMessageList();
      getClientList();
      initial();
    }
  };
  request.open( "DELETE", url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson)
}