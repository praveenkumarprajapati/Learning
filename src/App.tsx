import React, { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
  useNavigate,
 } from 'react-router-dom';
 import { Image } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

let token: string | null = localStorage.getItem('token') || null;

const logOut = () => {
  localStorage.removeItem('token');
  token = null;
}

const logIn = () => {
  const userId = String(Math.floor(Math.random()*10000));
  localStorage.setItem('token', userId);
  token = userId;
  console.log(token);
}

function App() {
  const [messages, setMessages] = useState<Array<string>>([])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home setMessages={setMessages} messages={messages}/>}>
          <Route path='login' element={<Login />} />
          <Route path='/' element={<Body messages={messages} />} />
          <Route path='about' element={<Aboute />} />
        </Route>
      </Routes>
    </Router>
  );
}
const Home = ({ setMessages, messages }: any) => {
  let navigate = useNavigate();
  useEffect( () => {
    console.log(token);
    if (!token) {
      console.log(token);
      navigate('/login');
    }
  });
  return (
      <div className='text-dark'>
          <header className="d-flex container-fluid bg-warning justify-content-between px-5 shadow">
            <h2 className="title-1 text-light">Go</h2>
            <div>
              <button className="btn btn-danger" onClick={() => setMessages([...messages, 'hello'])}>+</button>
            <Image src="holder.js/171x180" width={20}/>
            {
              token ?
              <button className="btn btn-primary" onClick={() => { logOut(); navigate('/login') } } type="button" >Log out</button> :
              <button className="btn btn-secondary" onClick={() => { logOut(); navigate('/login') } } type="button" >Log in</button>
            }
            </div>
          </header>
          <div className="shadow bg-secondary container my-3" style={{height: '80vh', overflow: 'auto'}}>
            <Outlet />
          </div>
      </div>
  )
}

const Login = () => {

  const navigate = useNavigate();
  useEffect( () => {
    if (token) {
      navigate('/');
    }
  } );
  return (
    <div>
      <form>
        <input type="email" placeholder="email" required />
        <input type="password" placeholder="password" required />
        <input type="button" value="login" onClick={() => { logIn(); navigate('/'); }} />
      </form>
    </div>
  )
}

const Aboute = () => {
  return (
    <div>
      <h3> Aboute </h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore vel numquam et, recusandae eligendi excepturi necessitatibus delectus fuga facere itaque commodi? Incidunt quo ratione excepturi architecto illum placeat doloribus reiciendis?
      </p>
    </div>
  );
}

const Body = ({ messages }: { messages: Array<string> } ) => {
  return (
    <>
    <h5 className="display-1 text-light text-center">Welcome</h5>
    { messages.map((msg: string) => {
        return (<p>{msg}</p>);
      })
    }
    </>
  )
}

export default App;
