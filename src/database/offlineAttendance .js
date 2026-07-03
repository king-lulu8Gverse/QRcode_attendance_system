import { db } from "./db";

export const saveOfflineAttendance = async (sessionToken) => {
  await db.attendance.add({
    sessionToken,
    time: new Date().toISOString(),
    synced: false,
  });
};
