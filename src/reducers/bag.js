import {
    ADD_TO_BAG,
    REMOVE_FROM_BAG,
    EMPTY_BAG,
    SET_QUANTITY,
    SET_SIZE,
} from '../actions/bag';

const defaultBagState = [];

export default function bag(state = defaultBagState, action) {
    switch (action.type) {
        case ADD_TO_BAG:
            // Use .some() to check if the item is already in the bag
            const alreadyPresent = state.some(item => item.id === action.item.id);

            console.log(alreadyPresent); // Keep for debugging if needed
            if (!alreadyPresent) {
                // Add the item to the bag, ensuring it also includes the size if provided
                // Make sure action.item has a default quantity and size if they are expected later
                return [...state, { ...action.item, quantity: 1, size: action.size || null }]; // Assuming you might pass size with ADD_TO_BAG
            }
            return state; // Return the current state if already present (no change)

        case REMOVE_FROM_BAG:
            return state.filter(item => item.id !== action.item.id);

        case EMPTY_BAG:
            // It's generally better practice to dispatch UI actions (like alerts)
            // from a component or a Redux Thunk/Saga, not directly in a reducer.
            // Reducers should be pure functions.
            window.alert('Checkout Successful');
            return [];

        case SET_QUANTITY:
            return state.map(item => {
                if (item.id === action.item.id) {
                    return {
                        ...item,
                        quantity: action.quantity
                    }
                }
                return item;
            });

        case SET_SIZE:
            return state.map(item => {
                if (item.id === action.item.id) {
                    return {
                        ...item,
                        size: action.size
                    }
                }
                return item;
            });

        default:
            return state;
    }
}