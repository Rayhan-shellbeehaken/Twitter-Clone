const Months = [ 
    {name : "", date : 31},
    {name : "January", date : 31},
    {name : "February", date : 28},
    {name : "March", date : 31},
    {name : "April", date : 30},
    {name : "May", date : 31},
    {name : "June", date : 30},
    {name : "July", date : 31},
    {name : "August", date : 31},
    {name : "September", date : 30},
    {name : "October", date : 31},
    {name : "November", date : 30},
    {name : "December", date : 31},
];

const Days = [""];
const Years = [""];

for(let i=1; i<=31 ; i++){
    Days.push(i);
}

for(let i=25; i>=0; i--){
    Years.push(i+2000);
}

export default function daysDeclaration(monthName, year){
    const month = Months.find((month) => month.name === monthName);
    const daysInMonth = month.date;
    Days.length = 0;
    Days.push("");

    for(let i=1;i<=daysInMonth;i++){
        Days.push(i);
    }

    let leapYear;
    (year !=='' && (year-2000)%4 === 0) ? leapYear = true : leapYear = false;
    if(leapYear && monthName === "February") Days.push(29);
}

export {Days, Months, Years};