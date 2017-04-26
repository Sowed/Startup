//Module to perform CRUD  operations on Persons DB

const database = require('./database');

window.onload = () => {
    //Populate the persons tables
    populateTable();

    //Create Add-button click listener
    $('#addNewPerson').click((e) => {
        //e.preventDefault();
        addNewPerson();
    });
};

//Add a person
function addNewPerson() {

    //Get input fields
    let firstname = $('#surname'),
        lastname = $('#othername');
    //ToDo: Validate inputs entries
    console.log(firstname.val() + '' + lastname.val());

    //ToDO: Check for duplicates before addition
    //Save person to the database
    database.addPerson(firstname.val(), lastname.val());

    //ToDO: Add alert message on success writing
    //Reset input fields on success message
    firstname.val('');
    lastname.val('');

    //Repopulate the table
    populateTable();

    console.log(firstname + lastname);

}

//Delete a person
function deletePerson(id) {

    //Delete the person from the database
    database.deletePerson(id);

    //Repopulate the table
    populateTable();

}
//Edit a person
function editPerson(id) {

    //ToDO: Edit the person with the _id value from selected table row
    //Create a form to update the inputs,

    //Edit the person in the database
    database.editPerson(id);

    //Repopulate the table
    populateTable();

}

//Fill the All persons table from db
function populateTable() {
    let personsTableBody = $('#personsTableBody'),
        loadPersons = $('#loadPersons'),
        personsStatus = $('#personsStatus');

    //Retrieve the Persons
    database.getPersons(function (persons) {
        //Generate the table body
        let tableBody = '';
        for (let i = 0; i < persons.length; i++) {

            tableBody = `${tableBody}<tr data-person=${persons[i]._id}><td>${i + 1}</td><td>${persons[i].firstname}</td><td>${persons[i].lastname}</td><td>Member</td><td><div class="btn" role="button"><i class="ti-pencil-alt"></i></div><div id=${persons[i]._id} class="btn remove-person" role="button"><i class="ti-trash"></i></div></td></tr>`;
        }
        console.log(persons.length);
        //Fill the table with persons
        if (persons.length !== 0) {
            personsTableBody.show('fade');

            personsTableBody.html(tableBody);
            $('.remove-person').click(function (e) {
                let id = (e.currentTarget.id);
                deletePerson(id);
                console.log('clicked row: and passed delete');
            });
            loadPersons.hide('fade');
        } else {
            loadPersons.show('fade');
            personsTableBody.hide('fade');
            personsStatus.html('No Records Found!');
        }
    });
}
