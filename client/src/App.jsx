import './App.css'
import LoginForm from './component/login-form'
import RegistrationForm from './component/rigester-form'

function App() {

  return (
   <>
   <div className="container">
    <div className="row">
      <h1>EventSphere_Management</h1>
    </div>
    <div className="row">
      <RegistrationForm />
      <LoginForm />
    </div>
   </div>
   </>
  )
}

export default App
