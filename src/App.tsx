import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/guest/Login.page';
import Register from './pages/guest/Register.page';
import { ChakraProvider } from '@chakra-ui/react';
import Homepage from './pages/guest/Home.page';
import Members from './pages/admin/Members.page';
import Add from './pages/admin/Add.page';
import SendNotif from './pages/admin/SendNotification.page';
import CreateTopicForm from './pages/admin/CreateTopic.page';
import AdminHome from './pages/admin/AdminHome.page';
import CreatePostForm from './pages/student/CreatePost.page';
import StudentHome from './pages/student/StudentHome.page';
import ViewTopics from './pages/admin/Topics.page'
import MyPosts from './pages/student/MyPosts.page';

const App: React.FC = () => (
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/Admin" element={<AdminHome />} />
        <Route path="/Members" element={<Members />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/SendNotif" element={<SendNotif />} />
        <Route path='/CreateTopic' element={<CreateTopicForm/>} /> 
        <Route path='/ViewTopics' element={<ViewTopics/>} /> 
        <Route path='/Student' element={<StudentHome/>} />
        <Route path='/CreatePost' element={<CreatePostForm/>} />
        <Route path='/MyPosts' element={<MyPosts/>} />
      </Routes>    
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
