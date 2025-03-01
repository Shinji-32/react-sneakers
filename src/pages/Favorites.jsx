import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({ searchValue, setSearchValue, onChangeSearchInput }){
 
  const { favorites, onAddToFavorite } = React.useContext(AppContext);


    return (
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
            {favorites.map((item, index) => (
                <Card 
                  key={index}
                  id={item.id}
                  title={item.title} 
                  price={item.price +' $'} 
                  imageUrl={item.imageUrl}
                  favorited={true}
                  onFavorite = {onAddToFavorite}
                />
              ))}
          </div>
      </div>
    )
}

export default Favorites;