import React from 'react';
import axios from 'axios';

import Card from '../components/Card';
import AppContext from '../context';

function Orders(){
    const {onAddToFavorite, onAddToCart, isItemAdded} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/orders/');
                if (Array.isArray(data)) {
                    setOrders(data);
                    setIsLoading(false);
                } else {
                    console.error('Unexpected response format:', data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        })();
    }, []);
    

    return (
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>My orders</h1>  
          </div>

      
          <div className="d-flex flex-wrap"> 
            {(isLoading ? [...Array(10)] : orders).map((item, index) => (
                <Card 
                    key={index}
                    id={item?.id}
                    title={item?.title}  
                    price={item?.price +' $'} 
                    imageUrl={item?.imageUrl} 
                    added={isItemAdded(item && item.id)}
                    loading={isLoading}
                />
              ))}
          </div>
      </div>
    )
}

export default Orders;