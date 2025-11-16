import { useActionState, useCallback, useState } from "react";

async function setCounterAsync(targetNumber: number) {
  await new Promise<void>((r) => {
    setTimeout(r, 2000);
  });
  return targetNumber * targetNumber;
}

const MyUseCallback = (params: any) => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [countAsync, setCountAsync] = useState<number | null>(null);

  const cachedFn = useCallback(async () => {
    const newNumber = Number.parseInt((Math.random() * 100).toString())
    setCount((prev) => newNumber);
    setLoading(true);
    const newCountAsync = await setCounterAsync(newNumber);
    setLoading(false);
    setCountAsync(newCountAsync);
  }, [count]);
   
  const handleClick = ()=>{
        const newNumber = Number.parseInt((Math.random() * 100).toString())
    setCount((prev) => newNumber);
  }
 
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
       
      <button onClick={handleClick} style={{ height: "50px", width: "200px" }}>
        Random Number
      </button>
      <button onClick={cachedFn} style={{ height: "50px", width: "200px" }}>
        Random Number and caculate count async
      </button>
      <h1>Count: {count}</h1>
      <h1>Count Async: {countAsync}</h1>
      <h1> {loading ? "Updating..." : "Stable"}</h1>
    </div>
  );
};

export default MyUseCallback;
