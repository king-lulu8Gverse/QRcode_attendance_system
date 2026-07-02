export const exportCSV = (session) => {
  const headers = [
    "S/N",
    "Name",
    "Matric Number",
    "Department",
    "Faculty",
  ];

  const rows = session.attendees.map((att, index) => {
    const student = att.student || att;

    return [
      index + 1,
      student.name || "",
      student.matric_number || "",
      student.department || "",
      student.faculty || "",
    ];
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  const fileName =
    `${session.course.code || session.course.course_code}_${new Date(session.date)
      .toISOString()
      .split("T")[0]}_Attendance.csv`;

  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};