/*
Module Testing done by: Manish Jaunky
*/
/*
var events = [
  {'Date': new Date(2018, 9, 22), 'Title': 'First Iteration due.(CSCI 3428)'},
];*/
var events = new Array();

function getReminders() {
    var reminderSet = localStorage.getItem("reminderSet");

    if (reminderSet !== null) {

        reminderSet = JSON.parse(reminderSet);

        if (reminderSet.length !== 0) {

            for(var i = 0; i < reminderSet.length; i++) {

                var d = new Date(reminderSet[i].date.valueOf());
                var day = d.getDate();
                var month = d.getMonth();
                var year = d.getFullYear();
                var task = reminderSet[i].task;
                var hour = d.getHours();
                var minute = d.getMinutes();
                var time = hour + ":" + minute;

                var event = {'Date': new Date(year, month, day), 'Title': task + " @ " + time};
                events.push(event);

            }

        }

    }
}
var settings = {
	Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventClick: '',
    EventTargetWholeDay: false,
    DisabledDays: [],
};
var element = document.getElementById('calendar');
getReminders();
caleandar(element, events, settings);