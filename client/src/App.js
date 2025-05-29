// import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';


function App() {

  const [formData, setformData] = useState({
    name: "",
    email:"",
    message: ""
  });
  const [responseMsg, setResponseMsg] = useState('');
  const [messages, setMessages] = useState([]);

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  }

  const handleSubmit = async e =>{
    e.preventDefault();

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(formData.email)){
        setResponseMsg("invalid format email");
        return;
      }
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if(res.ok){
        setResponseMsg("message successfuly sended!");
        setformData({name: "", email: "" , message: ""});

        setMessages(prev => [data.newMessage || formData, ...prev]);
      }else{
        setResponseMsg(data.error, "something is wrong!");
      }
    } catch (error) {
      console.error(error);
      setResponseMsg("server error please try again later");
    }
  }
 
  const fetchMessages = async ()=>{
    try {
    const res = await fetch("http://localhost:5000/api/contact"); 
    const data = await res.json();
    setMessages(data);
    } catch (error) {
      console.error("cant get messages from server! ;(")
    }
  };

  useEffect(()=>{
    fetchMessages();
  },[]); 

  return (
    <div className='container'>
      <h2>
        form contact us
      </h2>
      <form onSubmit={handleSubmit} className='contact-form'>
        <input 
          type='text'
          name='name'
          placeholder='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input 
          type='email'
          name='email'
          placeholder='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea 
          name='message'
          placeholder='please enter your messages'
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type='submit'>send</button>
      </form>
      {responseMsg && <p className='response'>{responseMsg}</p>}

    <div className='messages'>
      <h2>clients messages</h2>
      {messages.length === 0 ?(
        <p>nothing here</p>
      ):(
        messages.map((msg, index) => (
          <div key={index} className='message-card'>
            <p><strong>name: </strong>{msg.name}</p>
            {/* <p><strong>email: </strong>{msg.email}</p> */}
            <p>b{msg.message}</p>
          </div>
        ))
      )}
    </div>
    </div>
  );
}

export default App;
