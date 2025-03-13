import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patientName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    BloodGroup: {
      type: String,
    },
    ECG: {
      type: String,
    },
  },
  { timestamps: true }
);

export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);
