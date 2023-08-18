import { types, Instance } from 'mobx-state-tree';

type stickermodeType = 'none' | 'note' | 'emoji' | 'image' | 'draw';

export const BoardBoundsModel = types.model('BoardBounds', {
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
  scaleX: types.number,
  scaleY: types.number
});

export const SelectionAreaModel = types.model('SelectionArea', {
  isActive: types.boolean,
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number
});

type SelectionAreaType = Instance<typeof SelectionAreaModel>;
type BoardBoundsType = Instance<typeof BoardBoundsModel>;

export const initialState = {
  stickerMode: 'none',
  boardMode: 'select',
  boardBounds: {
    x: 0,
    y: 0,
    width: 4000,
    height: 2000,
    scaleX: 1,
    scaleY: 1
  },
  selectionArea: {
    isActive: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }
};

export const BoardModel = types
  .model("BoardStore", {
    boardMode: types.string,
    boardBounds: BoardBoundsModel,
    stickerMode: types.string,
    selectionArea: SelectionAreaModel
  })
  .views(() => ({
  }))
  .actions((self) => {
    return {
      toggleBoardMode() {
        if (self.boardMode === 'select') {
          self.boardMode = 'drag';
        } else {
          self.boardMode = 'select';
        }
      },
      setBoardMode(mode: 'drag' | 'select') {
        self.boardMode = mode;
      },
      setBoardBounds(bounds: BoardBoundsType) {
        self.boardBounds = bounds;
      },
      setStickerMode(mode: stickermodeType) {
        self.stickerMode = mode;
      },
      setSelectionArea(area: SelectionAreaType) {
        self.selectionArea = area;
      }
    }
  });
  



