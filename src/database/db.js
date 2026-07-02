import Dexie from "dexie";

export const db = new Dexie("TechTendance");

db.version(1).stores({
    attendance:
        "++id,studentId,sessionId,time,synced"
});