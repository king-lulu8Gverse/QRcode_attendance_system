import Dexie from "dexie";

export const db = new Dexie("TechTendanceDB");

db.version(1).stores({
  attendance: "++id,studentId,sessionToken,time,synced",
});