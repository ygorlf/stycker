import { types, Instance } from 'mobx-state-tree';

type stickermodeType = 'none' | 'note' | 'emoji' | 'image' | 'draw';

export const BoardBoundsModel = types.model('BoardBounds', {
  x: types.number,
  y: types.number,
  scaleX: types.number,
  scaleY: types.number
});

type BoardBoundsType = Instance<typeof BoardBoundsModel>;

export const initialState = {
  stickerMode: 'none',
  boardBounds: {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1
  }
};

export const BoardModel = types
  .model("BoardStore", {
    boardBounds: BoardBoundsModel,
    stickerMode: types.string,
  })
  .views((self) => ({
    get bosrBounds() {
      return self.boardBounds;
    }
  }))
  .actions((self) => {
    return {
      setBoardBounds(bounds: BoardBoundsType) {
        self.boardBounds = bounds;
      },
      setStickerMode(mode: stickermodeType) {
        self.stickerMode = mode;
      }
    }
  });
  



