import { Web3Provider } from "@ethersproject/providers";

export const getProviderMock = () => {
  return {
    getSigner: jest.fn(),
    send: jest.fn(),
  } as unknown as Web3Provider;
};
