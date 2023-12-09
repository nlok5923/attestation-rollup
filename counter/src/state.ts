import { RollupState, STF } from "@stackr/stackr-js/execution";
import { ethers } from "ethers";

export type ContentState = {
  operation: string
  proof: string
  updatedContent: string
  previousContent: string
}

export type StateVariable = ContentState;

interface StateTransport {
  currentContentState: StateVariable;
}

export interface CounterActionInput {
  action: "capture" | "invert";
  contentBase64: string;
}

export class CounterRollup extends RollupState<StateVariable, StateTransport> {
  constructor(count: StateVariable) {
    super(count);
  }

  createTransport(state: StateVariable): StateTransport {
    return { currentContentState: state };
  }

  getState(): StateVariable {
    return this.transport.currentContentState;
  }

  calculateRoot(): ethers.BytesLike {
    return ethers.solidityPackedKeccak256(
      ["string", "string", "string", "string"],
      [this.transport.currentContentState]
    );
  }
}

export const counterSTF: STF<CounterRollup, CounterActionInput> = {
  identifier: "counterSTF",

  apply(inputs: CounterActionInput, state: CounterRollup): void {
    let newState = state.getState();
    // if (inputs.type === "increment") {
    //   newState += 1;
    // } else if (inputs.type === "decrement") {
    //   throw new Error("Not implemented");
    // }
    state.transport.currentContentState = newState;
  },
};
