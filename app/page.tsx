import Auth from "./libs/session"
import BtnSignout from "./comp/BtnSignout"

const Home = async () => {
const user = await Auth()
console.log(user)
  return (
    <>
		<p>Kosong</p>
		<BtnSignout />
	</>
  );
}

export default Home