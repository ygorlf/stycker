import { types, Instance } from 'mobx-state-tree';

export const StickerModel = types.model('Sticker', {
  id: types.identifier,
  type: types.string,
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
  fill: types.string,
});

type StickerType = Instance<typeof StickerModel>;

export const initialState = {
  stickers: {}
};

export const StickersModel = types
  .model("StickersStore", {
    stickers: types.map(StickerModel)
  })
  .views((self) => ({
    get notes() {
      return Array.from(self.stickers.values())
    },
  }))
  .actions((self) => {
    return {
      addSticker(sticker: StickerType) {
        self.stickers.set(sticker.id, sticker);
      }
    }
  });
  

// export const StickersStore = StickersModel.create({
//   ...initialState,
// }, { maxHistoryLength: 50 });



