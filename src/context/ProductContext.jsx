import { createContext, useContext, useState } from "react";

export const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const addProduct = (newProduct) => {
    const newId =
      products.length > 0
        ? Math.max(...products.map((p) => p.productId)) + 1
        : 1;
    setProducts((prev) => [...prev, { ...newProduct, productId: newId }]);
    return newId;
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.productId !== Number(id)));
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.productId === Number(id) ? { ...p, ...updatedData } : p,
      ),
    );
  };

  const getProduct = (id) => products.find((p) => p.productId === id || p.productId === Number(id));

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        deleteProduct,
        updateProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
