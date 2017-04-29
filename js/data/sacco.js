//Initialize the database
let Datastore = require('nedb');

/**
 * Database to Persist Members and Shareholders
 */
members = new Datastore({
    filename: './db/members.db',
    autoload: true,
    timestampData: true,
    afterSerialization: '',
    beforeDeserialization: ''
});

/**
 * Add a Member to the SACCO
 * */
exports.addMember = function (newMember) {
    console.log('In members: .addMember ' + newMember);
    console.log(newMember);

    /*Create an Object for a member*/
    let member = {
        'firstname': newMember.firstname,
        'othername': newMember.othername,
        'shortname': newMember.othername,
        'dob': newMember.dob,  //new Date()
        'gender': newMember.gender,
        'mobile': newMember.mobile,
        'email': newMember.email,
        'address': newMember.address,
        'joined': newMember.joined,   //new Date()
        'next-of-kin': {
            'firstname': newMember['next-of-kin'].firstname,
            'othername': newMember['next-of-kin'].othername,
            'dob': newMember['next-of-kin'].dob,  //new Date()
            'gender': newMember['next-of-kin'].kinGender,
            'mobile': newMember['next-of-kin'].mobile,
            'address': newMember['next-of-kin'].address
        }
    };

    //Write the Member to the DB
    members.insert(member, (err, newDoc) => {
        //...give user feedback here
        console.log(err);
        console.log(newDoc);
    });
};

/**
 * Delete a Member from the SACCO
 * */
exports.deleteMember = (id) => {
    console.log('In members: .deleteMember ' + id);

    //Remove the db entry by id
    members.remove({_id: id}, {}, (err, numDeleted) => {
        //...Feedback on successful deletion or error reply
        console.log(numDeleted);
    });
};

/**
 * Fetch All Members from the SACCO
 * */
exports.getMembers = (fnc) => {
    console.log('In members: .getMembers');
    //console.log(fnc);

    //Get all members from the SACCO
    members.find({}, (err, docs) => {
        //...Work on the returned docs before display to the user
        //console.log(docs);
        //Execute the parameter function
        console.log(docs);
        fnc(docs);
    });
};

/**
 * Edit a Member in the SACCO
 * */
exports.editMember = (id) => {

    //ToDo: Update the db entry by id

    members.update({_id: id}, {}, (err, numUpdated) => {
        //...Feedback on successful update or error reply
    });
};