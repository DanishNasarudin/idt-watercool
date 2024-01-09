"use server";

type Watercool = {
  title: string;
  imageUrls: string[];
  content: string;
};

type WatercoolsResponse = {
  data: {
    bulkImages: {
      nodes: Watercool[];
    };
  };
};

async function fetchWatercool() {
  const response = await fetch(`https://idealtech.com.my/graphql`, {
    method: "POST",
    body: JSON.stringify({
      query: `
        query Watercool {
          bulkImages(first:50) {
            nodes {
              title
              content
              imageUrls
            }
          }
        }`,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  const responseData: WatercoolsResponse = await response.json();
  // console.log(responseData.data.bulkImages.nodes, "check json");
  return responseData.data.bulkImages.nodes;
}

export default fetchWatercool;
