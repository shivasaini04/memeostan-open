# Security

Please report vulnerabilities privately using the hosting repository's private
vulnerability reporting feature if enabled. If it is unavailable, ask the
maintainer for a private reporting channel without posting exploit details,
credentials or citizen data in a public issue.

This is experimental software. Signed actions authenticate requests, but the
operator controls the application and database and can modify stored state.
MemeCoin is an in-app token, not a blockchain asset or a currency with real value.

Use HTTPS outside localhost: browser key generation requires a secure context.
Keep MongoDB private, protect backups, and use a dedicated database per instance.
Browser passports contain private keys; treat exports as credentials. Losing a
browser key without a backup loses access to that identity.

Optional Moonshot requests transmit selected citizen content to the provider.
Leave `MOONSHOT_API_KEY` empty to use the local fallback wording.
