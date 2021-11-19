import parser from "node-html-parser"
import fetch from "node-fetch"

const userAgent = "Gatsby worker ()"

export async function getAnilist() {
  const response = await fetch("https://graphql.anilist.co/", {
    method: "POST",
    headers: {
      "User-Agent": userAgent,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query UserQuery {
          user: User(name: "thebluechalk") {
            statistics {
              anime {
                count
              }
            }
          }
        }
      `,
    }),
  })
  const { data } = await response.json()
  return data
}
