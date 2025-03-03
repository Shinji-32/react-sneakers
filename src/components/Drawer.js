import React from 'react';
import Info from "./info";
import axios from 'axios';
import { useCart } from '../hooks/useCart';


function Drawer({onClose, onRemove, items = []}){
    const {cartItems, setCartItems, totalPrice } = useCart();
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.put(
            'http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/orders/', 
            { value: cartItems }
          );
      
          if (Array.isArray(data) && data.length > 0) {
            // Беремо ID першого елемента (або змінюємо логіку, якщо потрібно інше)
            setOrderId(data[0].id);
            setIsOrderComplete(true);
            setCartItems([]);
          } else {
            throw new Error("Invalid response format: expected an array with order ID");
          }
        } catch (error) {
          alert('Failed to create an order :(');
        } finally {
          setIsLoading(false);
        }
      };
      

    return(
            <div  className="overlay">
                    <div className="drawer">
                    <h2 className="d-flex justify-between mb-30">
                        Cart <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close"/> 
                    </h2>

                    {items.length > 0 ?  (
                           <div className="d-flex flex-column flex"> <div className="items">
                           {items.map((obj) =>(
                             <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                 <div style={{backgroundImage: `url(${obj.imageUrl})`}} 
                                 className="cartItemImg"></div> 
     
                                 <div className="mr-20 flex">
                                     <p className="mb-5">{obj.title}</p>
                                     <b>{obj.price} USD</b>
                                 </div>
                                 <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove"/>
                             </div>
                             ))}
                         </div> 
                         
                         <div className="cartTotalBlock">
                         <ul>
                             <li>
                             <span>Total:</span>
                             <div></div>
                             <b>{totalPrice} USD </b>
                             </li>
                             <li>
                             <span>Tax 5%:</span>
                             <div></div>
                             <b>{totalPrice/100*5} USD </b>
                             </li>
                         </ul>
                         <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                             Order<img src="/img/arrow.svg" alt="Arrow" />
                             </button>
                         </div>
                          </div>
                        ) : (
                            <Info 
                                title={isOrderComplete ? "Order complete!" : "Cart is empty"} 
                                description={isOrderComplete && orderId ? `Your order #${orderId} will be handed over to the courier` : `Add at least one pair of sneakers to complete your order.`} 
                                image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"} 
/>

                    )}

                    
            </div> 
        </div> 
    
    );
}

export default Drawer;