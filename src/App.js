import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/home/Home';
import About from './components/about/About';
import Team from './components/about/Team';
import Contact from './components/Contact';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Footer from './components/footer/Footer';
import { Products } from './components/Products/Products';
import Cart from './components/cart/Cart';
import ProductDetail from './components/productdetail/ProductDetail';
import UserProfile from './components/UserProfile';
import AdminDash from './components/AdminDash';
import NotFound from './components/NotFound';
import { ToastContainer} from 'react-toastify';


function App() {

  return (
    <div className="App">
      <Router>
        <Navbar title="Flower" />
        <ToastContainer toastClassName='toast-class'/>
        <Switch>
          <Route exact path="/"> 
            <Home />
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/products">
            <Products/>
          </Route>
          <Route exact path="/product/:id">
            <ProductDetail/>
          </Route>
          <Route exact path="/team">
            <Team/>
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/adminDash">
            <AdminDash />
          </Route>
          
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/profile">
            <UserProfile/>
          </Route>
          <Route exact path="/cart/:id?">
            <Cart/>
          </Route>
          <Route component={NotFound} />
        </Switch>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
