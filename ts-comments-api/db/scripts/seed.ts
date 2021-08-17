import { ObjectId } from "mongodb";
import { Comment } from "../../../common/apiSchemas/comments";
import "../../env/env";
import { client, collections } from "../db";

const NODE_ENV = process.env.NODE_ENV ?? "development";

export const seed = async () => {
  console.log(`Connecting to ${NODE_ENV} database`);
  await client.connect();
  console.log("Seeding database");

  const firstComment: Comment = {
    _id: new ObjectId().toString(),
    postId: 1,
    author: "barry",
    text: "this post is great",
    createdOn: 1627285881983,
    modifiedOn: 1627285881983,
  };
  const secondComment = {
    _id: new ObjectId().toString(),
    postId: 1,
    author: "charlie",
    text: "such wow, great post",
    createdOn: 1627285882000,
    modifiedOn: 1627285882000,
  };

  const firstComments = await collections.comments
    .collection()
    .insertMany([firstComment, secondComment])
    .then(({ ops: comments }) => comments);

  const commentId = firstComments[0]._id;

  const thirdComment: Comment = {
    _id: new ObjectId().toString(),
    postId: 1,
    author: "charlie",
    replyToId: commentId,
    text: "great comment barry!",
    createdOn: 1627287982588,
    modifiedOn: 1627287982588,
  };

  await collections.comments.collection().insertOne(thirdComment);
  await client.close();
};

seed().then(() => process.exit());
