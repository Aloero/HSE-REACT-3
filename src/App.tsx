import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import './App.css'
import type { State, Action, Item } from "./types"

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

  const initialCart = { items: [] };

  function cartReducer(state: State, action: Action) : State {
      switch (action.type) {
          case "add": {
              setCount((x) => x + 1);
              SetSum((x) => x + action.item.price)
              const idx: number = state.items.findIndex(item => item.id == action.item.id);
              if (idx == -1) {
                action.item.qty = 1;
                return { items: [...state.items, action.item]}
              }
              action.item.qty = state.items[idx].qty + 1;
              return { items: [...state.items.slice(0, idx), ...state.items.slice(idx + 1), action.item]}
            }
          case "remove": {
              const idx: number = state.items.findIndex(item => item.id == action.item.id);
              if (idx == -1) {
                return { items: [...state.items]};
              }
              setCount((x) => x - state.items[idx].qty);
              SetSum((x) => x - state.items[idx].price * state.items[idx].qty)
              return { items: state.items.filter((item) => item.id !== action.item.id)}
            }
          case "clear":
              setCount(() => 0);
              SetSum(() => 0)
              return initialCart;
          default:
              return state;
      }
  }

  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const onAdd = useCallback(
    (product: Item) => dispatch({ type: "add", item: product }), []
  )

  const onRemove = useCallback(
    (product: Item) => dispatch({ type: "remove", item: product }), []
  )

  const onClear = useCallback(
    () => dispatch({ type: "clear" }), []
  )

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div className='site'>
        <Header count={count} sum={sum} onClear={onClear}></Header>
        <SearchBar setQuery={setQuery} onlyInStock={onlyInStock} setOnlyInStock={setOnlyInStock} inputRef={inputRef} n={visible.length}/>
        <ProductList products={visible} onAdd={onAdd} onRemove={onRemove} cart={cart} />
      </div>
    </>
  )
}

export default App
