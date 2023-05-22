import Link from "next/link";
import LogIn from "./LogIn";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import Logged from "./Logged";

const Nav: any = async (): Promise<JSX.Element> => {
    const session = await getServerSession(authOptions);
    //console.log(session)
    return (
        <nav className="flex justify-between items-center py-8">
            <Link href="/">
                <h1 className="font-bold text-lg">Chatpiece</h1>
            </Link>
            <ul className="flex items-center gap-6">
                {!session?.user && <LogIn />}
                {session?.user && session?.user?.image && <Logged image={session?.user?.image} />}
            </ul>
        </nav>
    );
}

export default Nav;
