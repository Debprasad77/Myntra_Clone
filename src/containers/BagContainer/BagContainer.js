import React from 'react';
import './BagContainer.css';
import { BagItemCard, Empty } from '../../components/index';
import { emptyBag } from '../../actions/bag';
import { useDispatch, useSelector } from 'react-redux';
import { findTotal } from '../../helpers/general';

export default function BagContainer() {
    const bag = useSelector(state => state.bagStore);
    const dispatch = useDispatch();

    function checkOutHandler(event){
        console.log("check out");
        let checkoutCheck = true;

        // Use a for...of loop to iterate and allow early exit if a product is missing a size
        for (const product of bag) {
            if (product.size === undefined) {
                window.alert('Please select size for ' + product.productName);
                checkoutCheck = false; // Set the flag to false
                break; // Stop the loop immediately as we found an invalid product
            }
        }

        if( checkoutCheck ){
            dispatch(emptyBag());
        }
    }

    return (
        <div className="bag-container flex-row " >
            {
                bag.length === 0 ?
                <Empty />
                :
                // This map correctly returns JSX elements, but remember to add a unique 'key'
                bag.map((product,index) => (
                    <BagItemCard item={product} key={product.id || index} />
                ))
            }
            <div className="bag-action" >
                <div className="total-amount center" >
                    <p>₹ { findTotal(bag) }</p>
                </div>
                <div
                    className={`checkout center ${ bag.length > 0 ? "" : "inactive"} `}
                    onClick={ checkOutHandler }
                >
                    <p>
                        Checkout <i className="fas fa-arrow-circle-right"></i> {/* Use className for React */}
                    </p>
                </div>
            </div>
        </div>
    )
}