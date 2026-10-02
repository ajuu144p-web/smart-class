<html>
        <head><title>Downloaded HTML</title></head>
        <body>
            <pre style="white-space: pre-wrap; word-wrap: break-word;">// ========================================
// 65 STUDENTS
// ========================================

let students = [];

for (let i = 1; i <= 65; i++) {

    students.push({
        number: i,
        id: "STU" + String(i).padStart(3, "0"),
        present: false,
        time: ""
    });

}


// ========================================
// LOAD SAVED ATTENDANCE
// ========================================

let saved = localStorage.getItem("attendanceData");

if (saved) {
    students = JSON.parse(saved);
}


// ========================================
// SAVE DATA
// ========================================

function saveData() {

    localStorage.setItem(
        "attendanceData",
        JSON.stringify(students)
    );

}


// ========================================
// MARK STUDENT PRESENT
// ========================================

function markStudent(studentId) {

    studentId = studentId.trim().toUpperCase();

    let student = students.find(
        s => s.id === studentId
    );

    if (!student) {

        showMessage(
            "scanMessage",
            "❌ Student not found: " + studentId,
            "red"
        );

        return;
    }


    if (student.present) {

        showMessage(
            "scanMessage",
            "⚠️ Attendance already marked!",
            "orange"
        );

        return;
    }


    let now = new Date();

    student.present = true;

    student.time = now.toLocaleTimeString();


    saveData();

    updateDisplay();


    showMessage(
        "scanMessage",
        "✅ " + student.id +
        " marked PRESENT!",
        "green"
    );
}


// ========================================
// QR CODE SCANNER
// ========================================

function qrSuccess(decodedText) {

    // QR code should contain:
    // STU001
    // STU002
    // ...
    // STU065

    markStudent(decodedText);

}


// ========================================
// START QR SCANNER
// ========================================

let scanner = new Html5QrcodeScanner(
    "reader",
    {
        fps: 10,

        qrbox: {
            width: 250,
            height: 250
        }
    },
    false
);

scanner.render(qrSuccess);


// ========================================
// TEACHER MANUAL ATTENDANCE
// ========================================

function teacherMark() {

    let number =
        document.getElementById(
            "teacherStudent"
        ).value;


    if (
        number === "" ||
        number < 1 ||
        number > 65
    ) {

        showMessage(
            "teacherMessage",
            "❌ Enter a number from 1 to 65.",
            "red"
        );

        return;
    }


    let student = students[number - 1];


    if (student.present) {

        showMessage(
            "teacherMessage",
            "⚠️ Attendance already marked.",
            "orange"
        );

        return;
    }


    let now = new Date();

    student.present = true;

    student.time = now.toLocaleTimeString();


    saveData();

    updateDisplay();


    showMessage(
        "teacherMessage",
        "✅ " + student.id +
        " marked PRESENT.",
        "green"
    );


    document.getElementById(
        "teacherStudent"
    ).value = "";
}


// ========================================
// UPDATE STUDENT TABLE
// ========================================

function updateDisplay() {

    let table =
        document.getElementById(
            "studentTable"
        );

    table.innerHTML = "";


    students.forEach(student => {

        let row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.number}</td>

            <td>${student.id}</td>

            <td>
                ${
                    student.present

                    ?

                    '<span class="presentBadge">PRESENT</span>'

                    :

                    '<span class="absentBadge">ABSENT</span>'
                }
            </td>

            <td>
                ${student.time || "-"}
            </td>

        `;


        table.appendChild(row);

    });


    // Count present students

    let present =
        students.filter(
            s => s.present
        ).length;


    // Count absent students

    let absent =
        students.length - present;


    document.getElementById(
        "present"
    ).textContent = present;


    document.getElementById(
        "absent"
    ).textContent = absent;

}


// ========================================
// RESET ATTENDANCE
// ========================================

function resetAttendance() {

    let confirmReset =
        confirm(
            "Are you sure you want to reset today's attendance?"
        );


    if (!confirmReset) {
        return;
    }


    students.forEach(student => {

        student.present = false;

        student.time = "";

    });


    saveData();

    updateDisplay();


    showMessage(
        "teacherMessage",
        "🔄 Attendance has been reset.",
        "green"
    );
}


// ========================================
// SHOW MESSAGE
// ========================================

function showMessage(
    element,
    text,
    color
) {

    let box =
        document.getElementById(element);


    box.textContent = text;

    box.style.color = color;

    box.className = "message";

}


// ========================================
// START DISPLAY
// ========================================

updateDisplay();</pre>
        </body>
    </html>