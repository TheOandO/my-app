import { Route } from 'react-router-dom';
import Login from '../pages/guest/Login.page';
import Register from '../pages/guest/Register.page';
import Homepage from '../pages/guest/Home.page';
import MyAccount from '../pages/MyAccount.page';
import Newsfeed from '../pages/guest/Newsfeed.page';

function GuestRoute() {
    return (
        <>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path="/Myaccount/:id" element={<MyAccount />} />
            <Route path="/Newsfeed" element={<Newsfeed />} />
        </>
    );
}

export default GuestRoute;