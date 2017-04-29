//Initialize the database
let Datastore = require('nedb');
db = new Datastore({
    filename: './db/persons.db',
    autoload: true,
    timestampData: true,
});

//Add person to the db
exports.addPerson = function (firstname, lastname) {

    //Create Person object
    let person = {
        "firstname": firstname,
        "lastname": lastname,
    };

    //Save the person to the db
    db.insert(person, (err, newDoc) => {
        //...give user feedback here
        //console.log(err);
        //console.log(newDoc);
    });
};

//Fetch All persons from the db
exports.getPersons = (fnc) => {

    //Get all persons from the db
    db.find({}, (err, docs) => {
        //...Work on the returned docs before display to the user
        //console.log(docs);
        //Execute the parameter function
        fnc(docs);
    });
};

//Delete a person from the db
exports.deletePerson = (id) => {
    console.log('In db.deletePerson ' + id);

    //Remove the db entry by id
    db.remove({_id: id}, {}, (err, numDeleted) => {
        //...Feedback on successful deletion or error reply
        console.log(numDeleted);
    });
};

//Edit a person in the db
exports.editPerson = (id) => {

    //ToDo: Update the db entry by id

    db.update({_id: id}, {}, (err, numUpdated) => {
        //...Feedback on successful update or error reply
    });
};
