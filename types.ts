export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Command extends CosmicObject {
  type: 'commands';
  metadata: {
    name?: string;
    intent_key?: string;
    description?: string;
    example_prompts?: string;
    icon_emoji?: string;
    category?: string;
    is_dangerous?: boolean | { key: string; value: string };
    supports_undo?: boolean | { key: string; value: string };
    supports_simulate?: boolean | { key: string; value: string };
    screenshot?: {
      url: string;
      imgix_url: string;
    };
  };
}

export interface Settings extends CosmicObject {
  type: 'settings';
  metadata: {
    allowed_paths?: string;
    blocked_operations?: string;
    default_simulate_mode?: boolean | { key: string; value: string };
    max_batch_size?: number | string;
    hotkey_combo?: string;
    theme?: string | { key: string; value: string };
    audit_retention_days?: number | string;
  };
}

export interface ChangelogEntry extends CosmicObject {
  type: 'changelog';
  metadata: {
    version?: string;
    release_date?: string;
    summary?: string;
    details?: string;
    type?: string | { key: string; value: string };
    hero_image?: {
      url: string;
      imgix_url: string;
    };
  };
}