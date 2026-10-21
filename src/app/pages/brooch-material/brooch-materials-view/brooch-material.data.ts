export interface PackOption {
  weight: number;
  price: number;
}

export interface BroochFlower {
  id: number;
  name: string;
  color: string;
  image: string;
}

export const BROOCH_PACK_OPTIONS: PackOption[] = [
  { weight: 10, price: 25 },
  { weight: 30, price: 65 },
  { weight: 50, price: 110 },
  { weight: 100, price: 220 },
  { weight: 250, price: 425 },
  { weight: 500, price: 680 },
];

export const BROOCH_FLOWERS: BroochFlower[] = [
  { id: 1, name: 'Brooch Flower (Rani Pink)', color: 'Rani Pink', image: '1. Rani pink.jpg' },
  { id: 2, name: 'Brooch Flower (White)', color: 'White', image: '2. white.jpg' },
  { id: 3, name: 'Brooch Flower (Lt.Purple)', color: 'Lt.Purple', image: '3. Lt.Purple.jpg' },
  { id: 4, name: 'Brooch Flower (Lt.Green)', color: 'Lt.Green', image: '4. Lt.green.jpg' },
  { id: 5, name: 'Brooch Flower (Multicolour)', color: 'Multicolour', image: '5. Multicolour.jpg' },
  { id: 6, name: 'Brooch Flower (Sky Blue)', color: 'Sky Blue', image: '6. Sky Blue.jpg' },
  { id: 7, name: 'Brooch Flower (Lt.Pink)', color: 'Lt.Pink', image: '7. Lt.Pink.jpg' },
  { id: 8, name: 'Brooch Flower (Purple)', color: 'Purple', image: '8. Purple.jpg' },
  { id: 9, name: 'Brooch Flower (Sky Blue)', color: 'Sky Blue', image: '9. Sky Blue.jpg' },
  { id: 10, name: 'Brooch Flower (Peach)', color: 'Peach', image: '10. Peach.jpg' },
  { id: 11, name: 'Brooch Flower (Yellow)', color: 'Yellow', image: '11. Yellow.jpg' },
  { id: 12, name: 'Brooch Flower (Lt.green)', color: 'Lt.green', image: '12. Lt.green.jpg' },
];

export const BROOCH_FLOWER_IMAGE_BASE = 'assets/brooch-material/brooch-flower/';
