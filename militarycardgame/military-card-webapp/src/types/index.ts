export interface MilitaryCard {
    id: number;
    rank: string;
    name: string;
    imageUrlFront: string;
    imageUrlBack: string;
}

export interface CardFlipEvent {
    isFlipped: boolean;
    flipCard: () => void;
}