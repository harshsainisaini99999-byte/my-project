// -------------------- Local Storage --------------------
function getData() {
  return JSON.parse(localStorage.getItem("data")) || {
    teachers: [],
    subjects: [],
    classes: [],
    timetable: [],
    lectureLimits: []
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
    table.innerHTML = "<tr><td colspan='2'>No teachers added yet</td></tr>";
    return;
  }

  let html = `<thead><tr><th>Name</th><th>Actions</th></tr></thead><tbody>`;
  data.teachers.forEach(teacher => {
    html += `<tr>
      <td>${teacher.name}</td>
      <td><button class="btn neon-btn" onclick="deleteTeacher(${teacher.id})">Delete</button></td>
    </tr>`;
  });
  html += `</tbody>`;
  table.innerHTML = html;
}

function deleteTeacher(id) {
  let data = getData();
  data.teachers = data.teachers.filter(t => t.id !== id);
  saveData(data);
  renderTeachersTable();

  if (document.getElementById("teacherCount"))
    document.getElementById("teacherCount").innerText =
      "Total Teachers: " + data.teachers.length;

  // Update teacher select options in subjects page since teachers list changed
  populateTeacherSelect();
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
    table.innerHTML = "<tr><td colspan='4'>No subjects added yet</td></tr>";
    return;
  }

  let html = `<thead><tr><th>Name</th><th>Teacher</th><th>Weekly Hours</th><th>Actions</th></tr></thead><tbody>`;
  data.subjects.forEach(subject => {
    html += `<tr>
      <td>${subject.name}</td>
      <td>${subject.teacher}</td>
      <td>${subject.hours}</td>
      <td><button class="btn neon-btn" onclick="deleteSubject(${subject.id})">Delete</button></td>
    </tr>`;
  });
  html += `</tbody>`;
  table.innerHTML = html;
}

function deleteSubject(id) {
  let data = getData();
  data.subjects = data.subjects.filter(s => s.id !== id);
  saveData(data);
  renderSubjectsTable();

  if (document.getElementById("subjectCount"))
    document.getElementById("subjectCount").innerText =
      "Total Subjects: " + data.subjects.length;
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
    table.innerHTML = "<tr><td colspan='2'>No classes added yet</td></tr>";
    return;
  }

  let html = `<thead><tr><th>Name</th><th>Actions</th></tr></thead><tbody>`;
  data.classes.forEach(cls => {
    html += `<tr>
      <td>${cls.name}</td>
      <td><button class="btn neon-btn" onclick="deleteClass(${cls.id})">Delete</button></td>
    </tr>`;
  });
  html += `</tbody>`;
  table.innerHTML = html;
}

function deleteClass(id) {
  let data = getData();
  data.classes = data.classes.filter(c => c.id !== id);
  saveData(data);
  renderClassesTable();

  if (document.getElementById("classCount"))
    document.getElementById("classCount").innerText =
      "Total Classes: " + data.classes.length;
}

function addLectureLimit() {
  let classId = document.getElementById("classSelect").value;
  let teacherId = document.getElementById("teacherSelectLimit").value;
  let limit = document.getElementById("weeklyLimit").value;

  if (!classId) return alert("Select a class");
  if (!teacherId) return alert("Select a teacher");
  if (!limit || isNaN(limit) || limit <= 0)
    return alert("Enter a valid weekly limit");

  let data = getData();

  // Check if limit already exists for the same class-teacher combo
  let exists = data.lectureLimits.find(
    (ll) => ll.classId === classId && ll.teacherId === teacherId
  );
  if (exists) return alert("Lecture limit already set for this class and teacher");

  data.lectureLimits.push({
    id: Date.now(),
    classId,
    teacherId,
    limit: Number(limit),
  });
  saveData(data);

  clearLectureLimitInputs();
  renderLectureLimitsTable();
}

function clearLectureLimitInputs() {
  document.getElementById("classSelect").selectedIndex = 0;
  document.getElementById("teacherSelectLimit").selectedIndex = 0;
  document.getElementById("weeklyLimit").value = "";
}

function renderLectureLimitsTable() {
  let data = getData();
  let table = document.getElementById("lectureLimitsTable");
  if (!table) return;

  if (data.lectureLimits.length === 0) {
    table.innerHTML =
      "<tr><td colspan='4'>No lecture limits set yet</td></tr>";
    return;
  }

  // Get class and teacher names for each limit entry
  function getClassNameById(id) {
    let cls = data.classes.find((c) => c.id.toString() === id.toString());
    return cls ? cls.name : "Unknown Class";
  }

  function getTeacherNameById(id) {
    let teacher = data.teachers.find((t) => t.id.toString() === id.toString());
    return teacher ? teacher.name : "Unknown Teacher";
  }

  let html = `<thead><tr><th>Class</th><th>Teacher</th><th>Weekly Limit</th><th>Actions</th></tr></thead><tbody>`;
  data.lectureLimits.forEach((ll) => {
    html += `<tr>
      <td>${getClassNameById(ll.classId)}</td>
      <td>${getTeacherNameById(ll.teacherId)}</td>
      <td>${ll.limit}</td>
      <td><button class="btn neon-btn" onclick="deleteLectureLimit(${ll.id})">Delete</button></td>
    </tr>`;
  });
  html += "</tbody>";
  table.innerHTML = html;
}

function deleteLectureLimit(id) {
  let data = getData();
  data.lectureLimits = data.lectureLimits.filter((ll) => ll.id !== id);
  saveData(data);
  renderLectureLimitsTable();
}

function populateClassSelect() {
  let data = getData();
  let select = document.getElementById("classSelect");
  if (!select) return;

  select.innerHTML = `<option value="">-- Select Class --</option>`;
  data.classes.forEach((cls) => {
    let option = document.createElement("option");
    option.value = cls.id;
    option.textContent = cls.name;
    select.appendChild(option);
  });
}

function populateTeacherSelectLimit() {
  let data = getData();
  let select = document.getElementById("teacherSelectLimit");
  if (!select) return;

  select.innerHTML = `<option value="">-- Select Teacher --</option>`;
  data.teachers.forEach((teacher) => {
    let option = document.createElement("option");
    option.value = teacher.id;
    option.textContent = teacher.name;
    select.appendChild(option);
  });
}

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

  // If lecture limit page elements exist, populate selects and render table
  if (document.getElementById("classSelect")) {
    populateClassSelect();
    populateTeacherSelectLimit();
    renderLectureLimitsTable();
  }

  // If lecture schedule page elements exist, render schedules table
  if (document.getElementById("lectureScheduleTable")) {
    renderLectureSchedulesTable();

    // Add event listeners for lecture start time and duration inputs to update end time dynamically
    const lectureStartInput = document.getElementById("lectureStartTime");
    const lectureDurationInput = document.getElementById("lectureDuration");
    const lectureEndInput = document.getElementById("lectureEndTime");

    function updateLectureEndTime() {
      const start = lectureStartInput.value;
      const duration = lectureDurationInput.value;

      if (!start) {
        lectureEndInput.value = "";
        return;
      }

      if (duration && !isNaN(duration) && Number(duration) > 0) {
        let [startHour, startMinute] = start.split(":").map(Number);
        let durationMinutes = Number(duration);
        let endDate = new Date();
        endDate.setHours(startHour);
        endDate.setMinutes(startMinute + durationMinutes);
        let endHourStr = String(endDate.getHours()).padStart(2, "0");
        let endMinuteStr = String(endDate.getMinutes()).padStart(2, "0");
        lectureEndInput.value = `${endHourStr}:${endMinuteStr}`;
      }
    }

    lectureStartInput.addEventListener("input", updateLectureEndTime);
    lectureDurationInput.addEventListener("input", updateLectureEndTime);
  }
});

function addLectureSchedule() {
  let day = document.getElementById("lectureDay").value;
  let lectureStart = document.getElementById("lectureStartTime").value;
  let lectureDuration = document.getElementById("lectureDuration").value;
  let lectureEndInput = document.getElementById("lectureEndTime");
  let lectureEnd = lectureEndInput.value;
  let breakStart = document.getElementById("breakStartTime").value;
  let breakEnd = document.getElementById("breakEndTime").value;
  let lunchStart = document.getElementById("lunchStartTime").value;
  let lunchEnd = document.getElementById("lunchEndTime").value;

  if (!day) return alert("Select a day");
  if (!lectureStart) return alert("Enter lecture start time");

  // If duration is specified, calculate end time based on start time + duration
  if (lectureDuration) {
    let [startHour, startMinute] = lectureStart.split(":").map(Number);
    let durationMinutes = Number(lectureDuration);
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      return alert("Enter a valid lecture duration");
    }
    let endDate = new Date();
    endDate.setHours(startHour);
    endDate.setMinutes(startMinute + durationMinutes);
    // Format back to HH:mm
    let endHourStr = String(endDate.getHours()).padStart(2, '0');
    let endMinuteStr = String(endDate.getMinutes()).padStart(2, '0');
    lectureEnd = `${endHourStr}:${endMinuteStr}`;
    // Set the calculated end time value to input field for user visibility
    lectureEndInput.value = lectureEnd;
  } else {
    if (!lectureEnd) return alert("Enter lecture end time");
  }

  if (lectureStart >= lectureEnd)
    return alert("Lecture end time must be after start time");
  if (breakStart && breakEnd && breakStart >= breakEnd)
    return alert("Break end time must be after break start time");
  if (lunchStart && lunchEnd && lunchStart >= lunchEnd)
    return alert("Lunch end time must be after lunch start time");

  let data = getData();

  // Check if schedule for the same day and overlapping time exists (optional)
  let overlap = data.lectureSchedules?.some(ls => ls.day === day && (
    (lectureStart < ls.lectureEnd && lectureEnd > ls.lectureStart)
  ));
  if (overlap) return alert("Lecture schedule overlaps with existing schedule on the same day");

  if (!data.lectureSchedules) {
    data.lectureSchedules = [];
  }

  data.lectureSchedules.push({
    id: Date.now(),
    day,
    lectureStart,
    lectureEnd,
    breakStart: breakStart || "",
    breakEnd: breakEnd || "",
    lunchStart: lunchStart || "",
    lunchEnd: lunchEnd || ""
  });

  saveData(data);

  clearLectureScheduleInputs();
  renderLectureSchedulesTable();
}

function clearLectureScheduleInputs() {
  document.getElementById("lectureDay").selectedIndex = 0;
  document.getElementById("lectureStartTime").value = "";
  document.getElementById("lectureDuration").value = "";
  document.getElementById("lectureEndTime").value = "";
  document.getElementById("breakStartTime").value = "";
  document.getElementById("breakEndTime").value = "";
  document.getElementById("lunchStartTime").value = "";
  document.getElementById("lunchEndTime").value = "";
}

function renderLectureSchedulesTable() {
  let data = getData();
  let table = document.getElementById("lectureScheduleTable");
  if (!table) return;

  if (!data.lectureSchedules || data.lectureSchedules.length === 0) {
    table.innerHTML = "<tr><td colspan='8'>No lecture schedules added yet</td></tr>";
    return;
  }

  let html = `<thead><tr><th>Day</th><th>Lecture Start</th><th>Lecture End</th><th>Break Start</th><th>Break End</th><th>Lunch Start</th><th>Lunch End</th><th>Actions</th></tr></thead><tbody>`;
  data.lectureSchedules.forEach(ls => {
    html += `<tr>
      <td>${ls.day}</td>
      <td>${ls.lectureStart}</td>
      <td>${ls.lectureEnd}</td>
      <td>${ls.breakStart || "-"}</td>
      <td>${ls.breakEnd || "-"}</td>
      <td>${ls.lunchStart || "-"}</td>
      <td>${ls.lunchEnd || "-"}</td>
      <td><button class="btn neon-btn" onclick="deleteLectureSchedule(${ls.id})">Delete</button></td>
    </tr>`;
  });
  html += "</tbody>";
  table.innerHTML = html;
}

function deleteLectureSchedule(id) {
  let data = getData();
  if (!data.lectureSchedules) return;

  data.lectureSchedules = data.lectureSchedules.filter(ls => ls.id !== id);
  saveData(data);
  renderLectureSchedulesTable();
}
