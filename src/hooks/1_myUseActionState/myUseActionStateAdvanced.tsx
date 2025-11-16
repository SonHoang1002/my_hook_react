import { useActionState, useCallback, useState } from "react";

interface MyFormData {
  name: string;
  age: number;
  number: string;
}

const fakeApiValidateData = async (data: MyFormData) => {
  // demo execute validate data with server
  await new Promise<number>((resolve) => {
    setTimeout(resolve, 3000);
  });
  return data;
};

const MyUseActionStateAdvanced = (params: any) => {
  const [myFormDatas, setMyFormDatas] = useState<MyFormData[]>([]);

  const handleData = useCallback(async (
    prevState: MyFormData | null,
    formData: FormData
  ) => {
    const newMyFormData: MyFormData = {
      name: formData.get("name") as string,
      age: Number(formData.get("age")),
      number: formData.get("number") as string,
    };
    const result = await fakeApiValidateData(newMyFormData);
    setMyFormDatas((prev) => [...prev, result]);
    return result;
  },[]);

  const [count, submitForm, isPending] = useActionState(handleData, null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <form
        action={submitForm}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          alignItems: "center",
          width: "100%",
        }}
      >
        <input name="name" placeholder="Name" required />
        <input name="age" type="number" placeholder="Age" required />
        <input name="number" placeholder="Phone number" required />

        <button type="submit">
          {isPending ? "Processing..." : "Add to list"}
        </button>
      </form>

      <h2>Result</h2>
      <ul>
        {myFormDatas.map((item, i) => (
          <li key={i}>
            {item.name} | {item.age} | {item.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyUseActionStateAdvanced;
