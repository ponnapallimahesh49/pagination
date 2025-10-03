import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };
  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const pageHandler = (selectedpage) => {
    if (
      selectedpage >= 1 &&
      selectedpage <= products.length / 10 &&
      selectedpage !== page
    )
      setPage(selectedpage);
  };

  return (
    <>
      <div>
        {products.length > 0 && (
          <div className="products">
            {products.slice(page * 10 - 10, page * 10).map((product) => {
              return (
                <div className="products__single" key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <span>{product.title}</span>
                </div>
              );
            })}
          </div>
        )}
        {products.length > 0 && (
          <div className="pagination">
            <span
              onClick={() => pageHandler(page - 1)}
              className={
                page >1 ? "" : "pagination__disabled"
              }
            >
              ⬅️
            </span>
            {[...Array(products.length / 10)].map((_, i) => {
              return (
                <span
                  className={page === i + 1 ? "pagination__selected" : ""}
                  onClick={() => pageHandler(i + 1)}
                  key={i}
                >
                  {i + 1}
                </span>
              );
            })}
            <span
              className={
                page < products.length / 10 ? "" : "pagination__disabled"
              }
              onClick={() => pageHandler(page + 1)}
            >
              ➡️
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
