import { helloWorld } from '../repositories/helloWorld';

export const helloService = {
  async getHelloWorld() {
    return helloWorld;
  },
};
