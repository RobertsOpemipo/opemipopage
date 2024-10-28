import React, { useEffect, useState } from 'react';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';

const PatientsList = ({ setSelectedPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const username = 'coalition';
        const password = 'skills-test';
        const auth = btoa(`${username}:${password}`);

        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`,
          },
        });

        // Check if the response is okay
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Try to parse the response as JSON
        const data = await response.json();
        console.log(data);

        const patientsArray = data.patients || data;
        if (Array.isArray(patientsArray)) {
          setPatients(patientsArray);
        } else {
          console.warn('Expected an array of patients but got:', patientsArray);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-6 max-w-sm">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold mr-64">Patients</h2>
        <FaSearch className="text-gray-500" />
      </div>
      <div className="overflow-y-auto h-auto">
        <div className="space-y-4">
          {patients.map(({ id, name, gender, age, profile_picture }) => (
            <div
              key={id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm cursor-pointer"
              onClick={() => setSelectedPatient({ id, name, gender, age, profile_picture })}
            >
              <div className="flex items-center">
                <img src={profile_picture} alt="Profile" className="rounded-full mr-3" />
                <div>
                  <div className="font-semibold">{name}</div>
                  <div className="text-gray-500">{gender}, {age} years</div>
                </div>
              </div>
              <FaEllipsisV className="text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsList;