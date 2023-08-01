var startdate = new Date("2023-08-02");
var enddate = new Date("2023-08-05");

if (startdate < enddate) {
  var totalDays = (enddate - startdate) / (1000 * 60 * 60 * 24);
  console.log("Total days between startdate and enddate:", totalDays);
} else {
  console.log("Startdate is after or equal to enddate.");
}
