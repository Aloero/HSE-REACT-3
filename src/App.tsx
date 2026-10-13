import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import './App.css'

import SearchBar, { useSearchBar } from './SearchBar'
import Header from './Header'
import ProductList, { useCart } from './ProductList'
import { products } from './data'

function App() {
  const [query, setQuery] = useSearchBar("");
  const [filter, setFilter] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) : void {
    const value = e.target.value;
    setQuery(value);
    startTransition(() => setFilter(value));
  }

  const { cart, totalCount, totalPrice, onAdd, onRemove, onClear } = useCart();

  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return products.filter((product) => (!onlyInStock || (onlyInStock && product.inStock == onlyInStock)) && product.title.toLowerCase().includes(q));
  }, [filter, onlyInStock])

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className='site'>
        <Header count={totalCount} sum={totalPrice} onClear={onClear}></Header>
        <SearchBar handleSearch={handleSearch} query={query} onlyInStock={onlyInStock} setOnlyInStock={setOnlyInStock} inputRef={inputRef} n={visible.length}/>
        {isPending ? <span>Обновляем список...</span> : null }
        <ProductList products={visible} onAdd={onAdd} onRemove={onRemove} cart={cart} />
      </div>
    </>
  )
}

export default App
