import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import Main from "./Main/Main.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import AddProduct from "./pages/AddProduct/AddProduct.jsx";
import EditProduct from "./pages/EditProduct/EditProduct.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/ProductDetail/:id" element={<ProductDetail />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
