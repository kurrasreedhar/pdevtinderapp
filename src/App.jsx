
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Body } from './components/Body'
import { Login } from './components/Login'
import {Profile} from "./components/Profile"
import { Connections } from './components/Connections'
import './App.css'
import appStore from './utils/appStore'
import { Provider } from 'react-redux'
import { Feed } from './components/Feed'
import { Requests } from './components/Requests'
function App() {
  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename='/'>
      <Routes>
        <Route path ="/" element={<Body/>}>
  <Route path ="/" element={<Feed/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/connections" element={<Connections/>}></Route>
        <Route path="/requests" element={<Requests/>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
      </div>
  )
}
export default App
