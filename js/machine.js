let new_machine = document.getElementById("new" );
let details = document.getElementById("details" );
let data = document.getElementById("dataMachine" );
let table = document.getElementById("tableMachine" );
let delete_machine = document.getElementById("finalDeleteMachine" );

initial();
getList();

function initial () {
  new_machine.style.display = "none";
  details.style.display = "none";
  data.style.display = "inline-flex";
  // table.style.display = "table";
  delete_machine.style.display = "none";
}


// -----------------------------------------------------------
//actuliza la lista con los datos de la DB
function getList () {
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine";

  //crear un objeto
  let request = new XMLHttpRequest();

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    //almacena el html para generar los registros de la tabla
    let registers = "";

    //valida si la peticion fue exitosa
    if ( this.readyState == 4 && this.status == 200 ){
      let response = JSON.parse( this.responseText );

      // console.log( "codigo de respuesta: " + this.status );
      // console.log( "readyState: " + this.readyState );
      // console.log( "repuesta antes de convertir: " + this.responseText );
      // console.log( "respuesta despues de convertir: " + response );

      // crear html usando los datos de la respuesta que me da el servicio
      //variable 'response'
      for ( let i in response.items ){
        let id = response.items[i].id;

        registers +=
          '<tr>\
              <th scope="row">' + response.items[i].id + "</th>\
              <td>" + response.items[i].brand + "</td>\
              <td>" + response.items[i].model + "</td>\
              <td>" + response.items[i].category_id + "</td>\
              <td>" + response.items[i].name + '</td>\
              <td>\
                    <button class="button_edit" onclick="edit(' + id + ')">Edit</button>\
                    <button class="button_delete" onclick="false_delete(' + id + ')">Delete</button>\
              </td>\
          </tr>';
      }
      table.innerHTML = registers;
    }
  };
  request.open( 'GET', url, true );
  request.send();
}


// -----------------------------------------------------------
//mostrar formulario para nuevo ingreso
function add() {
  document.getElementById("id_machine").value=""
  document.getElementById("brand").value=""
  document.getElementById("model").value=""
  document.getElementById("categoryId").value=""
  document.getElementById("name_machine").value=""
  
  new_machine.style.display = 'inline-flex';
  details.style.display = 'none';
  data.style.display = 'none';
  delete_machine.style.display = 'none';
}


// -----------------------------------------------------------
//agregar un nuevo elemento al sistema (interfaz y DB)
function save() {
  //acceder a los datos de los inputs
  let idMachine = document.getElementById("id_machine").value;
  let brandMachine = document.getElementById("brand").value;
  let modelMachine = document.getElementById("model").value;
  let categoryIdMachine = document.getElementById("categoryId").value;
  let nameMachine = document.getElementById("name_machine").value;

  // crear objecto javascript
  let object = {
    id: idMachine,
    brand: brandMachine,
    model: modelMachine,
    category_id: categoryIdMachine,
    name: nameMachine
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object)
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine";

  //crear un objeto de petición
  let request = new XMLHttpRequest()

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 201 ){
      console.log( "codigo de respuesta: " + this.status );
      console.log( "readyState: " + this.readyState )
      
      //Configura el aspecto de la pagina
      getList();
      initial()
    }
  };
  request.open( "POST", url, true )
  request.setRequestHeader("content-type", "application/json;charset=UTF-8")
  request.send(objectJson)
}


// -----------------------------------------------------------
//recupera los datos para el formulario de modificacion
function edit(id) {
  //crear un objeto
  let request = new XMLHttpRequest();
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine";

  //asignar funcion a propiedad onreadystatechance y verificar si es exitosa la respuesta
  request.onreadystatechange = function () {
    if ( this.readyState == 4 && this.status == 200 ){
      let response = JSON.parse( this.responseText )

      let idUpdate_machine = response.items[0].id;
      let brandUpdate_machine = response.items[0].brand;
      let modelUpdate_machine = response.items[0].model;
      let categoryIdUpdate_machine = response.items[0].category_id;
      let nameUpdate_machine = response.items[0].name;

      document.getElementById("idUpdate_machine" ).value = idUpdate_machine;
      document.getElementById("brandUpdate_machine" ).value = brandUpdate_machine;
      document.getElementById("modelUpdate_machine" ).value = modelUpdate_machine;
      document.getElementById("categoryIdUpdate_machine" ).value = categoryIdUpdate_machine;
      document.getElementById("nameUpdate_machine" ).value = nameUpdate_machine;

      // se modifica el titulo para que muestre el id de la maquina y no pueda modificarse
      document.getElementById("idLabelMachine").innerHTML = "<strong>ID :</strong>" + idUpdate_machine;

      new_machine.style.display = "none";
      details.style.display = "inline-flex";
      data.style.display = "none";
      delete_machine.style.display = "none";
    }
  };
  request.open( "GET", url + "/" + id, true );
  request.send();
}


// -----------------------------------------------------------
// envía peticion PUT para modificar recurso en interfaz y DB
function update() {
  //acceder a los inputs
  let idMachine = document.getElementById("idUpdate_machine" ).value;
  let brandMachine = document.getElementById("brandUpdate_machine" ).value;
  let modelMachine = document.getElementById("modelUpdate_machine" ).value;
  let categoryIdMachine= document.getElementById("categoryIdUpdate_machine" ).value;
  let nameMachine = document.getElementById("nameUpdate_machine" ).value;

  // crear objeto javascript
  let object = {
    id: idMachine,
    brand: brandMachine,
    model: modelMachine,
    category_id: categoryIdMachine,
    name: nameMachine
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url = "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine";

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
  request.send(objectJson);
}


// -----------------------------------------------------------
//recupera los datos para el formulario de eliminación
function false_delete(id) {
   //1 crear un objeto XMLHttpRequest
  let request = new XMLHttpRequest();
  let url = "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine";

  
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      let response = JSON.parse(this.responseText)

      let idMachine = response.items[0].id
      let brandMachine = response.items[0].brand
      let modelMachine = response.items[0].model
      let categoryIdMachine = response.items[0].category_id
      let nameMachine = response.items[0].name

      
      document.getElementById("idMachineDelete").value = idMachine
      document.getElementById("idMachineList").innerHTML = "<strong> ID :</strong>" + idMachine
      document.getElementById("brandMachineList").innerHTML = "<strong>Brand :</strong>" + brandMachine
      document.getElementById("modelMachineList").innerHTML = "<strong>Model :</strong>" + modelMachine
      document.getElementById("category_idMachineList").innerHTML = "<strong> Category Id :</strong>" + categoryIdMachine
      document.getElementById("nameMachineList").innerHTML = "<strong> Name :</strong>" + nameMachine

    new_machine.style.display = "none";
    details.style.display = "none";
    data.style.display = "none";
    delete_machine.style.display = "inline-flex";
    }
  };
  request.open("GET", url + "/" + id, true);
  request.send();
}


// -----------------------------------------------------------
//elimacion definitiva del recurso de la interfaz y DB
function final_delete() {
//recuperar la informacion ingresada en el formulario  
  let idMachine = document.getElementById("idMachineDelete" ).value;

  // crear objeto javascript
  let object = {
    id: idMachine
  }

  //convertir el objecto javascript en string o formato JSON
  let objectJson = JSON.stringify(object);
  let url =
    "https://g2d88332c958e94-z3j7qk0nagbnjwez.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/machine/machine";

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