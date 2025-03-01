import React from 'react';

import Card from '../components/Card';
import AppContext from '../context';


function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading}){
  
  const {isItemAdded} = React.useContext(AppContext);

  const renderItems = () => {
    const filtredItems = items.filter((item) => 
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => (
      <Card 
        key={index}
        id={item?.id}
        title={item?.title}  
        price={item?.price +' $'} 
        imageUrl={item?.imageUrl} 
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(item)}
        added={isItemAdded(item && item.id)}
        loading={isLoading}
        
      />
    ));
  };

  return(
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
              {renderItems()}
          </div>
      </div>
  );
}

export default Home;