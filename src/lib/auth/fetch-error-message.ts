/**
 * Safari/WebKit surfaces "Load failed" when fetch to Supabase auth fails (network, DNS, blockers).
 */
const NETWORK_HINT =
  'We could not reach the account service. Check your connection, disable ad blockers for this site, or try another browser. If it keeps happening, confirm Vercel has the correct Supabase URL and anon key, and that the project is not paused.';

export function humanizeAuthClientError(message: string | undefined): string {
  const raw = message?.trim();
  if (!raw) {
    return 'Something went wrong. Please try again.';
  }
  const m = raw.toLowerCase();
  if (
    m.includes('load failed') ||
    m.includes('failed to fetch') ||
    m.includes('networkerror') ||
    m.includes('network request failed')
  ) {
    return NETWORK_HINT;
  }
  return raw;
}
