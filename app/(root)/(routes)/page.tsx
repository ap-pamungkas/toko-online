"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

const setUpPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    onOpen();
  }, [isOpen, onOpen]);

  return (
    <>
      <div className="p-4">Root page</div>
      <UserButton />
    </>
  );
};

export default setUpPage;