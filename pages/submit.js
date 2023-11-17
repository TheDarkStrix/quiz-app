import { useRouter } from "next/router";

export default function Submit() {
  const router = useRouter();

  const handleStartOver = () => {
    router.push("/");
  };

  return (
    <div>
      <div>the quiz is submitted</div>
      <button onClick={handleStartOver}>start again</button>
    </div>
  );
}
