import { Signer } from "ethers";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface SignerContextType {
  signer: Signer | undefined;
  setSigner: React.Dispatch<React.SetStateAction<Signer | undefined>>;
}

const SignerContext = createContext<SignerContextType | undefined>(undefined);

export const SignerProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<Signer | undefined>(undefined);
  return (
    <SignerContext.Provider value={{ signer, setSigner }}>
      {children}
    </SignerContext.Provider>
  );
};

export const useSigner = (): SignerContextType => {
  const context = useContext(SignerContext);
  if (!context) {
    throw new Error("useSigner must be used within a SignerProvider");
  }
  return context;
};
