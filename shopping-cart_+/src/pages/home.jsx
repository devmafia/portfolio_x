import { useEffect, useState } from "react"
import ProductTile from "../components/product-tile";

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    async function fetchListOfProducts() {
        setLoading(true)
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json()
        if (data) {
            setLoading(false)
            setProducts(data)
        }
   }

    useEffect(() => {
        fetchListOfProducts()
    }, [])

    return (
        <div>
          {loading ? (
            <div className="min-h-screen w-full">
              ...Loading
            </div>
          ) : (
            <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products && products.length ? (
                products.map((productItem) => (
                  <ProductTile key={productItem.id} product={productItem} />
                ))
              ) : null}
            </div>
          )}
        </div>
      );   
}