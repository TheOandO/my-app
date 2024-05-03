import { Route } from 'react-router-dom';
import Login from '../pages/guest/Login.page';
import Register from '../pages/guest/Register.page';
import Homepage from '../pages/guest/Home.page';
import MyAccount from '../pages/MyAccount.page';
import About from '../pages/guest/About.page';
import Newsfeed from '../pages/guest/Newsfeed.page';

function GuestRoute() {
    return (
        <>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/Newsfeed" element={<Newsfeed />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/About" element={<About />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path="/Myaccount/:id" element={<MyAccount />} />
        </>
    );
}

export default GuestRoute;