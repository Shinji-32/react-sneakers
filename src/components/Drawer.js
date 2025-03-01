import React from 'react';
import Info from "./info";
import axios from 'axios';
import AppContext from '../context';

function Drawer({onClose, onRemove, items = []}){
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onClickOrder = async() =>{
        try{
         setIsLoading(true);
         //передаю об'єкти в orders
         const {data} = await axios.put('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/orders/', {value: cartItems});
         setOrderId(data.id);
         setIsOrderComplete(true);
         setCartItems([]);
 
       //очистити масив корзини
         for (let i = 0; i < cartItems.length; i++) {
         const item = cartItems[i];
         await axios.put('http://127.0.0.1:8000/6845ccd8-edf2-4ddb-8b15-e65333e43682/orders/', {value: []});
         
     }
 
        } catch (error){
         alert('Failed to create an order :(');
        }
        setIsLoading(false);
     }

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
                             <b>625 USD </b>
                             </li>
                             <li>
                             <span>Tax 5%:</span>
                             <div></div>
                             <b>31.25 USD </b>
                             </li>
                         </ul>
                         <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                             Order<img src="/img/arrow.svg" alt="Arrow" />
                             </button>
                         </div>
                          </div>
                        ) : (
                            <Info title={isOrderComplete ? "Order complete!" :"Cart is empty"} 
                            description={isOrderComplete ? `Your order #${orderId} will be handed over to the courier` : `Add at least one pair of sneakers to complete your order.`} 
                            image={isOrderComplete ? "/img/complete-order.jpg": "/img/empty-cart.jpg"}/>
                    )}

                    
            </div> 
        </div> 
    
    );
}

export default Drawer;