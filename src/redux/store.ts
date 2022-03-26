import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import EditorReducer from './services/editor'
import CollectionReducer from './services/collection'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const persistConfig = {
  key: 'editor',
  storage,
  blacklist: ["amount", "catagory", "canvas_state"]
}

const collectionPersistConfig = {
  key: 'collection',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, EditorReducer)
const persistedCollectionReducer = persistReducer(collectionPersistConfig, CollectionReducer)
 
const store = configureStore({
  reducer: {
    canvasReducer:persistedReducer,
    collectionReducer: persistedCollectionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
let persistor = persistStore(store)

export { store, persistor}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch