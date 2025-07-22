import PlayerLoginForm from "../components/home/playerLoginForm.tsx";

const Home = () => {
  return (
    <div className={"flex flex-col h-3/4 justify-center gap-15"}>
      <div className={"text-center"}>
        <h1 className={"text-6xl font-bold"}>Checkmate</h1>
        <p className={"text-gray-500 text-xl"}>A simple chess webapp.</p>
      </div>
      <PlayerLoginForm />
    </div>
  );
};

export default Home;
