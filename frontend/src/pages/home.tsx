import PlayerLoginForm from "../components/home/playerLoginForm.tsx";

const Home = () => {
  return (
    <div className={"flex flex-col h-3/4 justify-center gap-12"}>
      <h1 className={"text-6xl font-bold text-center"}>Checkmate</h1>
      <PlayerLoginForm />
    </div>
  );
};

export default Home;
