import { types, Instance, cast } from 'mobx-state-tree';
import { computedFn } from 'mobx-utils';

export enum FontOptions {
  bold = 'bold',
  italic = 'italic',
  underline = 'underline'
}

export const FontStyleModel = types.model('FontStyle', {
  bold: types.boolean,
  italic: types.boolean,
  underline: types.boolean,
});

export const StickerModel = types.model('Sticker', {
  id: types.identifier,
  type: types.string,
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
  text: types.maybeNull(types.string),
  fill: types.maybeNull(types.string),
  fontStyle: FontStyleModel,
  base64: types.maybeNull(types.string),
  path: types.maybeNull(types.string)
});

const SelectedStickerModel = types.model('SelectedStickerModel', {
  id: types.identifier,
  type: types.string,
  x: types.number,
  y: types.number,
});

const EditableStickerModel = types.model('EditableSticker', {
  id: types.identifier,
  x: types.number,
  y: types.number,
  text: types.string,
});

export type StickerType = Instance<typeof StickerModel>;
export type SelectedStickerType = Instance<typeof SelectedStickerModel>;
export type EditableStickerType = Instance<typeof EditableStickerModel>;

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
    stickersCoordinates: computedFn(function stickersCoordinates() {
      return Array.from(self.stickers.values())
        .map(sticker => ({
          type: sticker.type,
          id: sticker.id,
          x: sticker.x,
          y: sticker.y,
          width: sticker.width,
          height: sticker.height,
          rotation: 0
        }));
    }),
    photosIds: computedFn(function getPhotos() {
      return Array.from(self.stickers.values())
        .filter(sticker => sticker.type === 'photo')
        .map(sticker => sticker.id);
    }),
    notesIds: computedFn(function getNotes() {
      return Array.from(self.stickers.values())
        .filter(sticker => sticker.type === 'note')
        .map(sticker => sticker.id);
    }),
    drawsIds: computedFn(function getDraws() {
      return Array.from(self.stickers.values())
        .filter(sticker => sticker.type === 'draw')
        .map(sticker => sticker.id);
    }),
    seledctedStickerId: computedFn(function isSelectedUnderline() {
      return self.selectedStickers.map((i: SelectedStickerType) => {
        return i.id;
      })[0]
    }),
    isSelectedBold: computedFn(function isSelectedBold() {
      return self.selectedStickers.filter((i: SelectedStickerType) => {
        const sticker = self.stickers.get(i.id);

        if (sticker) {
          return !sticker.fontStyle.bold;
        }

        return false;
      }).length === 0;
    }),
    isSelectedItalic: computedFn(function isSelectedItalic() {
      return self.selectedStickers.filter((i: SelectedStickerType) => {
        const sticker = self.stickers.get(i.id);

        if (sticker) {
          return !sticker.fontStyle.italic;
        }

        return false;
      }).length === 0;
    }),
    isSelectedUnderline: computedFn(function isSelectedUnderline() {
      return self.selectedStickers.filter((i: SelectedStickerType) => {
        const sticker = self.stickers.get(i.id);

        if (sticker) {
          return !sticker.fontStyle.underline;
        }

        return false;
      }).length === 0;
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
      updateStickerSize(newAttrs: { id: string, width: number, height: number }) {
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
        });
      },
      updateStickersFontStyle(stickers: SelectedStickerType[], type: 'bold' | 'italic' | 'underline') {
        let apply: boolean;

        switch (type) {
          case 'bold':
            apply = self.isSelectedBold();
            break;
          case 'italic':
            apply = self.isSelectedItalic();
            break;
          case 'underline':
            apply = self.isSelectedUnderline();
            break;
          default:
            apply = false;
        }

        stickers.forEach((sticker) => {
          const reference = self.stickers.get(sticker.id);

          if (reference) {
            self.stickers.put({
              ...reference,
              fontStyle: {
                ...reference.fontStyle,
                [type]: !apply,
              }
            });
          }
        })
      },
      deleteStickers(stickers: SelectedStickerType[]) {
        stickers.forEach((sticker) => {
          self.stickers.delete(sticker.id);
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



