import express from 'express';
import { Content, Link, Tag, validateContent } from '../db';
import { AuthenticatedRequest, authenticateJwt } from '../middleware/user';
import { randomHashString } from '../utils';
import mongoose from 'mongoose';

export const contentRouter = express.Router();

// CREATE CONTENT
contentRouter.post(
  '/',
  authenticateJwt,
  async (req: AuthenticatedRequest, res) => {
    const { type, link, title, tags = [] } = req.body;

    try {
      if (!type || !link || !title) {
        res.status(411).json({ message: 'Error in inputs' });
      }

      validateContent({ type, link, title });

      let tagIds = [];
      for (const tagTitle of tags) {
        let tag = await Tag.findOne({ title: tagTitle });

        if (!tag) {
          tag = new Tag({ title: tagTitle });
          await tag.save();
        }

        tagIds.push(tag._id);
      }

      const createdContent = new Content({
        type,
        link,
        title,
        tags: tagIds,
        userId: req.userId,
      });

      await createdContent.save();
      res.status(200).json({
        message: 'Content Created Successfully!',
        content: createdContent,
      });
    } catch (error) {
      console.error('Error creating content', error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// READ ALL CONTENT
contentRouter.get('/', authenticateJwt, async (req, res) => {
  try {
    const allContent = await Content.find({}).populate('tags', 'title');
    res.status(200).json({ content: allContent });
  } catch (error) {
    console.error('Error fetching all the content', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// READ CONTENT BY USER id
contentRouter.get('/:id', authenticateJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const contentCreatedByUser = await Content.find({ userId: id })
      .populate('userId', 'username')
      .populate('tags', 'title');
    res.status(200).json({ content: contentCreatedByUser });
  } catch (error) {
    console.error('Error fetching content by userId', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// DELET A CONTENT
contentRouter.delete('/', authenticateJwt, async (req, res) => {
  const { contentId, userId } = req.body;
  try {
    const contentToBeDeleted = await Content.findById(contentId);
    if (!contentToBeDeleted || userId !== contentId.userId) {
      res.status(403).json({});
      return;
    }
  } catch (error) {
    console.error('Error deleting a content', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// CREATE A SHAREABLE LINK
contentRouter.post(
  '/share',
  authenticateJwt,
  async (req: AuthenticatedRequest, res) => {
    const { share } = req.body;
    try {
      if (share) {
        const linkExists = await Link.findOne({ userId: req.userId });
        if (linkExists) {
          res.status(200).json({
            message: 'Link already exists!',
            link: `/content/share/${linkExists.hash}`,
          });
          return;
        }
        const newLink = new Link({
          userId: req.userId,
          hash: randomHashString(10),
        });
        await newLink.save();
        res.status(200).json({
          message: 'Updated shareable link!',
          link: `/content/share/${newLink.hash}`,
        });
      } else {
        await Link.deleteOne({ userId: req.userId });
        res.status(200).json({ message: 'Removed shareable link!' });
      }
    } catch (error) {
      console.error('Error sharing the content', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }
);

// READ SHAREABLE LINK
contentRouter.get('/share/:shareLink', async (req, res) => {
  const { shareLink } = req.params;
  try {
    const linkFound = await Link.findOne({ hash: shareLink }).populate<{
      userId: {
        username: string;
      };
    }>('userId', 'username');

    if (!linkFound) {
      res.status(411).json({
        message: 'Sorry incorrect input!',
      });
      return;
    }

    const content = await Content.find({ userId: linkFound.userId }).populate(
      'tags',
      'title'
    );

    res.status(200).json({ content, username: linkFound.userId?.username });
  } catch (error) {
    console.error('Error retrieving the shareable content', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});
