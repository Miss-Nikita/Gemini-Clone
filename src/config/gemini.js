// // const apiKey = "AIzaSyDVEWdD5Jo-EkfVdQDYMauGKXdF3NxCB-Y";


// /*
//  * Install the Generative AI SDK
//  *
//  * $ npm install @google/generative-ai
//  *
//  * See the getting started guide for more information
//  * https://ai.google.dev/gemini-api/docs/get-started/node
//  */

// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } from "@google/generative-ai";
  
// //   const apiKey = process.env.GEMINI_API_KEY;
// const apiKey = "AIzaSyDVEWdD5Jo-EkfVdQDYMauGKXdF3NxCB-Y";
//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//   });
  
//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
//   };
  
//   async function run(prompt) {
//     const chatSession = model.startChat({
//       generationConfig,
//    // safetySettings: Adjust safety settings
//    // See https://ai.google.dev/gemini-api/docs/safety-settings
//       history: [
//       ],
//     });
  
//     const result = await  chatSession.sendMessage(prompt);
//     const response = result.response
//     console.log(result.response.text());
//   }
  
//   export default run();


import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Replace the API key with the appropriate method to fetch it from the environment or configuration
const apiKey = "AIzaSyDVEWdD5Jo-EkfVdQDYMauGKXdF3NxCB-Y";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
      const chatSession = model.startChat({
          generationConfig,
          // safetySettings: Adjust safety settings
          // See https://ai.google.dev/gemini-api/docs/safety-settings
          history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      const response = await result.response.text(); // Await the text response
      console.log(response);
      return response; // Return the response to be used by the caller
  } catch (error) {
      console.error("Error in run function:", error);
      throw error; // Rethrow the error to be handled by the caller
  }
}

export default run;
