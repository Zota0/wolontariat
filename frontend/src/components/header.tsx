import React from "react";
import Link from "next/link";
import { MobileHeader } from "@&/mobile-header";

const Header = () => {
    
    return (
        <div className="h-full w-full center">
            <div className="hidden *:capitalize md:flex h-full w-[90%] items-center justify-center place-items-center align-middle object-center content-center">
                <div className="center w-full h-full gap-x-2">
                    <Link className="desk-nav-btn" href="/">akcje</Link>
                    <Link className="desk-nav-btn" href="/wiadomosci">wiadomości</Link>
                    <Link className="desk-nav-btn" href="/mapa">mapa</Link>
                    <Link className="desk-nav-btn" href="/konto">konto</Link>
                </div>
            </div>
            <div className="flex md:hidden h-full w-[95%] items-center justify-center place-items-center align-middle object-center content-center">
                <MobileHeader />
            </div>
        </div>
    );
}

const HeaderElement = React.memo(() => <Header/>);
HeaderElement.displayName = "Header";

export {HeaderElement};

