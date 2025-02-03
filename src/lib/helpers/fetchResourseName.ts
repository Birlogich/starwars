import { client } from "../../api/client";

export const fetchResourceName = async (url: string) => {
  const id = url.split("/").filter(Boolean).pop();  
  const resourceType = url.split("/")[4];  
  const shortUrl = `/${resourceType}/${id}`; 

  const data = await client<{ name?: string, title?: string }>(`${resourceType}/${id}`);

  return { name: data?.name || "Unknown", title: data?.title || "Unknown", url: shortUrl };
};