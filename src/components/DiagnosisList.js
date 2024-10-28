import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaArrowUp, FaArrowDown, FaCaretDown } from 'react-icons/fa';

Chart.register(...registerables);

const DiagnosisList = ({ selectedPatient }) => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({ datasets: [] });
    const [diagnosticList, setDiagnosticList] = useState([]);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            // Check if the selected patient is Jessica Taylor
            if (!selectedPatient || selectedPatient.name !== 'Jessica Taylor') {
                setDiagnoses([]);
                setChartData({ datasets: [] });
                setDiagnosticList([]);
                setLoading(false);
                return;
            }

            // Simulating API response specific to Jessica Taylor
            const data = {
                diagnosis_history: [
                    { month: "March", year: 2024, blood_pressure: { systolic: { value: 160 }, diastolic: { value: 78 } } },
                    { month: "February", year: 2024, blood_pressure: { systolic: { value: 119 }, diastolic: { value: 73 } } },
                    { month: "January", year: 2024, blood_pressure: { systolic: { value: 128 }, diastolic: { value: 86 } } },
                    { month: "December", year: 2023, blood_pressure: { systolic: { value: 91 }, diastolic: { value: 111 } } },
                    { month: "November", year: 2023, blood_pressure: { systolic: { value: 173 }, diastolic: { value: 103 } } },
                    { month: "October", year: 2023, blood_pressure: { systolic: { value: 125 }, diastolic: { value: 103 } } }
                ],
                diagnostic_list: [
                    { name: "Hypertension", description: "Chronic high blood pressure", status: "Under Observation" },
                    { name: "Type 2 Diabetes", description: "Insulin resistance and elevated blood sugar", status: "Cured" },
                    { name: "Asthma", description: "Recurrent episodes of bronchial constriction", status: "Inactive" },
                    { name: "Osteoarthritis", description: "Degenerative joint disease", status: "Untreated" },
                ],
            };

            const diagnosisData = data.diagnosis_history || [];
            const diagnostics = data.diagnostic_list || [];

            setDiagnoses(diagnosisData);
            setDiagnosticList(diagnostics);

            // Filter for dates between October 2023 and March 2024
            const filteredData = diagnosisData.filter(diagnosis => {
                const date = new Date(`${diagnosis.month} 1, ${diagnosis.year}`);
                return date >= new Date('2023-10-01') && date <= new Date('2024-03-31');
            });

            createChartData(filteredData);
            setLoading(false);
        };

        const createChartData = (filteredData) => {
            const labels = filteredData.map(d => `${d.month} ${d.year}`);
            const systolicData = filteredData.map(d => d.blood_pressure.systolic.value);
            const diastolicData = filteredData.map(d => d.blood_pressure.diastolic.value);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Systolic Blood Pressure',
                        data: systolicData,
                        fill: false,
                        borderColor: 'rgba(255, 99, 132, 1)', // Red color for systolic line
                        borderWidth: 2,
                        pointRadius: 6,
                    },
                    {
                        label: 'Diastolic Blood Pressure',
                        data: diastolicData,
                        fill: false,
                        borderColor: 'rgba(54, 162, 235, 1)', // Blue color for diastolic line
                        borderWidth: 2,
                        pointRadius: 6,
                    },
                ],
            });
        };

        fetchDiagnoses();
    }, [selectedPatient]);

    const calculateAverages = () => {
        const systolicValues = diagnoses.map(d => d.blood_pressure.systolic.value);
        const diastolicValues = diagnoses.map(d => d.blood_pressure.diastolic.value);
        
        const averageSystolic = (systolicValues.reduce((a, b) => a + b, 0) / systolicValues.length).toFixed(2);
        const averageDiastolic = (diastolicValues.reduce((a, b) => a + b, 0) / diastolicValues.length).toFixed(2);
        
        return { averageSystolic, averageDiastolic };
    };

    const { averageSystolic, averageDiastolic } = calculateAverages();
    const systolicStatus = averageSystolic > 120 ? 'above average' : 'below average';
    const diastolicStatus = averageDiastolic > 80 ? 'above average' : 'below average';

    if (loading) return <div>Loading...</div>;

    return (
        <div className="mt-6 bg-white p-4 rounded">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Blood Pressure</h3>
                <div className="flex items-center">
                    <span className="mr-2">Last 6 months</span>
                    <FaCaretDown className="text-gray-500" />
                </div>
            </div>
            <div style={{ backgroundColor: 'rgba(128, 0, 128, 0.1)', padding: '20px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '300px', height: '200px' }}> {/* Adjust size here */}
                    <Line data={chartData} options={{
                        plugins: {
                            legend: {
                                display: true,
                            },
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                    }} />
                </div>
                <div className="ml-4">
                    <p>
                        <strong>Average Systolic:</strong> {averageSystolic} 
                        {systolicStatus === 'above average' ? <FaArrowUp className="text-green-500 inline" /> : <FaArrowDown className="text-red-500 inline" />}
                    </p>
                    <p>
                        <strong>Average Diastolic:</strong> {averageDiastolic} 
                        {diastolicStatus === 'above average' ? <FaArrowUp className="text-green-500 inline" /> : <FaArrowDown className="text-red-500 inline" />}
                    </p>
                </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Diagnostic Problems</h3>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Problem</th>
                        <th className="border border-gray-300 p-2">Description</th>
                        <th className="border border-gray-300 p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {diagnosticList.length > 0 ? (
                        diagnosticList.map((diag, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 p-2">{diag.name}</td>
                                <td className="border border-gray-300 p-2">{diag.description}</td>
                                <td className="border border-gray-300 p-2">{diag.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="border border-gray-300 p-2 text-center">No diagnostic problems found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DiagnosisList;