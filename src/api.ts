// @ts-nocheck

import 'isomorphic-fetch';



export async function postCompletion(args) {
  const {url, textInput, codeInput, fastapiEndpoint, user, machineId} = args;

  console.log("postToCompletions", args);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user 
    },
    body: JSON.stringify({
      text_input: textInput,
      code_input: codeInput,
      fastapi_endpoint: fastapiEndpoint,
      machine_id: machineId
    })
  });

  return res;

}