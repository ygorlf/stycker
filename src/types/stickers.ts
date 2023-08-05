export interface StickerProps {
  type: 'note' | 'sticker' | 'emoji';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}