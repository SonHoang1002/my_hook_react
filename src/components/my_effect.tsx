import { disconnect } from "process";
import { useCallback, useEffect, useState } from "react";

type MyPosition = {
  left: number;
  top: number;
};
function MyEffectExample(params: any) {
  const [position, setPosition] = useState<MyPosition>({
    left: 0,
    top: 0,
  });

  // call once when init component
  // should return clean-up function after call
  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setPosition({
        top: event.clientY,
        left: event.clientX,
      });
    };
    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <div
      style={{ 
        top: -20,
        left: -20,
        transform: `translate(${position.left}px, ${position.top}px`,
        height: 40,
        width: 40,
        background:"red",
        pointerEvents: 'none',
      }}
    /> 
    // <div
    //   style={{
    //     position: "absolute",
    //     backgroundColor: "pink",
    //     borderRadius: "50%",
    //     opacity: 0.6,
    //     transform: `translate(${position.left}px, ${position.top}px)`,
    //     pointerEvents: "none",
    //     left: -20,
    //     top: -20,
    //     width: 40,
    //     height: 40,
    //   }} 
  );
}

export default MyEffectExample;

// function MyEffectExample(params: any) {
//   const [id, setId] = useState(Math.random() * 10000);

//   // call once when init component
//   // should return clean-up function after call
//   useEffect(() => {
//     console.log("call once when init component");
//     const connect = createConnection(id);
//     connect.connect();
//     return () => {
//       connect.disconnect();
//     };
//   }, []);

//   // call when depends change
//   useEffect(() => {
//     console.log("call when depends change");
//   }, [id]);

//   // call every component re-render
//   useEffect(() => {
//     console.log("call every component re-render");
//   });

//   const _handleChangeId = () => {
//     setId((prev) => Math.random() * 10000);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         height: "100vh",
//         width: "100vw",
//       }}
//     >
//       <div>
//         <h1>{id}</h1>
//         <button onClick={_handleChangeId}> Change Id </button>
//       </div>
//     </div>
//   );
// }

// function createConnection(id: number) {
//   return {
//     connect: () => {
//       console.log("✅ Connecting to id = " + id + "...");
//     },
//     disconnect: () => {
//       console.log("❌ Disconnect to id = " + id + "...");
//     },
//   };
// }
// export default MyEffectExample;
