import { useOptimistic, useState } from "react";

async function sendNumberReactionToServer(numberReact: number) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return numberReact;
}

const MyUseOptimistic = (params: any) => {
  const [likes, setLikes] = useState(0);
  const [mainState, setOptimisticState] = useOptimistic<number, number>(
    likes,
    (currentState, optimisticState) => currentState + optimisticState
  );

  const handleClick = async () => {
    setOptimisticState(2);
    const resultFromFakeApi = await sendNumberReactionToServer(2);
    setLikes((prev) => prev + resultFromFakeApi);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>❤️ Main Like: {mainState}</h1>
      <h1>❤️ Demo Like: {likes}</h1>
      <button onClick={handleClick}>+1 Like</button>
    </div>
  );
};

export default MyUseOptimistic;
