import { ActionSchema, FIFOStrategy, MicroRollup } from "@stackr/stackr-js";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { stackrConfig } from "../stackr.config";
import { CounterRollup, counterSTF } from "./state";
import { StateMachine } from "@stackr/stackr-js/execution";
import axios from "axios";

// this file is generated by the deployment script
import * as genesisState from "../genesis-state.json";

const rollup = async () => {
  const uri = ''
  const counterFsm = new StateMachine({
    state: new CounterRollup(genesisState.state),
    stf: counterSTF,
  });

  const actionSchemaType = {
    action: "String",
    contentBase64: "String"
  };

  const actionInput = new ActionSchema("edit-content", actionSchemaType);

  const buildStrategy = new FIFOStrategy();

  const { state, actions, events } = await MicroRollup({
    config: stackrConfig,
    useState: counterFsm,
    useAction: actionInput,
    useBuilder: { strategy: buildStrategy, autorun: true },
    useSyncer: { autorun: true },
  });

  // events.action.onEvent(ActionEvents.SUBMIT_ACTION, (action) => {
  //   console.log("action submitted", action);
  // });

  // events.batcher.onEvent(BatcherEvents.BATCH_ACTION, (batch) => {
  //   console.log("action batched", batch);
  // });

  // events.builder.onEvent(BuilderEvents.ORDER_BATCH, (batch) => {
  //   console.log("action batch ordered", batch);
  // });

  return { state, actions };
};

const app = express();
app.use(bodyParser.json());
const { actions, state } = await rollup();
type ContentState = {
  uuid: string,
  operation: string
  proof: string
  updatedContent: string
  previousContent: string
}
const contentState: ContentState[] = []

app.get("/", (req: Request, res: Response) => {
  res.send({ contentState : contentState });
});

app.get("/:content", () {

});

app.post("/", async (req: Request, res: Response) => {
  // const schema = actions.getSchema("update-counter");

  // if (!schema) {
  //   res.status(400).send({ message: "error" });
  //   return;
  // }

  // try {

  //   // pre-apply 
  //   // const whatusersent = req.body

  //   // whatusersent = {
      
  //   // }

  //   // whatappwantstosend = {
  //   //   x: whatusersent,
  //   //   y: kuch
  //   // }


  //   // const newAction = schema.newAction(req.body);
  //   //  const ack = await actions.submit(newAction);
    
  //   // post apply
  //   // listen to event 
    
    
  //    res.status(201).send({ ack });
  // } catch (e: any) {
  //   res.status(400).send({ error: e.message });
  // }
  const { operation } =  req.body
  if (operation == "capture")
    contentState.push(req.body)
   else{
    const stateAfterOperationWithGarbage = await axios (
      config: {
        method: 'post',
        url: 'http://localhost:3000/',
      },
      )
    
      contentState.push(stateAfterOperation)
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

// actionEventsEmitter.on(ActionEvents.SUBMIT_ACTION, (data) => {
//   console.log("submit_action - Event triggered : ", data.payload);
// });

// executorEventsEmitter.on(ExecutorEvents.EXECUTE_SINGLE, (data) => {
//   console.log("execute_single - Event triggered : ", data);
// });
