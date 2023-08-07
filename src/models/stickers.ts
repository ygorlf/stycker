import { types } from 'mobx-state-tree';

export const Sticker = types.model('Sticker', {
  id: types.identifier,
  type: types.string,
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
  fill: types.string,
});

export const initialState = {
  stickers: {
    '123-456-789': {
      id: '123-456-789',
      type: 'note',
      x: 10,
      y: 10,
      width: 125,
      height: 140,
      fill: '#E9E91C'
    },
    '987-654-321': {
      id: '987-654-321',
      type: 'note',
      x: 1100,
      y: 500,
      width: 125,
      height: 140,
      fill: '#E9E91C'
    }
  }
};

export const StickersModel = types
  .model("StickersStore", {
    stickers: types.map(Sticker)
  })
  .views((self) => ({
    get notes() {
      return Array.from(self.stickers.values())
    },
  }))
  .actions((self) => {

    return {

    }
  });
  

// export const StickersStore = StickersModel.create({
//   ...initialState,
// }, { maxHistoryLength: 50 });



