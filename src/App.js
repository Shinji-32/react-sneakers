import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() =>{
    fetch('https://679d0d3e87618946e65439ab.mockapi.io/items').then(res => {
      return res.json();
    })
    .then(json =>{
      setItems(json);
    });
  },[]);

  const onAddToCart = (obj) =>{
    setCartItems((prev) => {
      // Чекаю чи є товар в корзині
      const isItemInCart = prev.some((item) => item.imageUrl === obj.imageUrl);
      if (isItemInCart) {
        // Якщо є товар - забираю
        return prev.filter((item) => item.imageUrl !== obj.imageUrl);
      } else {
        // Якщо нема товару - добавляю
        return [...prev, obj];
      }
    });
  };


  return (
    <div className="wrapper clear"> 
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>} 
      <Header onClickCart={() => setCartOpened(true)} />
    

    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>All sneakers</h1>  
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input placeholder="Search..."/>
        </div>
      </div>

    
      <div className="d-flex flex-wrap"> 
          {items.map((item) => (
          <Card 
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
