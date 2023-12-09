import { RollupState, STF } from "@stackr/stackr-js/execution";
import { ethers } from "ethers";

export type ContentState = {
  uuid: string
  updatedContent: string
  previousContent: string
  proof: string
  operation: string
}

export type StateVariable = ContentState;

interface StateTransport {
  currentContentState: StateVariable;
}

export interface ContentActionInput {
  uuid: string
  updatedContent: string
  previousContent: string
  proof: string
  operation: string
}

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

export const counterSTF: STF<ContentRollup, ContentActionInput> = {
  identifier: "counterSTF",

  apply(inputs: ContentActionInput, state: ContentRollup): void {
    let newState = state.getState();
    state.transport.currentContentState = newState;
  },
};
