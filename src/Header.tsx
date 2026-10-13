import type { Action } from "./types";

export default function Header({ count, sum, dispatch }: {count: number, sum: number, dispatch: (action: Action) => void }) {
    return (
        <>
            <div className="header">
                <span className="text">Магазин</span>
                <span className="text2">Корзина: {count} шт. {sum} руб.</span>
                <button className="button" onClick={() => dispatch({ type: "clear" })}>Отчистить</button>
            </div>
        </>
    );
}