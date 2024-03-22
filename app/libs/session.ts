import { authOptions } from "./auth"
import { getServerSession } from "next-auth"

const Auth = async () => {
    const Session = await getServerSession(authOptions);
    return Session?.user;
}

export default Auth;