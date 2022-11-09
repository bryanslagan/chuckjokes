import { useEffect } from "react";
import '../styles/_globals.scss';

export function PopupMenu({children, isOpen}) {

    return (
        <div className={`popup-menu${isOpen ? ' open' : ''}`}>
            {children}
        </div>
    );
}

export function PopupMenuItem({children, onClick}){
    return (
        <div onClick={onClick} className='popup-menu-item'>{children}</div>
    )
}