import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import upload from "../../middleware/upload"
import auth from "../../middleware/auth";
import Profile, { TProfile, IProfile } from "../../models/Profiles";
import Request from "../../types/Request";
import fs from "fs/promises";


const router: Router = Router();

/**
 * Create or update user.
 *
 * @route POST /api/profile
 * @body {JSON} Including name, lastName, address, picture. And userId for updates.
 * @returns {JSON} New profile.
 * @throws {object} An error if data is missing.
 */
router.post(
  "/",
  [
    auth,
    upload.single("picture"),
  ],
  async (req: Request, res: Response) => {
    const { name, lastName, address } = req.body;
    const buffer = await fs.readFile(req.file?.path);

    // Build profile object based on TProfile
    const profileFields: TProfile = {
      name,
      lastName,
      address,
      picture: buffer,
      username: name+lastName,
    };

    try {
      let profile: IProfile = await Profile.findOne({ _id: req.body.userId });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { _id: req.body.userId },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.message.includes('Profile validation failed')) {
        res.status(HttpStatusCodes.BAD_REQUEST).send(err.message);
      } else {
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
      }
    }
  }
);

/**
 * Gets all profiles.
 *
 * @route GET /api/profile
 * @returns {JSON} All profiles.
 * @throws {object} An error if profiles are not found.
 */
router.get("/", auth,	async (_req: Request, res: Response) => {
		try {
			const profiles: IProfile[] = await Profile.find()
			res.json(profiles);
		} catch (err) {
			console.error(err.message);
			res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
		}
	}
);

/**
 * Deletes a profile.
 *
 * @route DELETE /api/profile
 * @body {JSON} With userId to delete.
 * @returns {JSON} A success message..
 * @throws {object} An error if profiles are not found.
 */
router.delete("/", auth, async (req: Request, res: Response) => {
  try {
    await Profile.findOneAndRemove({ user: req.userId });

    res.json({ msg: "Profile deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
