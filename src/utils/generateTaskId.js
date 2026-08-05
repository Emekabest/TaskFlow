
// Generates a unique ID for newly created tasks.
export const GenerateTaskId = () => {

  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};


export default GenerateTaskId;