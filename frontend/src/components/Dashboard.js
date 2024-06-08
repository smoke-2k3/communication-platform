import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [emails, setEmails] = useState([]);
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmails = async () => {
            const urlParams = new URL(document.location.toString()).searchParams;
            const token = urlParams.get("token");
            if (token) {
                try {
                    const decoded = jwt_decode(token);
                    if (Date.now() >= decoded.exp * 1000) {
                        localStorage.removeItem('token');
                        console.log('Token expired')
                        navigate('/');
                    } else {
                        setIsAuthenticated(true);
                        const response = await axios.get('http://localhost:3000/communication/history', {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        setEmails(response.data);
                    }
                } catch (error) {
                    console.log('Error decoding token or fetching emails')
                    console.error('Error decoding token or fetching emails', error);
                    localStorage.removeItem('token');
                    navigate('/');
                }
            } else {
                console.log('No token')
                navigate('/');
            }
        };

        fetchEmails();
    }, [navigate]);

    const handleSendEmail = async () => {
        const urlParams = new URL(document.location.toString()).searchParams;
        const token = urlParams.get("token");
        if (token) {
            console.error("sending mail");
            try {
                await axios.post('http://localhost:3000/communication/send', {
                    to,
                    subject,
                    body
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setTo('');
                setSubject('');
                setBody('');

                // Fetch emails again to update the list
                const response = await axios.get('http://localhost:3000/communication/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEmails(response.data);
            } catch (error) {
                console.log("cannot send mail");
                console.error('Error sending email', error);
            }
        }
        else {
            console.error("no token (email)");
        }
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Communication History</h1>
            <ul>
                {emails.map(email => (
                    <li key={email._id}>{email.subject} - {email.to} - {new Date(email.date).toLocaleString()}</li>
                ))}
            </ul>
            <h1>Compose Email</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
                <input
                    type="email"
                    placeholder="To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Dashboard;
