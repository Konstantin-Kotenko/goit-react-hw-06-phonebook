import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import defaultContacts from '../data/defaultContacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: defaultContacts,
    filter: '',
  },
  reducers: {
    add(state, action) {
      state.items.push(action.payload);
    },
    remove(state, action) {
      state.items.filter(item => item.id !== action.payload);
    },
    filterItems(state, action) {
      return { ...state, filter: action.payload };
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['items'],
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const getItemsValue = state => state.contacts.items;
export const getFilterValue = state => state.contacts.filter;
export const { add, remove, filterItems } = contactsSlice.actions;
