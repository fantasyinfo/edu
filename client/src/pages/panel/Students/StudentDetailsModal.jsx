import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const StudentDetailsModal = ({ open, onClose, student }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Student Details</DialogTitle>
      <DialogContent>
        <div className="flex flex-col items-center mb-4">
          <div className="flex justify-between w-full mb-4">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                <span className="text-gray-400">Image</span>
              </div>
              <span className="text-gray-500">Image</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                <span className="text-gray-400">Signature</span>
              </div>
              <span className="text-gray-500">Signature</span>
            </div>
          </div>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="p-2 font-semibold">Student Id</td>
                <td className="p-2">: {student.id}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Name</td>
                <td className="p-2">: {student.name}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">User Name</td>
                <td className="p-2">: {student.username}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Email</td>
                <td className="p-2">: {student.email}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Student Phone</td>
                <td className="p-2">: {student.phone}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Gender</td>
                <td className="p-2">: {student.gender}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Program</td>
                <td className="p-2">: {student.program}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Batch</td>
                <td className="p-2">: {student.batch}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Register Number</td>
                <td className="p-2">: {student.registerNo}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Roll Number</td>
                <td className="p-2">: {student.rollNo}</td>
              </tr>
              <tr>
                <td className="p-2 font-semibold">Status</td>

                <td className="p-2">
                  :{" "}
                  {`${student.status
                    .charAt(0)
                    .toUpperCase()}${student.status.slice(1)}`}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDetailsModal;
