export const client = async <T> 
(endPoint: string)
: Promise<T | undefined> => {
  const API = `https://www.swapi.tech/api/${endPoint}`;

  try {
    const response = await fetch(API, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("failed to fetch");

    const data: T = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); 
    } else {
      console.error("Unknown error"); 
    }
    return undefined;
  }
};
