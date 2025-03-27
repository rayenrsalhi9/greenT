export function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function formatDate(seconds) {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export function displayTimeAgo(seconds, t) {
    const date = new Date(seconds * 1000);
    const elapsedTime = Date.now() - date.getTime();
    if (elapsedTime < 60000) {
        return t('Just now');
    } else if (elapsedTime < 3600000) {
        return `${Math.floor(elapsedTime / 60000)} ${t('minutes ago')}`;
    } else if (elapsedTime < 86400000) {
        return `${Math.floor(elapsedTime / 3600000)} ${t('hours ago')}`;
    } else if (elapsedTime < 31536000000) {
        return `${Math.floor(elapsedTime / 86400000)} ${t('days ago')}`;
    } else {
        return formatDate(seconds);
    }
}