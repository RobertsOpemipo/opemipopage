import React from 'react';
import { FaDownload } from 'react-icons/fa';

const PatientInfo = ({ patient }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-bold">Patient Information</h3>
            <div className="flex items-center">
                <img src={patient.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                <div>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Contact Info:</strong> {patient.contactInfo}</p>
                    <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
                    <p><strong>Insurance Provider:</strong> {patient.insuranceProvider}</p>
                </div>
            </div>
            <h4 className="mt-4 font-bold">Lab Results</h4>
            <ul>
                {patient.labResults.map((result, index) => (
                    <li key={index} className="flex justify-between items-center py-2">
                        <span>{result.name}</span>
                        <FaDownload className="text-blue-600 cursor-pointer" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientInfo;