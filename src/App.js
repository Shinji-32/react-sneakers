import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
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
  }, []);

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


  const onChangeSearchInput = (event) =>{
    setSearchValue(event.target.value);
  }

  return (
    <div className="wrapper clear"> 
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>} 
      <Header onClickCart={() => setCartOpened(true)} />
    

    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Search for: "${searchValue}"` : 'All sneakers'}</h1>  
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={()=> setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear"/>}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
        </div>
      </div>

    
      <div className="d-flex flex-wrap"> 
          {items.filter(item => item.title.toLowerCase().includes(searchValue)).map((item, index) => (
          <Card 
            key={index}
            id={item.id}
            title={item.title} 
            price={item.price +' $'} 
            imageUrl={item.imageUrl} 
            onFavorite={() => console.log('Добавили в закладки')}
            onPlus={(obj) => onAddToCart(item)}
          />
        ))}

        </div>


    </div>
    </div>
  );
}


export default App;
