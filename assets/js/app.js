
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDa97DZsyvisC5eecVa4OnbI4QO2VTzcU8",
    authDomain: "train-schedule-41e36.firebaseapp.com",
    databaseURL: "https://train-schedule-41e36.firebaseio.com",
    projectId: "train-schedule-41e36",
    storageBucket: "",
    messagingSenderId: "32453864929",
    appId: "1:32453864929:web:be87f07b293b0e58"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

   // Reference the database.
   var dataRef = firebase.database();

  var trainName;
  var destStop;
  var firstTrain;
  var frequency = 0;

  /*function currentTime() {
    var current = moment().format('LT');
    $("#currentTime").html(current);
    setTimeout(currentTime, 1000);
  }*/
  
  


 $("#submit").on("click", function(event){
    event.preventDefault();

    trainName = $("#train-name").val().trim();
   destStop = $("#dest-stop").val().trim();
     firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();
    var x = `
    <tr>
      <td>${trainName}</td>
      <td>${destStop}</td>
      <td>${firstTrain}</td>
      <td>${frequency}</td>
    </tr>
    `
    $("tbody").append(x);
  
 
  //============================================================
     // Code for the push
       dataRef.ref().push({

trainName: trainName,
destStop: destStop,
firstTrain: firstTrain,
frequency: frequency,
dateAdded: firebase.database.ServerValue.TIMESTAMP
       });
$("form")[0].reset();
      });


dataRef.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destStop);
        console.log(childSnapshot.val().firstTrain);
        console.log(childSnapshot.val().frequency);
        

var minsAway;

//Change year so first train comes before now
//var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
var firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
console.log(firstTrainNew);
//current time
//function currentTime() {
  //var current = moment().format('LT');
  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("hh:mm a"));
  $("#current-time").text(moment(currentTime).format("hh:mm a"));
  setTimeout(currentTime, 1000);

//Create difference between current and firstTrain
var diffTime = moment().diff(moment(firstTrainNew), "minutes");
var timeRemain = diffTime % childSnapshot.val().frequency;
//Minutes until next train
var minsAway = childSnapshot.val().frequency - timeRemain;
//Next train time
var nextTrain = moment().add(minsAway, "minutes");
nextTrain = moment(nextTrain).format("hh:mm");



 // full list of items to the well
 $("#add-row").append("<tr><td>" + childSnapshot.val().trainName +
 " </td><td> " + childSnapshot.val().destStop +
 " </td><td> " + nextTrain +
 " </td><td> " + minsAway +
 " </td></tr>");

// Handle the errors
}, function(errorObject) {
console.log("Errors handled: " + errorObject.code);
});

//database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // Change the HTML to reflect (FIX THIS)
  //$("#train-name").html(snapshot.val().trainName);
  //$("#dest-stop").html(snapshot.val().destStop);
  //$("#first-train").html(snapshot.val().firstTrain);
  //$("#frequency").html(snapshot.val().frequency);
//});

