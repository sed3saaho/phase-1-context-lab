/* Your Code Here */

const createEmployeeRecord = (row) => {
    return {
      firstName: row[0],
      familyName: row[1],
      title: row[2],
      payPerHour: row[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  const createEmployeeRecords = (employeeRowData) => {
    return employeeRowData.map((row) => createEmployeeRecord(row));
  }
  
  const createTimeInEvent = (employee, dateStamp) => {
    const [date, hour] = dateStamp.split(' ');
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
  
    return employee;
  }
  
  const createTimeOutEvent = (employee, dateStamp) => {
    const [date, hour] = dateStamp.split(' ');
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
  
    return employee;
  }
  
  const hoursWorkedOnDate = (employee, soughtDate) => {
    const inEvent = employee.timeInEvents.find((e) => e.date === soughtDate);
    const outEvent = employee.timeOutEvents.find((e) => e.date === soughtDate);
  
    return (outEvent.hour - inEvent.hour) / 100;
  }
  
  const wagesEarnedOnDate = (employee, dateSought) => {
    const rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
    return parseFloat(rawWage.toString());
  }
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function (employee) {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
  
  
  const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find((rec) => rec.firstName === firstName);
  }
  
  const calculatePayroll = (arrayOfEmployeeRecords) => {
    return arrayOfEmployeeRecords.reduce((memo, rec) => memo + allWagesFor(rec), 0);
  }