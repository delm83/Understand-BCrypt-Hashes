'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';
const bcrypt = require('bcrypt')


//START_ASYNC -do not remove notes, place code between correct pair of notes.

/*As hashing is designed to be computationally intensive, it is recommended to do so asynchronously on your server as to avoid blocking incoming connections while you hash. All you have to do to hash a password asynchronous is call
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  //Store hash in your db
});
Add this hashing function to your server (we've already defined the variables used in the function for you to use) and log it to the console for you to see! At this point you would normally save the hash to your database.
Now when you need to figure out if a new input is the same data as the hash you would just use the compare function.
bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
  //res == true or false
});
Add this into your existing hash function (since you need to wait for the hash to complete before calling the compare function) after you log the completed hash and log 'res' to the console within the compare. You should see in the console a hash, and then 'true' is printed! If you change 'myPlaintextPassword' in the compare function to 'someOtherPlaintextPassword', then it should say false.*/
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    console.log(hash);
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
        console.log(res); //true
      });
  });
//END_ASYNC

//START_SYNC
/*Hashing synchronously is just as easy to do but can cause lag if using it server side with a high cost or with hashing done very often. Hashing with this method is as easy as calling
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
Add this method of hashing to your code and then log the result to the console. Again, the variables used are already defined in the server so you won't need to adjust them. You may notice even though you are hashing the same password as in the async function, the result in the console is different- this is due to the salt being randomly generated each time as seen by the first 22 characters in the third string of the hash. Now to compare a password input with the new sync hash, you would use the compareSync method:
var result = bcrypt.compareSync(myPlaintextPassword, hash);
with the result being a boolean true or false.*/
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);
var result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result)
//END_SYNC





























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
