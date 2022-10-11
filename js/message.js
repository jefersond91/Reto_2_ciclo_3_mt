let new_message = document.getElementById("newMessage" );
let update_message = document.getElementById("detailsMessage" );
let data_message = document.getElementById("dataMessage" );
let table_message = document.getElementById("tableMessage" );
let delete_message = document.getElementById("finalDeleteMessage" );

initial();
getMessageList();

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
function getMessageList () {
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

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
              <td>" + response.items[i].messagetext + '</td>\
              <td>\
                    <button class="button_edit" onclick="edit_Message(' + id + ')">Edit</button>\
                    <button class="button_delete" onclick="false_delete_Message(' + id + ')">Delete</button>\
              </td>\
        </tr>';
      }
      table_message.innerHTML = registers;
    }
  };
  request.open( "GET", url, true );
  request.send();
}


// -----------------------------------------------------------
//mostrar formulario para nuevo ingreso
function new_Message () {
  new_machine.style.display = 'nonne';
  update_machine.style.display = 'none';
  data_machine.style.display = 'none';
  // table_machine.style.display = "none";
  delete_machine.style.display = 'none';

  new_client.style.display = 'none';
  update_client.style.display = 'none';
  data_client.style.display = 'none';
  // table_client.style.display = "none";
  delete_client.style.display = 'none';

  new_message.style.display = 'inline-flex';
  update_message.style.display = 'none';
  data_message.style.display = 'none';
  // table_message.style.display = "none";
  delete_message.style.display = 'none';
}


// -----------------------------------------------------------
//agregar un nuevo elemento al sistema (interfaz y DB)
function save_Message() {
  //acceder a los inputs
  let idMessage = document.getElementById("id_message").value;
  let messageMessage = document.getElementById("message").value;

  // crear objecto javascript
  let object = {
    id: idMessage,
    message: messageMessage
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      //Configura el aspecto de la pagina
      getMachineList()
      getClientList()
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
function edit_Message (id) {
  //crear un objeto
  let request = new XMLHttpRequest();
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 )
    {
      let response = JSON.parse( this.responseText );

      let idUpdate_message = response.items[ 0 ].id;
      let messageTextUpdate_message = response.items[ 0 ].messagetext;

      document.getElementById("idUpdate_message" ).value = idUpdate_message;
      document.getElementById("messageTextUpdate_message" ).value = messageTextUpdate_message;

      // se modifica el titulo para que muestre el id del mensaje y no pueda modificarse
      document.getElementById("idLabelMessage").innerHTML = "<strong>ID :</strong>" + idUpdate_message;

      new_machine.style.display = "none";
      update_machine.style.display = "none";
      data_machine.style.display = "none";
      // table_machine.style.display = "none";
      delete_machine.style.display = "none";

      new_client.style.display = "none";
      update_client.style.display = "none";
      data_client.style.display = "none";
      // table_client.style.display = "none";
      delete_client.style.display = "none";

      new_message.style.display = "none";
      update_message.style.display = "inline-flex";
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
function update_Message() {
  //acceder a los inputs
  let idMessage = document.getElementById("idUpdate_message" ).value;
  let messageMessage = document.getElementById("messageTextUpdate_message" ).value;

  // crear objecto javascript
  let object = {
    id: idMessage,
    message: messageMessage
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      getMachineList();
      getClientList();
      getMessageList();
      initial();
    }
  };
  request.open( "PUT", url, true );
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(objectJson);
}


// -----------------------------------------------------------
//recupera los datos para el formulario de eliminación
function false_delete_Message (id) {
  //1 crear un objeto XMLHttpRequest
  let request = new XMLHttpRequest();
  let url = "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

  
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let response = JSON.parse(this.responseText)

      let idMessage = response.items[0].id
      let messageMessage = response.items[0].messagetext
      
      document.getElementById("idMessageDelete").value = idMessage
      document.getElementById("idMessageList").innerHTML = "<strong> ID :</strong>" + idMessage
      document.getElementById("messageMessageList").innerHTML = "<strong>Message :</strong>" + messageMessage

    new_machine.style.display = "none";
    update_machine.style.display = "none";
    data_machine.style.display = "none";
    // table_machine.style.display = "none";
    delete_machine.style.display = "none";

    new_client.style.display = "none";
    update_client.style.display = "none";
    data_client.style.display = "none";
    // table_client.style.display = "none";
    delete_client.style.display = "none";

    new_message.style.display = "none";
    update_message.style.display = "none";
    data_message.style.display = "none";
    // table_message.style.display = "none";
    delete_message.style.display = "inline-flex";
    }
  };
  request.open("GET", url + "/" + id, true);
  request.send();
}


// -----------------------------------------------------------
//elimacion definitiva del recurso de la interfaz y DB
function final_delete_Message() {
  //acceder a los inputs
  let idMessage = document.getElementById("idMessageDelete" ).value;

  // crear objecto javascript
  let object = {
    id:idMessage
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      // getMachineList();
      // getClientList();
      getMessageList();
      initial();
    }
  };
  request.open( "DELETE", url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}
