/* Your Code Here */
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecord) {
    return employeeRecord.map(function(row){
        return createEmployeeRecord(row)
    })
}

function createTimeInEvent(card){
    let [date, hour] = card.split(" ")

    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(hour, 10),
        date
    })
    return this
}

function createTimeOutEvent(card){
    let [date, hour] = card.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return this
}

function hoursWorkedOnDate(dateEntered){
    let signIn = this.timeInEvents.find(function(e){
        return e.date === dateEntered
    })
    let signOut = this.timeOutEvents.find(function(e){
        return e.date === dateEntered
    })
    return (signOut.hour - signIn.hour) / 100
}

function wagesEarnedOnDate(dateEntered){
    let wage = hoursWorkedOnDate.call(this, dateEntered)
    * this.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(rec){
        return rec.firstName === firstName
    })
}

function calculatePayroll(arrayOfEmployeeRecs){
    return arrayOfEmployeeRecs.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}
