"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/about/approach");
  }, []);
  return <div></div>;
};

export default Page;
