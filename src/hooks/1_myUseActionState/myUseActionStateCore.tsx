import { useActionState } from "react";

const fakeApiCounter = async (prev: number) => {
  await new Promise<number>((resolve) => {
    setTimeout(resolve, 3000);
  });
  return prev + 1;
};

const MyUseActionStateCore = (params: any) => {
  const [count, setCount, isPending] = useActionState<number>(
    fakeApiCounter,
    0
  );
  return (
    <div>
     <form action={setCount}>
      <div>
        <h1>Count: {count}</h1>
        <button type="submit">Increment after 3 second</button>
        <h1> {isPending ? "Updating..." : "Idle"}</h1>
      </div>
    </form>
    </div>
  );
};

export default MyUseActionStateCore;
