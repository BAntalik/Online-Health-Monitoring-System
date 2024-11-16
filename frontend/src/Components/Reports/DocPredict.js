import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DocPredict = ({ userId }) => {
  const [reports, setreports] = useState([]);
  const [doctor, setdoctor] = useState ({
    doctorID: userId  });
  const [currentReport, setCurrentReport] = useState({
  preportid: 1,
  workersid: 2,
  healthid: 3,
  pdate: "a day"
  });
  const [reportContent, setReportContent] = useState([{
    preportid:	5,
    testtype:	'fake test',
    concernvalue:	5
  }]);
  const [error, setError] = useState('');

  // Function to fetch reports and patients data from the backend
  const fetchReports = async () => {
    
    const Response = await axios.get('http://localhost:5000/predict/fetch');
    setreports(Response.data);
    setError("SUCCESS!")
    try {
  } catch (err) {

    setError('Failed to fetch reports and patients');
  }
};


  const handleViewReport = async (input) => {
    setCurrentReport(input)
    fetchReportContent(input.preportid)
    setError('working')
  }
  const fetchReportContent = async (input) => {
    try{
      const Response = await axios.get('http://localhost:5000/predict/fetchcontent', {
        params: {ReportID: input}
      });
      
      setReportContent(Response.data)

      
    } catch (err) {
      setError('oops')
    }
    
  }
  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <div>
      <h2>Manage Prediction Reports</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if it exists */}
      
       <p> Doctor ID: {doctor.doctorID} {userId}</p> 
      <p> Report ID: {currentReport.preportid} &nbsp;&nbsp;Prepared By: {currentReport.workersid}&nbsp;&nbsp; Date Generated: {currentReport.pdate}&nbsp;&nbsp; Patient: {currentReport.healthid}</p>
      <p>Concern Value represents likelihood of continued problems; lower is better.</p>
      {reportContent.length > 0 ? (
            reportContent.map((Entry)  => (
              <li key={Entry.healthid}>
                <p>Test Type: {Entry.testtype} &nbsp;&nbsp;&nbsp;Concern Value: {Entry.concernvalue}</p>


              </li>
            ))
          ) : (
            <p>No entries available</p>
          )}
      <div>
        <h3>Existing reports</h3>
        <ul>
          {reports.length > 0 ? (
            reports.map((Report) => (
              <li key={Report.preportid}>
                <p>{Report.preportid} {Report.healthid} {Report.pdate} </p>

                <button onClick={() => handleViewReport(Report)}>View Report</button>
              </li>
            ))
          ) : (
            <p>No reports available</p>
          )}
        </ul>

        
      </div>


    </div>
  );
};

export default DocPredict;
