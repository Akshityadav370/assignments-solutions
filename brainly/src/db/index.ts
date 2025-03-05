import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database', error);
    process.exit(1);
  }
};

const Schema = mongoose.Schema;
const ObjectId = new mongoose.Types.ObjectId();

const contentTypes = ['image', 'video', 'article', 'audio'] as const;

// Zod Validations Start
const userSchemaZod = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Username at most can be 10 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(20),
});

const contentSchemeZod = z.object({
  type: z.enum(contentTypes),
  link: z.string().url('Invalid URL'),
  title: z.string(),
  tags: z.array(z.string()),
  userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId format',
  }),
});

const tagSchemaZod = z.object({ title: z.string() });

const linkSchemaZod = z.object({ hash: z.string(), userId: z.string() });
// Zod Validations End

// Schemas Start
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
});
// Schemas End

// Models Start
export const User = mongoose.model('User', userSchema);
export const Tag = mongoose.model('Tag', tagSchema);
export const Content = mongoose.model('Content', contentSchema);
export const Link = mongoose.model('Link', linkSchema);
// Models End

// Middleware to validate the input to the Schemas/Models
const safeParse = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  try {
    return { data: schema.parse(data), error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { data: null, error: error.errors };
    }
    return { data: null, error: 'Unknown error occurred' };
  }
};

export const validateUser = (data: unknown) => safeParse(userSchemaZod, data);
export const validateContent = (data: unknown) =>
  safeParse(contentSchemeZod, data);
export const validateTag = (data: unknown) => safeParse(tagSchemaZod, data);
export const validateLink = (data: unknown) => safeParse(linkSchemaZod, data);
