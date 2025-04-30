export function getLoginRedirectUrl(): string {
    const redirectUri = `${window.location.origin}/auth`;
    const encoded = encodeURIComponent(redirectUri);
    return `https://python-studies.onrender.com/login?redirect_uri=${encoded}`;
}
