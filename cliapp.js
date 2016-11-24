#!/usr/bin/env node

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>> '
})

function Person(name,role,wantsaccomodation){
  this.name = name;
  this.role = role;
  this.wantsaccomodation = wantsaccomodation;
}
function Fellow(){

};
function Staff(){

}
function Amity(){

};
function Room(name){
 this.name = name; 
};
function Office(){

};
function LivingSpace(){};
//var createroom = function(name){ // i want to collect the name and 
  //  name = 
//};
var roomsList = []
var roomObject =[]
var personList = []
var personObject =[]
personObject[0].wantsaccomodation = false;

rl.prompt()

rl.on('line', function(line) {
  var args = line.split(' ')
  switch(args[0]) {
    // create_room <room_name>
    case 'create_room':
      for (i = 1 ; i < 11 ;i++){
       roomobject[i] = new Room(args[i]);
        roomsList.push(roomobject[i].name);
        if (roomobject[i].name!= null){
        console.log(`Room "${roomobject[i].name}" has been added!`)// thr strange quotation marks are used to signify text. The double quotation mark is to denote presence of a parsed string.
      }
    };    
      break
    // list_rooms
    case 'list_rooms':
      console.log('Printing out all rooms')
      roomsList.forEach(function(room, idx) {//Seems each list object has a for each property.
        console.log(`${idx} - ${room}`)
      })
      break
    //add_person
    case 'add_person':
   // if (args[3] == null){
      personObject.push(new Person(args[1],args[2],args[3]));
      console.log(personObject[0].wantsaccomodation)
    //}
    
      
      ;//jj b
     //personList.push(args[2]);
     //console.log(`The person "${args[1]}" has been added`); //   personObject[1].push(new Person(args[1],args[2]))
    break
    default:
      console.log('You must enter a valid command')
  }
  rl.prompt()
})
.on('close', function() {
  console.log('Thank you for using Room Allocator')
})