import React, { useEffect, useState } from 'react';
import { fetchData } from './api';
import Navbar from './components/NavBar';
import PatientsList from './components/PatientList';
import DiagnosisList from './components/DiagnosisList';
import PatientInfo from './components/PatientInfo'; // Import PatientInfo

function App() {
    const [selectedPatient, setSelectedPatient] = useState(null); 

    return (
        <div className="container mx-auto p-4">
            <Navbar />
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/4">
                    <PatientsList setSelectedPatient={setSelectedPatient} />
                </div>
                <div className="w-full md:w-2/4 flex flex-col md:flex-row">
                    {/* Diagnosis List and Patient Info Side by Side */}
                    <div className="md:w-1/2">
                        <DiagnosisList selectedPatient={selectedPatient} />
                    </div>
                    {selectedPatient && (
                        <div className="md:w-1/2 ml-4">
                            <PatientInfo patient={selectedPatient} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;