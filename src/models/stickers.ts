import { types, Instance, cast } from 'mobx-state-tree';
import { computedFn } from 'mobx-utils';

export const StickerModel = types.model('Sticker', {
  id: types.identifier,
  type: types.string,
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
  text: types.maybeNull(types.string),
  fill: types.maybeNull(types.string),
  base64: types.maybeNull(types.string)
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
    // get notes() {
    //   return Array.from(self.stickers.values())
    // },
    photosIds: computedFn(function getNotes() {
      return Array.from(self.stickers.values())
        .filter(sticker => sticker.type === 'photo')
        .map(sticker => sticker.id);
    }),
    notesIds: computedFn(function getNotes() {
      return Array.from(self.stickers.values())
        .filter(sticker => sticker.type === 'note')
        .map(sticker => sticker.id);
    }),
  }))
  .actions((self) => {
    return {
      addSticker(sticker: StickerType) {
        self.stickers.set(sticker.id, sticker);
      },
      updateStickerPosition(newAttrs: { id: string, x: number, y: number }) {
        const reference = self.stickers.get(newAttrs.id);

        if (reference) {
          self.stickers.put({
            ...reference,
            ...newAttrs
          });
        }
      },
      updateStickerText(newAttrs: { id: string, text: string }) {
        const reference = self.stickers.get(newAttrs.id);

        if (reference) {
          self.stickers.put({
            ...reference,
            ...newAttrs
          });
        }
      },
      updateStickersColor(stickers: SelectedStickerType[], color: string) {
        stickers.forEach((sticker) => {
          const reference = self.stickers.get(sticker.id);

          if (reference) {
            self.stickers.put({
              ...reference,
              fill: color
            });
          }
        })
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



