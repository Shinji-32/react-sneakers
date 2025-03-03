import React from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  

  React.useEffect(() =>{
    //fetch('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/sneakers').then(res => {
    //  return res.json();
    //})
    //.then(json =>{
    //  setItems(json);
    //});

    async function fetchData() {
      //setIsLoading(true); можна юзати якщо функція відбувається більше 1 разу
      //оскільки загрузка відбувається 1 раз, перед відправкою запиту, то сенсу нема
      const cartResponse = await axios.get('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/cart/');
      const favoritesResponse = await axios.get('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/favorites/');
      const itemsResponse = await axios.get('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/sneakers/');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  //метод
  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.put(`http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/cart/`, {value: cartItems.filter((item) => item.id !== obj.id)});
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
    } else {
      setCartItems((prev) => [...prev, obj]);
      axios.put('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/cart/', {value:  [...cartItems, obj]});
    };
  };

  const onRemoveItem = (id) => {
    //console.log(id);
    axios.put(`http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/cart/`, {value: cartItems.filter((item) => item.id !== id)});
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(item => item.id === obj.id)) {
        const updatedFavorites = favorites.filter(item => item.id !== obj.id);
        setFavorites(updatedFavorites);
        await axios.put('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/favorites/', { 
          value: updatedFavorites 
        });
      } else {
        const updatedFavorites = [...favorites, obj];
        setFavorites(updatedFavorites);
        await axios.put('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/favorites/', { 
          value: updatedFavorites 
        });
      }
    } catch (error) {
      alert('Failed to add to favorites');
    }
  };

  const onChangeSearchInput = (event) =>{
    setSearchValue(event.target.value);
  };


  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  };


  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}>
        <div className="wrapper clear"> 
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>} 
        <Header onClickCart={() => setCartOpened(true)} />
      
        <Routes>
        <Route path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading = {isLoading}
              />
            }
            exact
          />
        </Routes>

        <Routes>
        <Route path="/favorites"
            element={
              <Favorites items={favorites} onAddToFavorite = {onAddToFavorite}
              />
            }
            exact
          />


        <Route path="/orders"
                    element={
                      <Orders />
                    }
                    exact
                  />

        </Routes>
      </div>
    </AppContext.Provider>
    
  );
}


export default App;
