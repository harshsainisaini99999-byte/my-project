function generateTimetable() {
  let db = JSON.parse(localStorage.getItem("data"));

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const periods = 6;

  let timetable = {};

  db.classes.forEach(cls => {
    timetable[cls.name] = [];

    days.forEach(day => {
      let row = [];
      for (let p = 0; p < periods; p++) {
        let subject =
          db.subjects[Math.floor(Math.random() * db.subjects.length)];

        row.push(subject.name + " (" + subject.teacher + ")");
      }
      timetable[cls.name].push({ day, periods: row });
    });
  });

  db.timetable = timetable;
  localStorage.setItem("data", JSON.stringify(db));

  renderTimetable(timetable);
}

function renderTimetable(data) {
  let output = "";

  for (let cls in data) {
    output += `<h2>${cls}</h2>`;
    output += `<table><tr><th>Day</th><th>Periods</th></tr>`;

    data[cls].forEach(row => {
      output += `<tr><td>${row.day}</td><td>${row.periods.join(" | ")}</td></tr>`;
    });

    output += `</table><br>`;
  }

  document.getElementById("timetableTable").innerHTML = output;
}
