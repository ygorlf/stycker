import { types, Instance, cast } from 'mobx-state-tree';

export const StickerModel = types.model('Sticker', {
  id: types.identifier,
  type: types.string,
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
  text: types.string,
  fill: types.string,
});

const SelectedStickerModel = types.model('SelectedStickerModel', {
  type: types.string,
  id: types.string,
  x: types.number,
  y: types.number,
});

const EditableStickerModel = types.model('EditableSticker', {
  id: types.string,
  x: types.number,
  y: types.number,
  text: types.string,
});

type StickerType = Instance<typeof StickerModel>;
type SelectedStickerType = Instance<typeof SelectedStickerModel>;
type EditableStickerType = Instance<typeof EditableStickerModel>

export const initialState = {
  editableSticker: {
    id: '',
    x: 0,
    y: 0,
    text: ''
  },
  selectedStickers: [],
  stickers: {}
};

export const StickersModel = types
  .model('StickersStore', {
    editableSticker: EditableStickerModel,
    selectedStickers: types.array(SelectedStickerModel),
    stickers: types.map(StickerModel)
  })
  .views((self) => ({
    get notes() {
      return Array.from(self.stickers.values())
    },
    get ids() {
      return Array.from(self.stickers.keys());
    }
  }))
  .actions((self) => {
    return {
      addSticker(sticker: StickerType) {
        self.stickers.set(sticker.id, sticker);
      },
      updateStickerPosition(newAttrs: { id: string, x: number, y: number}) {
        const reference = self.stickers.get(newAttrs.id);

        if (reference) {
          self.stickers.put({
            ...reference,
            ...newAttrs
          });
        }
      },
      updateStickerText(newAttrs: { id: string, text: string}) {
        const reference = self.stickers.get(newAttrs.id);

        if (reference) {
          self.stickers.put({
            ...reference,
            ...newAttrs
          });
        }
      },
      updateSelectedStickers(selectedStickers: SelectedStickerType[]) {
        self.selectedStickers = cast(selectedStickers);
      },
      setEditableSticker(editableSticker: EditableStickerType) {
        self.editableSticker = editableSticker;
      }
    }
  });
  

// export const StickersStore = StickersModel.create({
//   ...initialState,
// }, { maxHistoryLength: 50 });



