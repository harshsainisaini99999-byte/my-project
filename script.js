// -------------------- Local Storage --------------------
function getData() {
  return JSON.parse(localStorage.getItem("data")) || {
    teachers: [],
    subjects: [],
    classes: [],
    timetable: []
  };
}

function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

// -------------------- Teachers --------------------
function addTeacher() {
  let name = document.getElementById("tName").value.trim();
  if (!name) return alert("Enter teacher name");

  let data = getData();
  data.teachers.push({ id: Date.now(), name });
  saveData(data);

  clearTeacherInput();
  renderTeachersTable();

  if (document.getElementById("teacherCount"))
    document.getElementById("teacherCount").innerText =
      "Total Teachers: " + data.teachers.length;
}

function clearTeacherInput() {
  document.getElementById("tName").value = "";
}

function renderTeachersTable() {
  let data = getData();
  let table = document.getElementById("teachersTable");
  if (!table) return;

  if (data.teachers.length === 0) {
    table.innerHTML = "<tr><td colspan='1'>No teachers added yet</td></tr>";
    return;
  }

  let html = `<thead><tr><th>Name</th></tr></thead><tbody>`;
  data.teachers.forEach(teacher => {
    html += `<tr><td>${teacher.name}</td></tr>`;
  });
  html += `</tbody>`;
  table.innerHTML = html;
}

// -------------------- Subjects --------------------
function addSubject() {
  let name = document.getElementById("sName").value.trim();
  let teacher = document.getElementById("teacherSelect").value;
  let hours = document.getElementById("weeklyHours").value;

  if (!name) return alert("Enter subject name");
  if (!teacher) return alert("Select a teacher");
  if (!hours || isNaN(hours) || hours <= 0)
    return alert("Enter valid weekly hours");

  let data = getData();
  data.subjects.push({
    id: Date.now(),
    name,
    teacher,
    hours: Number(hours)
  });
  saveData(data);

  clearSubjectInputs();
  renderSubjectsTable();

  if (document.getElementById("subjectCount"))
    document.getElementById("subjectCount").innerText =
      "Total Subjects: " + data.subjects.length;
}

function clearSubjectInputs() {
  document.getElementById("sName").value = "";
  document.getElementById("weeklyHours").value = "";
  document.getElementById("teacherSelect").selectedIndex = 0;
}

function renderSubjectsTable() {
  let data = getData();
  let table = document.getElementById("subjectsTable");
  if (!table) return;

  if (data.subjects.length === 0) {
    table.innerHTML = "<tr><td colspan='3'>No subjects added yet</td></tr>";
    return;
  }

  let html = `<thead><tr><th>Name</th><th>Teacher</th><th>Weekly Hours</th></tr></thead><tbody>`;
  data.subjects.forEach(subject => {
    html += `<tr><td>${subject.name}</td><td>${subject.teacher}</td><td>${subject.hours}</td></tr>`;
  });
  html += `</tbody>`;
  table.innerHTML = html;
}

function populateTeacherSelect() {
  let data = getData();
  let select = document.getElementById("teacherSelect");
  if (!select) return;

  select.innerHTML = `<option value="">-- Select Teacher --</option>`;
  data.teachers.forEach(teacher => {
    let option = document.createElement("option");
    option.value = teacher.name;
    option.textContent = teacher.name;
    select.appendChild(option);
  });
}

// -------------------- Classes --------------------
function addClass() {
  let name = document.getElementById("className").value.trim();
  if (!name) return alert("Enter class name");

  let data = getData();
  data.classes.push({ id: Date.now(), name });
  saveData(data);

  clearClassInput();
  renderClassesTable();

  if (document.getElementById("classCount"))
    document.getElementById("classCount").innerText =
      "Total Classes: " + data.classes.length;
}

function clearClassInput() {
  document.getElementById("className").value = "";
}

function renderClassesTable() {
  let data = getData();
  let table = document.getElementById("classesTable");
  if (!table) return;

  if (data.classes.length === 0) {
    table.innerHTML = "<tr><td colspan='1'>No classes added yet</td></tr>";
    return;
  }

  let html = `<thead><tr><th>Name</th></tr></thead><tbody>`;
  data.classes.forEach(cls => {
    html += `<tr><td>${cls.name}</td></tr>`;
  });
  html += `</tbody>`;
  table.innerHTML = html;
}

// -------------------- Populate Dashboard --------------------
document.addEventListener("DOMContentLoaded", () => {
  let data = getData();

  // Dashboard counts
  if (document.getElementById("teacherCount"))
    document.getElementById("teacherCount").innerText =
      "Total Teachers: " + data.teachers.length;

  if (document.getElementById("subjectCount"))
    document.getElementById("subjectCount").innerText =
      "Total Subjects: " + data.subjects.length;

  if (document.getElementById("classCount"))
    document.getElementById("classCount").innerText =
      "Total Classes: " + data.classes.length;

  // Render tables and populate selects if applicable
  renderTeachersTable();
  renderSubjectsTable();
  renderClassesTable();
  populateTeacherSelect();
});
