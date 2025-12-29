import { Router } from "express";
import { getNow } from "../utils/time.js";
import prisma from "../db/prisma.js";
import { nanoid } from "nanoid";

const router = Router();

/* ======================
   CREATE PASTE
   ====================== */
router.post("/", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({ error: "content must be a non-empty string" });
  }

  if (
    ttl_seconds !== undefined &&
    (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)
  ) {
    return res
      .status(400)
      .json({ error: "ttl_seconds must be an integer >= 1" });
  }

  if (
    max_views !== undefined &&
    (!Number.isInteger(max_views) || max_views < 1)
  ) {
    return res
      .status(400)
      .json({ error: "max_views must be an integer >= 1" });
  }

  const now = getNow(req);

  const expiresAt =
    ttl_seconds !== undefined
      ? new Date(now.getTime() + ttl_seconds * 1000)
      : null;

  const id = nanoid(8);

  await prisma.paste.create({
    data: {
      id,
      content,
      expiresAt,
      maxViews: max_views ?? null,
      remainingViews: max_views ?? null,
    },
  });

  const baseUrl = `${req.protocol}://${req.get("host")}`;

  res.status(201).json({
    id,
    url: `${baseUrl}/p/${id}`,
  });
});

/* ======================
   FETCH PASTE — FINAL, CORRECT
   ====================== */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const paste = await prisma.paste.findUnique({ where: { id } });

  if (!paste) {
    return res.status(404).json({ error: "Paste not found" });
  }

  const now = getNow(req);

  if (paste.expiresAt && now > paste.expiresAt) {
    return res.status(404).json({ error: "Paste not found" });
  }

  // ❗ ALLOW FIRST VIEW ALWAYS
  if (paste.remainingViews !== null && paste.remainingViews <= 0) {
    return res.status(404).json({ error: "Paste not found" });
  }

  // SEND RESPONSE FIRST
  res.status(200).json({
    content: paste.content,
    remaining_views:
      paste.remainingViews !== null ? paste.remainingViews - 1 : null,
    expires_at: paste.expiresAt,
  });

  // ⬇️ DECREMENT AFTER RESPONSE
  if (paste.remainingViews !== null) {
    await prisma.paste.update({
      where: { id },
      data: { remainingViews: paste.remainingViews - 1 },
    });
  }
});

export default router;
