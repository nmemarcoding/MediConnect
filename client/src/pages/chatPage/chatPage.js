import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { publicRequest } from '../../hooks/requestMethods';
import Navbar from '../../components/navbar/navbar';

const ChatPage = () => {
    const { patientId, doctorId } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        publicRequest().get(`/message/get/${doctorId}/${patientId}`)
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [doctorId, patientId]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            sender: doctorId,
            receiver: patientId,
            messageContent: message,
            // Assume the timestamp is generated on the server-side when the message is created
        };

        publicRequest().post('/message/create', newMessage)
            .then(res => {
                setMessages([...messages, res.data]); // Assuming the response includes the new message with an ID and timestamp
                setMessage('');
                setSelectedFile(null);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <div className="flex w-screen h-screen justify-center items-center flex-col">
                {/* Display Messages */}
                <div className="mb-4 h-1/2 overflow-y-scroll w-full md:w-1/2 border-2 border-gray-300 p-4">
                    {messages.map((msg) => (
                        <div key={msg._id} className={`flex mt-[5px] ${msg.sender === doctorId ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-lg px-4 py-2 ${msg.sender === doctorId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                                <p>{msg.messageContent}</p>
                                <p className="text-xs text-right">{msg.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Message Form */}
                <form className="flex flex-col w-full md:w-1/2" onSubmit={handleSubmit}>
                    <textarea className="border-2 border-gray-300 p-2 mb-2" placeholder="Type your message here..." value={message} onChange={handleMessageChange} />
                    <div className="flex space-x-2">
                        <input type="file" className="flex-1 border-2 border-gray-300 p-2" onChange={handleFileChange} />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Send</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ChatPage;
