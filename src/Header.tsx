import type { Action } from "./types";

export default function Header({ count, sum, onClear }: {count: number, sum: number, onClear: () => void }) {
    return (
        <>
            <div className="header">
                <span className="text">Магазин</span>
                <span className="text2">Корзина: {count} шт. {sum} руб.</span>
                <button className="button" onClick={() => onClear()}>Отчистить</button>
            </div>
        </>
    );
}