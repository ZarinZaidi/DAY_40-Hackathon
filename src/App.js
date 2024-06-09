import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Login from './pages/Login'; // Import the Login component
import Register from './pages/Register'; // Import the Register component

// ...rest of your imports and code

function App() {
  // ...rest of your state and functions

  return (
    <CartContext.Provider value={{ cartItem, addToCart, setCartItem }}>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="categories" element={<Categories />}>
          <Route path="all" element={<All />} />
          <Route path="furnitures" element={<Furnitures />} />
          <Route path="electronics" element={<Electronics />} />
          <Route path="lamps" element={<Lamps />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="chairs" element={<Chairs />} />
          <Route path="skin-care" element={<SkinCare />} />
        </Route>
        <Route path="categories/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> {/* Add this line */}
      </Routes>
    </CartContext.Provider>
  );
}

export default App;
