function Drawer({onClose, onRemove, items = []}){
    return(
            <div  className="overlay">
                    <div className="drawer">
                    <h2 className="d-flex justify-between mb-30">
                        Cart <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close"/> 
                    </h2>

                    {items.length > 0 ?  (
                           <div> <div className="items">
                           {items.map((obj) =>(
                             <div className="cartItem d-flex align-center mb-20">
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
                         <button className="greenButton">
                             Order<img src="/img/arrow.svg" alt="Arrow" />
                             </button>
                         </div>
                          </div>
                        ) : (
                      
                      <div class="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img class="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty"></img>
                        <h2>Cart is empty</h2>
                        <p class="opacity-6">Add at least one pair of sneakers to complete your order.</p>
                        <button onClick={onClose} class="greenButton">
                            <img src="/img/arrow.svg" alt="Arrow"/> Get back
                        </button>
                       
                    </div>
                    )}

                    
            </div> 
        </div> 
    
    );
}

export default Drawer;