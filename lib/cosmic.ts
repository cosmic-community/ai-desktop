import { createBucketClient } from '@cosmicjs/sdk'
import type { Command, Settings, ChangelogEntry } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export function getBooleanValue(field: unknown): boolean {
  if (typeof field === 'boolean') return field;
  if (typeof field === 'string') return field.toLowerCase() === 'true';
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key).toLowerCase() === 'true';
  }
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value).toLowerCase() === 'true';
  }
  return false;
}

export async function getCommands(): Promise<Command[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'commands' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Command[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch commands:', error);
    return [];
  }
}

export async function getCommand(slug: string): Promise<Command | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'commands', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return response.object as Command;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Failed to fetch command:', error);
    return null;
  }
}

export async function getSettings(): Promise<Settings[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'settings' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return (response.objects || []) as Settings[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch settings:', error);
    return [];
  }
}

export async function getChangelog(): Promise<ChangelogEntry[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'changelog' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const entries = (response.objects || []) as ChangelogEntry[];

    return entries.sort((a, b) => {
      const dateA = new Date(a.metadata?.release_date || a.created_at || '').getTime();
      const dateB = new Date(b.metadata?.release_date || b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Failed to fetch changelog:', error);
    return [];
  }
}

export async function getChangelogEntry(slug: string): Promise<ChangelogEntry | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'changelog', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return response.object as ChangelogEntry;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Failed to fetch changelog entry:', error);
    return null;
  }
}