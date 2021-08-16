import { MongoClient, ObjectID } from "mongodb";
import {
  Comment,
  DeleteCommentByIdParams,
  GetCommentByIdParams,
  GetCommentsByPostIdParams,
  PatchCommentByIdBody,
  PatchCommentByIdParams,
  PostComment,
} from "../../../common/types";

export default class Comments {
  constructor(private client: MongoClient) {}

  public collection() {
    return this.client.db("comments").collection<Comment>("comments");
  }

  public create = async (commentToAdd: PostComment) => {
    const { _id, ...newComment } = this.generateComment(commentToAdd);
    const data = await this.collection().insertOne({ _id, ...newComment });

    return data.ops[0];
  };

  public getById = async (commentId: GetCommentByIdParams["commentId"]) => {
    const comment = await this.collection().findOne({ _id: commentId });
    if (comment == null) throw { msg: "not found" };
    return comment;
  };

  public getByPostId = async (postId: GetCommentsByPostIdParams["postId"]) => {
    return await this.collection().find({ postId: postId }).toArray();
  };

  public editById = async (
    commentId: PatchCommentByIdParams["commentId"],
    { text }: PatchCommentByIdBody
  ) => {
    await this.collection().updateOne(
      { _id: commentId },
      { $set: { text: text, modifiedOn: Date.now() } }
    );

    const comment = await this.collection().findOne({ _id: commentId });
    if (comment === null) throw { msg: "not found" };
    return comment;
  };

  removeById = async (commentId: DeleteCommentByIdParams["commentId"]) => {
    const { deletedCount } = await this.collection().deleteOne({
      _id: commentId,
    });
    if (deletedCount === 0) throw { msg: "not found" };
    return deletedCount;
  };

  private generateComment(comment: PostComment) {
    const newComment: Comment = {
      ...comment,
      _id: new ObjectID().toString(),
      createdOn: Date.now(),
      modifiedOn: Date.now(),
    };
    return newComment;
  }
}
