import React from "react";

interface User {
    ID: number;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string; 
    PHONE: string;
}

interface Res {
    msg: string;
    data: any|any[]|null|undefined|never|unknown;
    status: number;
}

export default async function Home() {
    async function GetUsers() {
        "use server";
        try {
            const response = await fetch('http://127.0.0.1:6866/get-users', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
                next: {
                    revalidate: 1080
                }
            });
            if(!response.ok || response == null || response == undefined) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if(!data || data == "") {
                throw new Error('No data received');
            }
            return data;
        } catch(e: unknown) {
            console.log("Error at: `GetUsers()`: ", e);
            return null;
        }
    }

    async function List() {
        "use server";
        const data: Res = await GetUsers();
        const users: User[]|null = data.data as User[] ?? null;
        if(!users) {
            return (
                <div className="text-center text-3xl">
                    No users found
                </div>
            )
        }
        return (
            <div>
                <ul>
                    {
                        users.map((user: User, index: number) => (
                            <li key={index}>
                                {user.FIRST_NAME} - {user.LAST_NAME} - {user.EMAIL} - {user.PHONE} - {user.ID}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

    const ListMemo = React.memo(() => <List/>);
    ListMemo.displayName = "List_memoized";

    return (
        <div className="center text-center text-3xl">
            {/* <ListMemo /> */}
        </div>
    );
}
