  import { Routes,Route } from 'react-router-dom'
  import './App.css'
  import Header from './components/Header'
  import  Home  from './pages/Home'
  import  Login  from './pages/Login'
  import  Signup from './pages/Signup'
  import  Chat  from './pages/Chat'
  import {AuthProvider, useAuth} from "./contexts/AuthContext"
import NotFound from './pages/NotFound'

  function App() {
    const auth=useAuth()
    return ( 
        <main>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
           <Route path="/chat" element={<Chat/>}/>
           <Route path="*" element={<NotFound/>}/>

          </Routes>
          </AuthProvider>

        </main>
    )
  }

  export default App
