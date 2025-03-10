import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Signin from './pages/signin';
import Signup from './pages/signup';
import AuthProvider from './provider/AuthProvider';
import PrivateRoute from './pages/privateRoute';
import Sharedpage from './pages/sharedpage';

// TODO
// Libs used for data fetching
// [ ] react-hook-forms
// [ ] react-query
// [ ] swr

// TODOs
// [x] Creating authorization routes
// Use all routes/apis from backend
// 3. make the ui proper.
//

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/content/share/:shareLink' element={<Sharedpage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
