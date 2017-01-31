#!/usr/bin/env node

//var fs = require('fs'); // The File system module is used in NodeJS  to provide Input and output functionality. 

const readline = require('readline') //

const rl = readline.createInterface({ // I want to inteprete this. 
  input: process.stdin,
  output: process.stdout,
  prompt: '>>'
})

function Person(name, role, wantsaccomodation, room) { // Class person with arguements name, role, accommodation and room. 
  this.name = name; //A property of the class Personss
  this.role = role; //A property of the class role. 
  this.wantsaccomodation = wantsaccomodation;
  this.room = room;
  this.allocate = function() {
    this.room = roomsList[Math.floor((Math.random() * roomsList.length))];

  };
  this.allocateOffice = function() {
    var n = Math.floor((Math.random() * officearray.length));
    if (officearray[n].residentnumber < 6) { // i have to connect this part to the resident part
      this.room = officearray[n].name;
      officearray[n].resident.push(this.name) // addition
      officearray[n].residentnumber = officearray[n].residentnumber + 1


    } else {
      console.log("You have exceeded the room limit");
    }
  }
  this.allocateLivingSpace = function() {
    var n = Math.floor((Math.random() * livingspacearray.length));
    if (livingspacearray[n].residentnumber < 4) { // i have to connect this part to the resident part
      this.room = livingspacearray[n].name;
      livingspacearray[n].resident.push(this.name);
      livingspacearray[n].residentnumber = livingspacearray[n].residentnumber + 1;
    } else {
      console.log("You have exceeded the room limit");
    }
  }
}

var reallocate = function(name, room) {

  for (i = 0; i < officearray.length; i++) {
    if (room == officearray[i].name) {
      officearray[i].resident.push(name);
      officearray[i].residentnumber = officearray[i].residentnumber + 1
      console.log(officearray[i].resident);
    }
  }
  for (i = 0; i < livingspacearray.length; i++) {
    if (room == livingspacearray[i].name) {
      livingspacearray[i].resident.push(name);
      livingspacearray[i].residentnumber = livingspacearray[i].residentnumber + 1;
      console.log(livingspacearray[i].resident);
    }
  }
};



function Room(name, resident) {
  this.name = name;
  this.resident = resident;

};

function Office(name) { //a second arguement would be pushed into the resident array
  this.name = name;
  this.type = Office;
  this.resident = [];
  this.residentnumber = 0;

};

function LivingSpace(name) {
  this.name = name;
  this.type = Office;
  this.resident = [];
  this.residentnumber = 0;
};

var roomsList = [];
var officeroomsList = [];
var roomObject = [];
var personList = [];
var param = [];
var sparam = [];
var officearray = [];
var livingspacearray = [];
var lee = [];
var leen = [];


rl.prompt() // resets it 

rl.on('line', function(line) {
    var args = line.split(' ')
    switch (args[0]) {

      // create_room <room_name>
      case 'create_room':

        var i = 1;
        while (i < 11) {
          //Created a Room object for each room. The name of the room is the object.
          var n = Math.floor(Math.random() * 2);
          if (n == 1) {
            args[i] = new Office(args[i]);
            // officeroomsList.push(args[i].name)
            officearray.push(args[i]); //Creating a new room object for each 
            console.log(`Room "${args[i].name}" is an Office!`)

          } else {
            args[i] = new LivingSpace(args[i]);
            livingspacearray.push(args[i]);
            console.log(`Room "${args[i].name}" is a LivingSpace!`)
          }
          // roomsList.push(args[i].name);
          i++
        };

        sparam.push(officearray);
        sparam.push(livingspacearray);
        console.log(sparam);
        break

        // list_rooms
      case 'list_rooms':
        if (args[1] == "Office") {
          officearray.forEach(function(room, idx) {
            console.log(`${idx} - ${room.name}`)
          })
        } else if (args[1] == "LivingSpace") {
          livingspacearray.forEach(function(room, idx) {
            console.log(`${idx} - ${room.name}`)
          })
        }
        console.log('Printing out all rooms')
        break

        //add_person
      case 'add_person':

        if (args[1] != null && args[2] != null && args[3] != null) {

          //Staff



          switch (args[3]) {
            case 'Y':

              room = "Default";
              var personObject = new Person(args[1], args[2], args[3], room);
              personList.push(personObject)

              if (args[2] === "Staff") {
                personObject.allocateOffice();
                console.log(personObject.room);
                console.log(officearray.length);
                console.log(officearray);
              }

              if (args[2] === "Fellow") {
                rl.question('Are you interested in a LivingSpace or Office? ', (answer) => {

                  console.log(`We would allocate you : ${answer}`);
                  if (answer === "Office") {
                    console.log('Office man')
                    personObject.allocateOffice();
                    console.log(personObject.room);
                    console.log(officearray.length);
                    console.log(officearray);
                  }
                  if (answer === "Livingspace") {
                    console.log('Livingspace owner')
                    personObject.allocateLivingSpace();
                    console.log(personObject.room);
                    console.log(livingspacearray.length);
                    console.log(livingspacearray);
                  }
                })
              }
              console.log(officearray)
              console.log(livingspacearray)

              break;
            case 'N':
              console.log(" You have selected No therefore you are not going to be allocated any room. Goodluck");
              break;
            default:
              console.log('You must enter a valid command');
              break
          }
        };

        if (args[1] == null || args[2] == null && args[3] == null) {
          console.log("Kindly follow the input format : <person_identifier> <new_room_name> [wants accomodation[Y or N]]");
        };

        if (args[1] != null && args[2] != null && args[3] == null) {
          console.log("You have automatically selected N, Kindly input Y if you want to be allocated an accomodation");
        };

        break
      case 'reallocate_person':

        for (i = 0; i < officearray.length; i++) {
          if (args[1] == officearray[i].resident) {
            officearray[i].resident =[];
            officearray[i].residentnumber= officearray[i].residentnumber - 1;
            console.log(officearray[i].resident);
          }
        }
        for (i = 0; i < livingspacearray.length; i++) {
          if (args[2] == livingspacearray[i].resident) {
            livingspacearray[i].resident=[];
            livingspacearray[i].residentnumber= livingspacearray[i].residentnumber - 1;
            console.log(livingspacearray[i].resident);
          }
        }

        reallocate(args[1], args[2]);
        console.log();
        break
      case 'load_people':
        var content = fs.readFileSync('sample.txt', 'utf8');
        var contentlines = content.split("\n");

        for (i = 0; i < 10; i++) {


          param = contentlines[i].split(" ");
          //param [i] = sparam.split(" ");
          console.log(param)

          if (param[0] != null && param[1] != null && param[2] != null) {

            switch (param[2]) {
              case 'Y':

                room = "Default";
                var personObject = new Person(param[0], param[1], param[2], room);
                personList.push(personObject)
                if (param[1] === "Staff") {
                  personObject.allocateOffice();

                  console.log(personObject.room);
                  console.log(officearray.length);

                }


                if (param[1] === "Fellow") {
                  var r = Math.floor(Math.random() * 2);
                  if (r == 1) {
                    personObject.allocateOffice();
                    console.log(personObject.room);
                    console.log(officearray.length);
                  } else {
                    personObject.allocateLivingSpace();
                    console.log(personObject.room);
                    console.log(livingspacearray.length);
                  }

                }

            }
          }
        }

        break
      case 'print_allocations':

        var pit = []
        pit.push(JSON.stringify(officearray));
        pit.push(JSON.stringify(livingspacearray));
        require('fs').writeFile(

          './allocations',

          pit,

          function(err) {
            if (err) {
              console.error('Crap happens');
            }
          }
        );

        break
      case 'print_unallocated':

        var unallocated = []
        for (i = 0; i < officearray.length; i++) {
          if (officearray[i].residentnumber == 0) {
            unallocated.push(officearray[i].name)
          }
        }
        for (i = 0; i < livingspacearray.length; i++) {
          if (livingspacearray[i].residentnumber == 0) {
            unallocated.push(livingspacearray[i].name)
          }
        }
        require('fs').writeFile(

          './unallocations',

          unallocated,

          function(err) {
            if (err) {
              console.error('Crap happens');
            }
          }
        );
        break
      case 'print_room':

        for (i = 0; i < officearray.length; i++) {
          if (officearray[i].name == args[1]) {
            console.log(officearray[i].resident)
          }
        }
        for (i = 0; i < livingspacearray.length; i++) {
          if (livingspacearray[i].name == args[1]) {
            console.log(livingspacearray[i].resident)
          }
        }
        break
      case 'save_state':
        var sqlite3 = require('sqlite3').verbose();
        var db = new sqlite3.Database(args[1]);

        db.serialize(function() {
          db.run("CREATE TABLE Operson (id TEXT, dt TEXT)");
          db.run("CREATE TABLE Lperson (id TEXT, dt TEXT)");
          var stmt = db.prepare("INSERT INTO    Operson VALUES (?,?)");
          var liv = db.prepare("INSERT INTO Lperson VALUES (?,?)");
          for (var i = 0; i < officearray.length; i++) {

            var d = officearray[i].name
            var r = officearray[i].resident
            stmt.run(d, r);
          }
          stmt.finalize();
          for (var i = 0; i < livingspacearray.length; i++) {

            var d = livingspacearray[i].name
            var r = livingspacearray[i].resident
            liv.run(d, r);
          }
          liv.finalize();
          db.each("SELECT id, dt FROM Operson", function(err, row) {
            console.log("Operson id : " + row.id, row.dt);
          });
          db.each("SELECT id, dt FROM Lperson", function(err, row) {
            console.log("Lperson id : " + row.id, row.dt);
          });
        });

        db.close();
        break
      case 'load_state':
        var sqlite3 = require('sqlite3').verbose();
        var file = args[1];
        var db = new sqlite3.Database(file);
        db.all("SELECT id,dt FROM Operson", function(err, rows) {
          rows.forEach(function(row) {
            console.log(row.id, row.dt);
            row.id = new Office(row.id);
            officearray.push(row.id);
          })

        });


        db.all("SELECT id,dt FROM Lperson", function(err, rows) {
          rows.forEach(function(row) {
            console.log(row.id, row.dt);
            row.id = new LivingSpace(row.id);
            livingspacearray.push(row.id);
          })

        });
        db.close();
        break
      default:
        console.log('You must enter a valid command')
    }

    rl.prompt()
  })
  .on('close', function() {
    console.log('Thank you for using Room Allocator')
  });
