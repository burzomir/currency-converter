import Converter from "@/components/converter";

export default function Home() {
  return <Converter currencies={currencies} />;
}

const currencies = [
  { code: "EUR", name: "Euro" },
  { code: "USD", name: "US Dollar" },
];
