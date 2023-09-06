import { createContext, useContext } from 'react';
import { Instance, types } from 'mobx-state-tree';

import { StickersModel, initialState as stickersState } from './stickers';
import { BoardModel, initialState as boardState } from './board';

export const RootStore = types.model({
  boardStore: BoardModel,
  stickersStore: StickersModel,
});

export const initializeStore = () => {
  const _store = RootStore.create({
    boardStore: boardState,
    stickersStore: stickersState,
  });
  return _store;
}

export type RootInstance = Instance<typeof RootStore>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;

export function useStore(): Instance<typeof RootStore> {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}