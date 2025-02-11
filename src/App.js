import React from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  

  React.useEffect(() =>{
    //fetch('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/sneakers').then(res => {
    //  return res.json();
    //})
    //.then(json =>{
    //  setItems(json);
    //});

    axios.get('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/sneakers/').then((res) => {
      setItems(res.data);
    });
    axios.get('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/cart/').then((res) => {
      setCartItems(res.data);
    });
    axios.get('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/favorites/').then((res) => {
      setFavorites(res.data);
    });
  }, []);

  //метод
  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
    axios.put('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/cart/', {value:  [...cartItems, obj]
    });
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

  return (
    <div className="wrapper clear"> 
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>} 
      <Header onClickCart={() => setCartOpened(true)} />
    
      <Routes>
      <Route path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
          exact
        />
      </Routes>

      
      <Routes>
      <Route path="/favorites"
          element={
            <Favorites items={favorites} 
            onAddToFavorite = {onAddToFavorite}
            />
          }
          exact
        />
      </Routes>

    </div>
  );
}


export default App;
