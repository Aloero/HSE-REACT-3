import { useEffect, useMemo, useRef, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import SearchBar, { useSearchBar } from './SearchBar'
import Header from './Header'
import ProductList from './ProductList'
import { products } from './data'

function App() {
  const [query, setQuery] = useSearchBar("");
  const [onlyInStock, setOnlyInStock] = useState<Boolean>(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => (!onlyInStock || (onlyInStock && product.inStock == onlyInStock)) && product.title.toLowerCase().includes(q));
  }, [query, onlyInStock])

  const [count, setCount] = useState(0);
  const [sum, SetSum] = useState(0);
  const [clear, setClear] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className='site'>
        <Header count={count} sum={sum} setClear={setClear}></Header>
        <SearchBar setQuery={setQuery} onlyInStock={onlyInStock} setOnlyInStock={setOnlyInStock} inputRef={inputRef} n={visible.length}/>
        <ProductList products={visible} />
      </div>
    </>
  )
}

export default App
