import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
  name: z.string().min(3).max(20),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20),
});

export const JOIN_ROOM = 'join_room';
export const CHAT = 'chat';
export const LEAVE_ROOM = 'leave_room';
