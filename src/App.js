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

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / 10);

  const pageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  // 🔥 Function to generate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); // first page

      if (page > 3) pages.push("...");

      for (let i = page - 1; i <= page + 1; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages); // last page
    }
    return pages;
  };

  return (
    <>
      <div>
        {products.length > 0 && (
          <div className="products">
            {products.slice(page * 10 - 10, page * 10).map((product) => (
              <div className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </div>
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="pagination">
            <span
              onClick={() => pageHandler(page - 1)}
              className={page > 1 ? "" : "pagination__disabled"}
            >
              ⬅️
            </span>

            {getVisiblePages().map((p, index) => (
              <span
                key={index}
                className={p === page ? "pagination__selected" : ""}
                onClick={() => typeof p === "number" && pageHandler(p)}
              >
                {p}
              </span>
            ))}

            <span
              onClick={() => pageHandler(page + 1)}
              className={page < totalPages ? "" : "pagination__disabled"}
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
