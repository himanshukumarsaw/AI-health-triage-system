export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/dashboard/'],
            },
        ],
        sitemap: 'https://ai-health-triage-system.netlify.app/sitemap.xml',
    };
}
