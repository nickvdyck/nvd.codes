import { AzureFunction, Context } from "@azure/functions"

import getCommentsForPost from "./getCommentsForPost"

const getSlug = (context: Context): string | undefined =>
  context.bindingData["slug"]

const notFound = (context: Context): void => {
  context.res = {
    status: 404,
    body: "Not Found",
  }
}

const jsonResult = <T>(context: Context, json: T): void => {
  context.res = {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  }
}

const getComments: AzureFunction = async function (context: Context) {
  context.log("HTTP trigger function processed a request.")
  const slug = getSlug(context)

  if (slug == null) {
    context.log.info("No slug found in bindingData, returning 404")
    return notFound(context)
  }

  const commentsForPost = await getCommentsForPost(slug)

  if (commentsForPost == null) {
    context.log.info(`No comments found on github with title ${slug}`)
    return notFound(context)
  }

  return jsonResult(context, commentsForPost)
}

export default getComments
