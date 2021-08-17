import { MongoClient, ObjectID } from "mongodb";
import {
  Comment,
  DeleteCommentById,
  GetCommentById,
  GetCommentsByPostId,
  PatchCommentById,
  PostComment,
} from "../../../common/apiSchemas/comments";
import { Body, Params } from "../../../common/apiSchemas/utils";

const DB_NAME = process.env.DB_NAME ?? "ts-comments";

export default class Comments {
  constructor(private client: MongoClient) {}

  public collection() {
    return this.client.db(DB_NAME).collection<Comment>("comments");
  }

  public create = async (commentToAdd: Body<PostComment>) => {
    const { _id, ...newComment } = this.generateComment(commentToAdd);
    const data = await this.collection().insertOne({ _id, ...newComment });
    return data.ops[0];
  };

  public getById = async (commentId: Params<GetCommentById>["commentId"]) => {
    const comment = await this.collection().findOne({ _id: commentId });
    if (comment == null) throw { msg: "not found" };
    return comment;
  };

  public getByPostId = async (
    postId: Params<GetCommentsByPostId>["postId"]
  ) => {
    return await this.collection()
      .find({ postId: parseInt(postId) })
      .toArray();
  };

  public editById = async (
    commentId: Params<PatchCommentById>["commentId"],
    { text }: Body<PatchCommentById>
  ) => {
    await this.collection().updateOne(
      { _id: commentId },
      { $set: { text: text, modifiedOn: Date.now() } }
    );

    const comment = await this.collection().findOne({ _id: commentId });
    if (comment === null) throw { msg: "not found" };
    return comment;
  };

  removeById = async (commentId: Params<DeleteCommentById>["commentId"]) => {
    const { deletedCount } = await this.collection().deleteOne({
      _id: commentId,
    });
    if (deletedCount === 0) throw { msg: "not found" };
    return deletedCount;
  };

  private generateComment(comment: Body<PostComment>) {
    const newComment: Comment = {
      ...comment,
      _id: new ObjectID().toString(),
      createdOn: Date.now(),
      modifiedOn: Date.now(),
    };
    return newComment;
  }
}
