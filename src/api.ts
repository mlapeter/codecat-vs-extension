// @ts-nocheck

import 'isomorphic-fetch';

const environment = process.env.CODECAT_VSCODE_ENV || 'production';

const baseUrl = environment === 'development' ? 'http://localhost:5000' : 'https://codecat.ai';

export async function postCompletion(args) {
  const {url, textInput, codeInput, fastapiEndpoint, user, machineId, fileName} = args;

  console.log("postToCompletions", args);

  const extension = fileName.split('.').pop();
  console.log("extension", extension);

  const res = await fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user 
    },
    body: JSON.stringify({
      text_input: textInput,
      code_input: codeInput,
      fastapi_endpoint: fastapiEndpoint,
      machine_id: machineId,
      file_extension: extension
    })
  });

  return res;

}
