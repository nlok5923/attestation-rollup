import { RollupState, STF } from "@stackr/stackr-js/execution";
import { ethers } from "ethers";

export type ContentState = {
  operation: string
  proof: string
  updatedContent: string
  previousContent: string
  uuid: string
}

export type StateVariable = ContentState;

interface StateTransport {
  currentContentState: StateVariable;
}

export interface CounterActionInput {
  uuid: string;
    operation: string;
    proof: string;
    updatedContent: string;
    previousContent: string;}

export class ContentRollup extends RollupState<StateVariable, StateTransport> {
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
      [this.transport.currentContentState.operation,this.transport.currentContentState.operation,this.transport.currentContentState.operation,this.transport.currentContentState.operation]
    );
  }
}

export const counterSTF: STF<ContentRollup, CounterActionInput> = {
  identifier: "counterSTF",

  apply(inputs: CounterActionInput, state: ContentRollup): void {
    let newState = state.getState();
    state.transport.currentContentState = newState;
  },
};
