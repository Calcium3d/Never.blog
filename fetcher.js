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
var factory = new ElementFactory(DomIndexProviders.Simple);

// ToStream is an extension method to convert a string to UTF8 stream

using (var stream = html.ToStream())
{
    var document = factory.Parse(stream, Encoding.UTF8);
    CsqueryDocument_Simple = CQ.Create(document);
}
