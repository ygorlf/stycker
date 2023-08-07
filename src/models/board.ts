import { types } from 'mobx-state-tree';

type stickermodeType = 'none' | 'note' | 'emoji' | 'image' | 'draw';

export const initialState = {
  stickerMode: 'none'
};

export const BoardModel = types
  .model("BoardStore", {
    stickerMode: types.string
  })
  .views((self) => ({
  }))
  .actions((self) => {
    return {
      setStickerMode(mode: stickermodeType) {
        self.stickerMode = mode;
      }
    }
  });
  



