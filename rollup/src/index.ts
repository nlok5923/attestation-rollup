import { ActionSchema, FIFOStrategy, MicroRollup } from "@stackr/stackr-js";
import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { stackrConfig } from "../stackr.config";
import { ContentRollup, counterSTF } from "./state";
import { StateMachine } from "@stackr/stackr-js/execution";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ethers } from "ethers";
import cors from 'cors'

// this file is generated by the deployment script
import * as genesisState from "../genesis-state.json";
// import ts from "typescript";

const BASE_URL = 'http://127.0.0.1:8081';
const BASE_URL_PP_PROVER = 'http://127.0.0.1:8000';
const INPUT_UPLOAD_URL_ROUTE = '/inputs/upload';
const INPUTS_ROUTE = '/inputs';
const SESSION_CREATE_ROUTE = '/sessions/create';
const SNARK_STATUS_ROUTE = '/snark/status';

const axiosInstance = axios.create({
  baseURL: BASE_URL_PP_PROVER
});

const removeLeadingTrailingZeros = (arr: Array<number>) => {
  // Find the index of the first non-zero element from the start
  const startIndex = arr.findIndex((num) => num !== 0);

  // If all elements are zero, return an empty array
  if (startIndex === -1) {
    return [];
  }

  // Find the index of the first non-zero element from the end
  const endIndex = arr.reverse().findIndex((num) => num !== 0);

  // Reverse the array back
  arr.reverse();

  // Remove leading and trailing zeros
  return arr.slice(startIndex, arr.length - endIndex);
}

const filterBase64Noise = (base64String: string) => {
  // Find the starting index of the correct string "iVBOR"
  let startIndex = base64String.indexOf('iVBOR');

  // If "iVBOR" is not found, return the original string or handle as error
  if (startIndex === -1) {
      console.error('Correct starting sequence not found in string');
      return base64String; // or you can return an error or handle it as needed
  }

  // Return the string from "iVBOR" to the end
  return base64String.substring(startIndex);
}

const actionSchemaType = {
  uuid: "String",
  operation: "String",
  proof: "String",
  updatedContent: "String",
  previousContent: "String"
};
const actionInput = new ActionSchema("edit-content", actionSchemaType);

const INVERT_IMAGE_ID = '6c6378ba638b93e228dc7db5bb91fcbb118050a058304f0880ccdfd27ba51c19'
const DEC_BRIGHTNESS_ID = 'e80999f86f74a43f3700361da0a2fd99f497577ca200dda5a22be4cd0fb6b18c';
const FLIP_IMAGE_ID = 'cde63a1ccc3186c347524f50791599f3096703efab3a73095ccdefde87c0ca47';
const INC_BRIGHTNESS_ID = 'a40cc81871def88d866f557d661fe1bd2bf33d8444c7eee8536f7a9fddb0c20f';

const rollup = async () => {
  const uri = ''
  const counterFsm = new StateMachine({
    state: new ContentRollup(genesisState.state),
    stf: counterSTF,
  });
  
  const buildStrategy = new FIFOStrategy();

  const { state, actions, events } = await MicroRollup({
    config: stackrConfig,
    useState: counterFsm,
    useAction: actionInput,
    useBuilder: { strategy: buildStrategy, autorun: true },
    useSyncer: { autorun: true },
  });

  return { state, actions };
};

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

const { actions, state } = await rollup();

type ContentState = {
  uuid: string,
  operation: string
  proof: string
  updatedContent: string
  previousContent: string
}

const contentState: ContentState[] = []

const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get("/", (req: Request, res: Response) => {
  res.send({ contentState });
});

const getData = async (data: any) => {
  const wallet = ethers.Wallet.createRandom();

  const actionSchemaType = {
    uuid: "String",
    updatedContent: "String",
    previousContent: "String",
    proof: "String",
    operation: "String",
  };

  // console.log("actionInput", actionInput);
  // console.log("data", data)
  // console.log("types", actionInput.EIP712TypedData.types);  
  
  const sign = await wallet.signTypedData(
    stackrConfig.domain,
    actionInput.EIP712TypedData.types,
    data
  );

  const payload = JSON.stringify({
    msgSender: wallet.address,
    signature: sign,
    payload: data,
  });

  // console.log(payload);

  return payload;
};

app.post("/", async (req: Request, res: Response) => {

  console.log('got your request here');
  const { operation, uuid, previousContent, updatedContent, proof } = req.body;

  let newState: ContentState;

  if(uuid) {

    // let imageId = "";

    // if(operation === 'invert') {
    //   imageId = INVERT_IMAGE_ID;
    // } else if (operation === 'flip') {
    //   imageId = FLIP_IMAGE_ID;
    // } else if (operation === 'decrease_brightness') {
    //   imageId = DEC_BRIGHTNESS_ID;
    // } else if (operation === 'increase_brightness') {
    //   imageId = INC_BRIGHTNESS_ID;
    // }

    // const inputUploadResponse = await axiosInstance.get(INPUT_UPLOAD_URL_ROUTE)
    // const inputUUID = inputUploadResponse.data.uuid;

    // // console.log("here-1");
    
    // let config = {
    //   method: 'put',
    //   maxBodyLength: Infinity,
    //   url: `${BASE_URL}/inputs/${inputUUID}`,
    //   headers: { 
    //     'Content-Type': 'text/plain'
    //   },
    //   data : previousContent
    // };
  
    // // console.log("here0");
    // // console.log("Previous content", previousContent);
    
    // const submitInputResponse = await axiosInstance.request(config);
  
    // let snarkCreationData = JSON.stringify({
    //   "img": imageId,
    //   "input": inputUUID
    // });
    
    // config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: `${BASE_URL}/sessions/create`,
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data: snarkCreationData
    // };
    // // console.log("here2");
    
    // const snarkCreationResponse = await axiosInstance.request(config);
    // const snarkCreationSessionId = snarkCreationResponse.data.uuid;
    
    // await sleep(4000); // waiting for 4 seconds
  
    // config = {
    //   method: 'get',
    //   maxBodyLength: Infinity,
    //   url: `${BASE_URL}/snark/status/${snarkCreationSessionId}`,
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data: ''
    // };
    
    // let snarkStatusResponse;
    // let attempts = 0;
    // const maxAttempts = 10; // Maximum number of attempts
    // const retryDelay = 2000; // Delay between retries in milliseconds (2 seconds)
    // let snarkStatusJournal
    
    // while (!snarkStatusResponse?.data.output && attempts < maxAttempts) {
    //     try {
    //         snarkStatusResponse = await axiosInstance.request(config);
    //         if (snarkStatusResponse.data.output) {
    //             // If the response is valid, break out of the loop
    //             break;
    //         }
    //     } catch (error) {
    //       // @ts-ignore
    //         console.error("Error on request: ", error.message);
    //         attempts++;
    //         if (attempts < maxAttempts) {
    //             console.log(`Retrying... Attempt ${attempts}/${maxAttempts}`);
    //             await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait for retryDelay milliseconds
    //         }
    //     }
    // }

    // console.log({ snarkStatusResponse})
    // if (!snarkStatusResponse) {
    //     console.error("Failed to get a valid response after maximum attempts");
    // } else {
    //     snarkStatusJournal = snarkStatusResponse.data.output.journal;
    //     // Process the snarkStatusJournal as needed
    // }
  
    // const updatedJournal = removeLeadingTrailingZeros(snarkStatusJournal);
    // // decode the journal here
  
    // const journal = new Uint8Array(updatedJournal);
    
    // const decoder = new TextDecoder();
    
    // const base64 = decoder.decode(journal);
  
    // // console.log("Base64", base64);
  
    // const filteredBase64 = filterBase64Noise(base64);
    // console.log("Filtered base64", filteredBase64);

    const transformationConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${BASE_URL_PP_PROVER}/task`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: {
        "operation": operation,
        "image": previousContent
      }
    };

    const resp = await axiosInstance.request(transformationConfig);
    // @ts-ignore
    const contentStates = contentState.filter(content => content.uuid === uuid);

    console.log("Content states", contentStates);
    // @ts-ignore
    const currentContentState = contentStates[contentStates.length - 1];

    console.log("Current content state", currentContentState)

    contentState.push({
      uuid,
      updatedContent: resp.data.transformed_img,
      previousContent: currentContentState.updatedContent,
      proof: '', // return proof as well
      operation: operation
    })
    newState = {
      uuid,
      updatedContent: resp.data.transformed_img,
      previousContent: currentContentState.updatedContent,
      proof: '',
      operation: operation
    };
  } else {
    let newUUID = uuidv4();

    contentState.push({
      uuid: newUUID,
      updatedContent,
      previousContent,
      proof: '',
      operation: 'capture'
    })

    newState = {
      uuid: newUUID,
      updatedContent,
      previousContent,
      proof: "",
      operation: 'capture'
    }
  };

  const schema = actions.getSchema("edit-content");

  if (!schema) {
    res.status(400).send({ message: "error" });
    return;
  }
  console.log('New UUID', newState.uuid);
  console.log('Content uuids', contentState.map(content => console.log(uuid)))

  const payload = await getData(newState);

  // console.log("This is payload", payload);
  // @ts-ignore
  const newAction = schema.newAction(JSON.parse(payload));

  const ack = await actions.submit(newAction);

  res.status(201).send({
    ...ack,
    uuid: newState.uuid,
    updatedContent: newState.updatedContent,
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});