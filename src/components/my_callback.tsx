import { useActionState, useCallback, useState } from "react";

async function setCountAsync(targetNumber: number) {
    await new Promise<void>(r => {
        setTimeout(r, 2000);
    })
    return targetNumber * targetNumber
}

const MyCallbackExample = (params: any) => {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<number | null>(null);

    const cachedFn = useCallback(async () => {
        setLoading(true);
        const data = await setCountAsync(count)
        setLoading(false);
        setResult(data)
    }, [count])

    const handleClick = () => {
        setCount(prev => prev + Math.random()*10000000)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" ,alignItems:"center", gap:"20px"}}>
            <h1>Count: {count}</h1>
            <button onClick={handleClick} style={{ height: "50px", width: "200px" }}>
                Increment
            </button>
            <button onClick={cachedFn} style={{ height: "50px", width: "200px" }}>
                Square after 2s
            </button>
            <h1>Result: {result}</h1>
            <h1> {loading ? "Updating" : "Stable"} Status</h1>
        </div>
    );
}

export default MyCallbackExample;



