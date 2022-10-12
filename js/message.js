let new_message = document.getElementById("new" );
let details = document.getElementById("details" );
let data = document.getElementById("dataMessage" );
let table = document.getElementById("tableMessage" );
let delete_message = document.getElementById("finalDeleteMessage" );

initial();
getList();

// let buttonAdd = document.getElementById("add" );
// buttonAdd.addEventListener("click", ()=> {
//   document.getElementById("id_message").value=""
//   document.getElementById("message").value=""

//   new_message.style.display = 'inline-flex';
//   details.style.display = 'none';
//   data.style.display = 'none';
//   delete_message.style.display = 'none';
// })

// let buttonCancel = document.querySelector(".button_cancel" );
// buttonCancel.addEventListener("click", ()=> 
//   initial()
// )

// let buttonNo = document.querySelector(".no" );
// buttonNo.addEventListener("click", ()=> 
//   initial()
// )

function initial () {
  new_message.style.display = "none";
  details.style.display = "none";
  data.style.display = "inline-flex";
  delete_message.style.display = "none";
}


// -----------------------------------------------------------
//actuliza la lista con los datos de la DB
function getList() {
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

  //crear un objeto
  let request = new XMLHttpRequest();
  let registers = "";

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    //almacena el html para generar los registros de la tabla

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
        "<tr>\
              <th scope=\"row\">" + response.items[i].id + "</th>\
              <td>" + response.items[i].messagetext + "</td>\
              <td>\
                    <button class=\"button_edit\" onclick=\"edit(" + id + ")\">Edit</button>\
                    <button class=\"button_delete\" onclick=\"false_delete(" + id + ")\">Delete</button>\
              </td>\
        </tr>";
      }
      table.innerHTML = registers;
      initial();
    }
  };
  request.open( "GET", url, true );
  request.send();
}


// -----------------------------------------------------------
//mostrar formulario para nuevo ingreso
function add() {
  document.getElementById("id_message").value=""
  document.getElementById("message").value=""

  new_message.style.display = 'inline-flex';
  details.style.display = 'none';
  data.style.display = 'none';
  delete_message.style.display = 'none';
}


// -----------------------------------------------------------
//agregar un nuevo elemento al sistema (interfaz y DB)
function save() {
  //acceder a los inputs
  let idMessage= document.getElementById("id_message").value;
  let messageText = document.getElementById("message").value;

  // crear objecto javascript
  let object = {
    id: idMessage,
    messagetext: messageText
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object)
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      //Configura el aspecto de la pagina
      getList();
      initial();
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
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 ){
      let response = JSON.parse( this.responseText );

      let idUpdate_message = response.items[ 0 ].id;
      let messageTextUpdate_message = response.items[ 0 ].messagetext;

      document.getElementById("idUpdate_message" ).value = idUpdate_message;
      document.getElementById("messageTextUpdate_message" ).value = messageTextUpdate_message;

      // se modifica el titulo para que muestre el id del mensaje y no pueda modificarse
      document.getElementById("idLabelMessage").innerHTML = "<strong>ID :</strong>" + idUpdate_message;

      new_message.style.display = "none";
      details.style.display = "inline-flex";
      data.style.display = "none";
      delete_message.style.display = "none";
    }
  };
  request.open( "GET", url + "/" + id, true );
  request.send();
}


// -----------------------------------------------------------
// envía peticion PUT para modificar recurso en interfaz y DB
function update() {
  //acceder a los inputs
  let idMessage = document.getElementById("idUpdate_message" ).value;
  let messageText = document.getElementById("messageTextUpdate_message" ).value;

  // crear objecto javascript
  let object = {
    id: idMessage,
    messagetext: messageText
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
      getList();
      initial();
    }
  };
  request.open( "PUT", url, true );
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.send(objectJson);
}


// -----------------------------------------------------------
//recupera los datos para el formulario de eliminación
function false_delete(id) {
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

    new_message.style.display = "none";
    details.style.display = "none";
    data.style.display = "none";
    delete_message.style.display = "inline-flex";
    }
  };
  request.open("GET", url + "/" + id, true);
  request.send();
}


// -----------------------------------------------------------
//elimacion definitiva del recurso de la interfaz y DB
function final_delete() {
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
    if ( this.readyState == 4 && this.status == 204 ){
      getList();
      initial();
    }
  };
  request.open( "DELETE", url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}
