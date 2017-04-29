//Module to perform CRUD  operations on Members DB
const database = require('./data/sacco');

window.onload = () => {
    //Populate the members tables
    populateTable();


    $('#addMemberForm').submit(function (e) {
        console.log('called....');
        e.preventDefault();
        let surname = $('#surname'),
            othername = $('#othername'),
            dob = $('#dob'),
            gender = $('input[name=gender]:checked', '#addMemberForm'),
            mobile = $('#mobile'),
            email = $('#email'),
            phyAddress = $('#phyAddress'),
            joined = $('#joined'),   //new Date()
            kinFirstname = $('#kinFirstname'),
            kinOthername = $('#kinOthername'),
            kinDob = $('#kinDob'),
            kinGender = $('input[name=kinGender]:checked'),
            newMember = {
                'firstname': surname.val(),
                'othername': othername.val(),
                'shortname': surname.val() + othername.val(),
                'dob': dob.val(),
                'gender': gender.val(),
                'mobile': mobile.val(),
                'email': email.val(),
                'address': phyAddress.val(),
                'joined': joined.val(),
                'next-of-kin': {
                    'firstname': kinFirstname.val(),
                    'othername': kinOthername.val(),
                    'dob': kinDob.val(),
                    'gender': kinGender.val(),
                    'mobile': mobile.val(),
                    'address': phyAddress.val()
                }
            };
        alert('Form submitting');
        console.log(newMember);

        //ToDo: Validate inputs entries

        addNewMember(newMember);

        //Reset the form fields
        surname.val('');
        othername.val('');
        dob.val('');
        gender.val('');
        mobile.val('');
        email.val('');
        phyAddress.val('');
        joined.val('');
        kinFirstname.val('');
        kinOthername.val('');
        kinDob.val('');
        kinGender.val('');
    });

    //Create Add-button click listener
    $('#addNewMember').click((e) => {
        //e.preventDefault();
        console.log('button clicked');
        //addNewMember();
    });
};

//Add a member
function addNewMember(member) {
    console.log(member);

    //ToDO: Check for duplicates before addition
    //Save member to the database
    database.addMember(member);

    //ToDO: Add alert message on success writing
    //Reset input fields on success message

    //Repopulate the table
    populateTable();

    console.log('Added:' + member);
    console.log(member);
}

//Delete a member
function deleteMember(id) {

    //Delete the member from the database
    database.deleteMember(id);

    //Repopulate the table
    populateTable();

}
//Edit a member
function editMember(id) {

    //ToDO: Edit the member with the _id value from selected table row
    //Create a form to update the inputs,

    //Edit the member in the database
    database.editMember(id);

    //Repopulate the table
    populateTable();

}

//Fill the All members table from db
function populateTable() {
    let membersTableBody = $('#membersTableBody'),
        loadMembers = $('#loadMembers'),
        membersStatus = $('#membersStatus'),
        membersCounter = $('#numMemmbers');

    //Retrieve the Members
    database.getMembers(function (members) {
        //Generate the table body
        let tableBody = '';
        for (let i = 0; i < members.length; i++) {

            tableBody = `${tableBody}<tr data-member=${members[i]._id}><td>${i + 1}</td><td>${members[i].firstname}</td><td>${members[i].othername}</td><td>${members[i].mobile}</td><td><div class="btn" role="button"><i class="ti-pencil-alt"></i></div><div id=${members[i]._id} class="btn remove-member" role="button"><i class="ti-trash"></i></div></td></tr>`;
        }

        console.log(members.length);
        if (members.length === 0) {
            membersCounter.text('There is currently no  member registered');
        } else if (members.length === 1) {
            membersCounter.text('There is only one member registered');
        } else if (members.length > 1) {
            membersCounter.text(`There are curren ${members.length} + ' members registered`);
        }

        //Fill the table with members
        if (members.length !== 0) {
            membersTableBody.show('fade');

            membersTableBody.html(tableBody);
            $('.remove-member').click(function (e) {
                let id = (e.currentTarget.id);
                deleteMember(id);
                console.log('clicked row: and passed delete');
            });
            loadMembers.hide('fade');
        } else {
            loadMembers.show('fade');
            membersTableBody.hide('fade');
            membersStatus.html('No Records Found!');
        }
    });

}
