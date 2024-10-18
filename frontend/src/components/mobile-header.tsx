"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MobileHeader = React.memo(() => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <>
            <button
                type="button"
                aria-label="Toggle navigation menu"
                onClick={toggleMenu}
                className="p-4" // Removed unnecessary `h-full aspect-square` for better responsiveness
            >
                <Image
                    src={`/menu/${showMenu ? 'open' : 'closed'}.svg`}
                    alt="Menu"
                    width={24} // Add explicit width and height
                    height={24}
                />
            </button>

            {showMenu && (
                <nav className="bg-blue-950 p-4 rounded shadow"> {/* Added a nav element and styling */}
                    <ul className="flex flex-col gap-2"> {/* Improved structure with unordered list */}
                        <li>
                            <Link
                                href="/"
                                className="rounded-md bg-blue-950 px-4 py-2 text-blue-400 focus:text-blue-300 hover:text-blue-100 active:text-blue-200 font-bold font-mono outline outline-blue-900 hover:outline-blue-600"
                            >
                                akcje
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/wiadomosci"
                                className="rounded-md bg-blue-950 px-4 py-2 text-blue-400 focus:text-blue-300 hover:text-blue-100 active:text-blue-200 font-bold font-mono outline outline-blue-900 hover:outline-blue-600"
                            >
                                wiadomości
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/mapa"
                                className="rounded-md bg-blue-950 px-4 py-2 text-blue-400 focus:text-blue-300 hover:text-blue-100 active:text-blue-200 font-bold font-mono outline outline-blue-900 hover:outline-blue-600"
                            >
                                mapa
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/konto"
                                className="rounded-md bg-blue-950 px-4 py-2 text-blue-400 focus:text-blue-300 hover:text-blue-100 active:text-blue-200 font-bold font-mono outline outline-blue-900 hover:outline-blue-600"
                            >
                                konto
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
});

MobileHeader.displayName = "MobileHeader";
export {MobileHeader};