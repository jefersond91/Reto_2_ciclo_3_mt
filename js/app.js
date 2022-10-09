let newMachine = document.querySelector( '.sectionForm_machine' );
let updateMachine = document.querySelector( '.sectionDetails_machine' );
let dataMachine = document.querySelector( '.data_machine' );
let tableMachine = document.querySelector( '.table_machine' );
let deleteMachine = document.querySelector( '.delete_final_machine' );

let newClient = document.querySelector( '.sectionForm_client' );
let updateClient = document.querySelector( '.sectionDetails_client' );
let dataClient = document.querySelector( '.data_client' );
let tableClient = document.querySelector( '.table_client' );
let deleteClient = document.querySelector( '.delete_final_client' );

let newMessage = document.querySelector( '.sectionForm_message' );
let updateMessage = document.querySelector( '.sectionDetails_message' );
let dataMessage = document.querySelector( '.data_message' );
let tableMessage = document.querySelector( '.table_message' );
let deleteMessage = document.querySelector( '.delete_final_message' );

initial();
getMachineList();
getClientList();
getMessageList();

function initial () {
  newMachine.style.display = 'none';
  updateMachine.style.display = 'none';
  dataMachine.style.display = 'inline-flex';
  // tableMachine.style.display = "table";
  deleteMachine.style.display = 'none';

  newClient.style.display = 'none';
  updateClient.style.display = 'none';
  dataClient.style.display = 'inline-flex';
  // tableClient.style.display = "table";
  deleteClient.style.display = 'none';

  newMessage.style.display = 'none';
  updateMessage.style.display = 'none';
  dataMessage.style.display = 'inline-flex';
  // tableMessage.style.display = "table";
  deleteMessage.style.display = 'none';
}

function getMachineList () {
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine';

  //crear un objeto
  let request = new XMLHttpRequest();

  let registers = '';
  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 )
    {
      let response = JSON.parse( this.responseText );

      // console.log( "codigo de respuesta: " + this.status );
      // console.log( "readyState: " + this.readyState );
      // console.log( "repuesta antes de convertir: " + this.responseText );
      // console.log( "respuesta despues de convertir: " + response );

      //crear html usando lso datos de la respuesta que me da el servicio
      for ( let i in response.items )
      {
        let id = response.items[ i ].id;

        registers +=
          '<tr>\
          <td>' + response.items[ i ].id + '</td>\
          <td>' + response.items[ i ].brand + '</td>\
          <td>' + response.items[ i ].model + '</td>\
          <td>' + response.items[ i ].category_id + '</td>\
          <td>' + response.items[ i ].name + '</td>\
          <td>\
                <button class="button_edit" onclick="edit_Machine(' + id + ')">Edit</button>\
                <button class="button_delete" onclick="false_delete_Machine(' + id + ')">Delete</button>\
          </td>\
          </tr>';
      }
      tableMachine.innerHTML = registers;
    }
  };
  request.open( 'GET', url, true );
  request.send();
}

function getClientList () {
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client';

  //crear un objeto
  let request = new XMLHttpRequest();

  let registers = '';
  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 )
    {
      let response = JSON.parse( this.responseText );

      for ( let i in response.items )
      {
        let id = response.items[ i ].id;

        registers +=
        '<tr>\
        <td>' + response.items[ i ].id + '</td>\
        <td>' + response.items[ i ].name + '</td>\
        <td>' + response.items[ i ].email + '</td>\
        <td>' + response.items[ i ].age + '</td>\
        <td>\
              <button class="button_edit" onclick="edit_Client(' + id + ')">Edit</button>\
              <button class="button_delete" onclick="false_delete_Client(' + id + ')">Delete</button>\
        </td>\
        </tr>';
      }
      tableClient.innerHTML = registers;
    }
  };
  request.open( 'GET', url, true );
  request.send();
}

function getMessageList () {
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message';

  //crear un objeto
  let request = new XMLHttpRequest();

  let registers = '';
  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 )
    {
      let response = JSON.parse( this.responseText );

      //crear html usando lso datos de la respuesta que me da el servicio
      for ( let i in response.items )
      {
        let id = response.items[ i ].id;

        registers +=
        '<tr>\
        <td>' + response.items[ i ].id + '</td>\
        <td>' + response.items[ i ].messagetext + '</td>\
        <td>\
              <button class="button_edit" onclick="edit_Message(' + id + ')">Edit</button>\
              <button class="button_delete" onclick="false_delete_Message(' + id + ')">Delete</button>\
        </td>\
        </tr>';
      }
      tableMessage.innerHTML = registers;
    }
  };
  request.open( 'GET', url, true );
  request.send();
}

function new_Machine () {
  newMachine.style.display = 'inline-flex';
  updateMachine.style.display = 'none';
  dataMachine.style.display = 'none';
  // tableMachine.style.display = "none";
  deleteMachine.style.display = 'none';

  newClient.style.display = 'none';
  updateClient.style.display = 'none';
  dataClient.style.display = 'none';
  // tableClient.style.display = "none";
  deleteClient.style.display = 'none';

  newMessage.style.display = 'none';
  updateMessage.style.display = 'none';
  dataMessage.style.display = 'none';
  // tableMessage.style.display = "none";
  deleteMessage.style.display = 'none';
}

function new_Client () {
  newMachine.style.display = 'none';
  updateMachine.style.display = 'none';
  dataMachine.style.display = 'none';
  // tableMachine.style.display = "none";
  deleteMachine.style.display = 'none';

  newClient.style.display = 'inline-flex';
  updateClient.style.display = 'none';
  dataClient.style.display = 'none';
  // tableClient.style.display = "none";
  deleteClient.style.display = 'none';

  newMessage.style.display = 'none';
  updateMessage.style.display = 'none';
  dataMessage.style.display = 'none';
  // tableMessage.style.display = "none";
  deleteMessage.style.display = 'none';
}

function new_Message () {
  newMachine.style.display = 'nonne';
  updateMachine.style.display = 'none';
  dataMachine.style.display = 'none';
  // tableMachine.style.display = "none";
  deleteMachine.style.display = 'none';

  newClient.style.display = 'none';
  updateClient.style.display = 'none';
  dataClient.style.display = 'none';
  // tableClient.style.display = "none";
  deleteClient.style.display = 'none';

  newMessage.style.display = 'inline-flex';
  updateMessage.style.display = 'none';
  dataMessage.style.display = 'none';
  // tableMessage.style.display = "none";
  deleteMessage.style.display = 'none';
}

function save_Machine() {
  //acceder a los datos de los inputs
  let id_machine = document.querySelector( '#id_machine' ).value;
  let brand = document.querySelector( '#brand' ).value;
  let model = document.querySelector( '#model' ).value;
  let categoryId = document.querySelector( '#categoryId' ).value;
  let name_machine = document.querySelector( '#name_machine' ).value;

  // crear objecto javascript
  let object = {
    id:id_machine,
    brand,
    model,
    category_id:categoryId,
    name:name_machine
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine';

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      //Configura el aspecto de la pagina
      getMachineList();
      getClientList();
      getMessageList();
      initial();
    }
  };
  request.open( 'POST', url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}

function save_Client() {
  //acceder a los inputs
  let id_client = document.querySelector( '#id_client' ).value;
  let name_client = document.querySelector( '#name_client' ).value;
  let email = document.querySelector( '#email' ).value;
  let age = document.querySelector( '#age' ).value;

  // crear objecto javascript
  let object = {
    id:id_client,
    name:name_client,
    email,
    age,
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client';

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      //Configura el aspecto de la pagina
      getMachineList();
      getClientList();
      getMessageList();
      initial();
    }
  };
  request.open( 'POST', url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}

function save_Message() {
  //acceder a los inputs
  let id_message = document.querySelector( '#id_message' ).value;
  let message = document.querySelector( '#message' ).value;

  // crear objecto javascript
  let object = {
    id:id_message,
    message,
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message';

  //crear un objeto de petición
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      //Configura el aspecto de la pagina
      getMachineList();
      getClientList();
      getMessageList();
      initial();
    }
  };
  request.open( 'POST', url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}

function edit_Machine (id) {
  //crear un objeto
  let request = new XMLHttpRequest();
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine';

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 ){
      let response = JSON.parse( this.responseText );

      let idUpdate_machine = response.items[ 0 ].id;
      let brandUpdate_machine = response.items[ 0 ].brand;
      let modelUpdate_machine = response.items[ 0 ].model;
      let categoryIdUpdate_machine = response.items[ 0 ].category_id;
      let nameUpdate_machine = response.items[ 0 ].name;

      document.querySelector( '#idUpdate_machine' ).value = idUpdate_machine;
      document.querySelector( '#brandUpdate_machine' ).value = brandUpdate_machine;
      document.querySelector( '#modelUpdate_machine' ).value = modelUpdate_machine;
      document.querySelector( '#categoryIdUpdate_machine' ).value = categoryIdUpdate_machine;
      document.querySelector( '#nameUpdate_machine' ).value = nameUpdate_machine;

      // se modifica el titulo para que muestre el id de la maquina y no pueda modificarse
      document.querySelector('#idLabelMachine').innerHTML = "<strong>ID :</strong>" + idUpdate_machine;

      newMachine.style.display = 'none';
      updateMachine.style.display = 'inline-flex';
      dataMachine.style.display = 'none';
      // tableMachine.style.display = "none";
      deleteMachine.style.display = 'none';

      newClient.style.display = 'none';
      updateClient.style.display = 'none';
      dataClient.style.display = 'none';
      // tableClient.style.display = "none";
      deleteClient.style.display = 'none';

      newMessage.style.display = 'none';
      updateMessage.style.display = 'none';
      dataMessage.style.display = 'none';
      // tableMessage.style.display = "none";
      deleteMessage.style.display = 'none';
    }
  };
  request.open( 'GET', url + '/' + id, true );
  request.send();
}

function edit_Client (id) {
  //crear un objeto
  let request = new XMLHttpRequest();
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client';

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 )
    {
      let response = JSON.parse( this.responseText );

      // let idUpdate_client = response.items[ 0 ].id;
      let nameUpdate_client = response.items[ 0 ].name;
      let emaillUpdate_client = response.items[ 0 ].email;
      let ageUpdate_client = response.items[ 0 ].age;

      // document.querySelector( '#idUpdate_client' ).value = idUpdate_client;
      document.querySelector( '#nameUpdate_client' ).value = nameUpdate_client;
      document.querySelector( '#emaillUpdate_client' ).value = emaillUpdate_client;
      document.querySelector( '#ageUpdate_client' ).value = ageUpdate_client;

      // se modifica el titulo para que muestre el id de la maquina y no pueda modificarse
      document.querySelector('#idLabelClient').innerHTML = "<strong>ID :</strong>" + idUpdate_client;

      newMachine.style.display = 'none';
      updateMachine.style.display = 'none';
      dataMachine.style.display = 'none';
      // tableMachine.style.display = "none";
      deleteMachine.style.display = 'none';

      newClient.style.display = 'none';
      updateClient.style.display = 'inline-flex';
      dataClient.style.display = 'none';
      // tableClient.style.display = "none";
      deleteClient.style.display = 'none';

      newMessage.style.display = 'none';
      updateMessage.style.display = 'none';
      dataMessage.style.display = 'none';
      // tableMessage.style.display = "none";
      deleteMessage.style.display = 'none';
    }
  };
  request.open( 'GET', url + '/' + id, true );
  request.send();
}

function edit_Message (id) {
  //crear un objeto
  let request = new XMLHttpRequest();
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message';

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 )
    {
      let response = JSON.parse( this.responseText );

      // let idUpdate_message = response.items[ 0 ].id;
      let messageTextUpdate_message = response.items[ 0 ].messagetext;

      // document.querySelector( '#idUpdate_message' ).value = idUpdate_message;
      document.querySelector( '#messageTextUpdate_message' ).value = messageTextUpdate_message;

      // se modifica el titulo para que muestre el id de la maquina y no pueda modificarse
      document.querySelector('#idLabelMessage').innerHTML = "<strong>ID :</strong>" + idUpdate_message;

      newMachine.style.display = 'none';
      updateMachine.style.display = 'none';
      dataMachine.style.display = 'none';
      // tableMachine.style.display = "none";
      deleteMachine.style.display = 'none';

      newClient.style.display = 'none';
      updateClient.style.display = 'none';
      dataClient.style.display = 'none';
      // tableClient.style.display = "none";
      deleteClient.style.display = 'none';

      newMessage.style.display = 'none';
      updateMessage.style.display = 'inline-flex';
      dataMessage.style.display = 'none';
      // tableMessage.style.display = "none";
      deleteMessage.style.display = 'none';
    }
  };
  request.open( 'GET', url + '/' + id, true );
  request.send();
}

function update_Machine() {
  //acceder a los inputs
  let id_machine = document.querySelector( '#idUpdate_machine' ).value;
  let brand = document.querySelector( '#brandUpdate_machine' ).value;
  let model = document.querySelector( '#modelUpdate_machine' ).value;
  let categoryId = document.querySelector( '#categoryIdUpdate_machine' ).value;
  let name_machine = document.querySelector( '#nameUpdate_machine' ).value;

  // crear objecto javascript
  let object = {
    id:id_machine,
    brand,
    model,
    category_id:categoryId,
    name:name_machine
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine';

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
  request.open( 'PUT', url, true );
  // request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}

function update_Client() {
  //acceder a los inputs
  let id_client = document.querySelector( '#idUpdate_client' ).value;
  let name_client = document.querySelector( '#nameUpdate_client' ).value;
  let email = document.querySelector( '#emaillUpdate_client' ).value;
  let age = document.querySelector( '#ageUpdate_client' ).value;

  // crear objecto javascript
  let object = {
    id:id_client,
    name:name_client,
    email,
    age,
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client';

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
  request.open( 'POST', url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}

function update_Message() {
  //acceder a los inputs
  let id_message = document.querySelector( '#idUpdate_message' ).value;
  let message = document.querySelector( '#messageTextUpdate_message' ).value;

  // crear objecto javascript
  let object = {
    id:id_message,
    message,
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    'https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message';

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
  request.open( 'POST', url, true );
  request.setRequestHeader("content-type", "application/json;charset=UTF-8");
  request.send(objectJson);
}

function false_delete_Machine () {
  newMachine.style.display = 'none';
  updateMachine.style.display = 'none';
  dataMachine.style.display = 'none';
  // tableMachine.style.display = "none";
  deleteMachine.style.display = 'inline-flex';

  newClient.style.display = 'none';
  updateClient.style.display = 'none';
  dataClient.style.display = 'none';
  // tableClient.style.display = "none";
  deleteClient.style.display = 'none';

  newMessage.style.display = 'none';
  updateMessage.style.display = 'none';
  dataMessage.style.display = 'none';
  // tableMessage.style.display = "none";
  deleteMessage.style.display = 'none';
}

function false_delete_Client () {
  newMachine.style.display = 'none';
  updateMachine.style.display = 'none';
  dataMachine.style.display = 'none';
  // tableMachine.style.display = "none";
  deleteMachine.style.display = 'none';

  newClient.style.display = 'none';
  updateClient.style.display = 'none';
  dataClient.style.display = 'inline-flex';
  // tableClient.style.display = "none";
  deleteClient.style.display = 'inline-flex';

  newMessage.style.display = 'none';
  updateMessage.style.display = 'none';
  dataMessage.style.display = 'none';
  // tableMessage.style.display = "none";
  deleteMessage.style.display = 'none';
}

function false_delete_Message () {
  newMachine.style.display = 'nonne';
  updateMachine.style.display = 'none';
  dataMachine.style.display = 'none';
  // tableMachine.style.display = "none";
  deleteMachine.style.display = 'none';

  newClient.style.display = 'none';
  updateClient.style.display = 'none';
  dataClient.style.display = 'none';
  // tableClient.style.display = "none";
  deleteClient.style.display = 'none';

  newMessage.style.display = 'none';
  updateMessage.style.display = 'none';
  dataMessage.style.display = 'none';
  // tableMessage.style.display = "none";
  deleteMessage.style.display = 'inline-flex';
}