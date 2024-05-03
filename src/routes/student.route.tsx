import { Route } from 'react-router-dom';
import CreateArticle from '../pages/student/CreateArticle.page';
import StudentHome from '../pages/student/StudentHome.page';
import MyArticles from '../pages/student/MyArticles.page';
function StudentRoute() {
  return (
    <>
      <Route path='/student' element={<StudentHome />} />
      <Route path='/student/CreateArticle' element={<CreateArticle />} />
      <Route path='/student/MyArticles' element={<MyArticles />} />
    </>
  );
}

export default StudentRoute;