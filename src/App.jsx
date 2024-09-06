import HomeScreen from './components/Home/HomeScreen'
import { Route, Routes } from 'react-router-dom'
import ProtecteRoute from './components/ProtecteRoute'
import Login from './components/Login/Login'
import PurchaseScreen from './components/Purchases/PurchaseScreen'
import ProductScreen from './components/Products/ProductScreen'
import Cart from './components/Cart/Cart'
import RegisterScreen from './components/Register/RegisterScreen'
import Error404 from './components/404/Error404'
import AccountScreen from './components/Account/AccountScreen'


function App() {

  return (
    <div className="E-commerce">
      <Routes>
        <Route path='/' element={<HomeScreen />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />
        <Route element={<ProtecteRoute />}>
            <Route path='/purchases' element={<PurchaseScreen />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/account' element={<AccountScreen />} />
        </Route>
        <Route path='*'  element={<Error404 />} />
      </Routes>
      
    </div>
  )
}

export default App
