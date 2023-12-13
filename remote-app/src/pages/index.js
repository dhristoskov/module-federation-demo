import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("home/Home"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
const Home = HomePage;
Home.getInitialProps = HomePage.getInitialProps;
export default Home;
