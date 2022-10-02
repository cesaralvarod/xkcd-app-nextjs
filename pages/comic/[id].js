import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";

export default function Comic() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {}, []);

  return (
    <Layout>
      <h2 className="text-center font-bold text-[28px]">{id}</h2>
    </Layout>
  );
}
