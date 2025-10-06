import { useActionState } from "react";

async function setCountAsync(prev: number) {
    await new Promise<void>(r => {
        setTimeout(r, 1000);
    })
    return prev + 1
}

const MyUseActionStateExample = (params: any) => {
    const [count, setCount, isPending] = useActionState<number>(setCountAsync, 0);

    return (
        // <div>
        //     <h1>Count: {count}</h1>
        //     <button onClick={() => setCount()} >Increment after 1 second</button>
        //     <h1> {isPending ? "Updating..." : "Increment"}</h1>
        // </div>
        /// Sử dụng cái này thì sẽ có loading pending 
        <form action={setCount}>
            <div>
                <h1>Count: {count}</h1>
                <button type="submit" >Increment after 1 second</button>
                <h1> {isPending ? "Updating..." : "Increment"}</h1>
            </div>
        </form>
    );
}


export default MyUseActionStateExample;
