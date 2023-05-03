import { Document, model, Schema } from "mongoose";

/**
 * Type to model the Profile Schema for TypeScript.
 * @param name:string
 * @param lastName:string
 * @param address:string
 * @param picture:buffer
 * @param username:string
 */
export type TProfile = {
  name: string;
  lastName: string;
  address: string;
  picture: Buffer;
  username: string;
};

/**
 * Mongoose Document based on TProfile for TypeScript.
 * https://mongoosejs.com/docs/documents.html
 *
 * TProfile
 * @param name:string
 * @param lastName:string
 * @param address:string
 * @param picture:buffer
 * @param username:string
 */
export interface IProfile extends TProfile, Document {}

const profileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  picture: {
    type: Buffer,
    // required: true
  },
  username: {
    type: String,
    unique: true
  },
});

/**
 * Mongoose Model based on TProfile for TypeScript.
 * https://mongoosejs.com/docs/models.html
 *
 * TProfile
 * @param name:string
 * @param lastName:string
 * @param address:string
 * @param picture:Buffer
 * @param username:string
 */
const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
