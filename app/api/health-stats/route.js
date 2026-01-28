import { NextResponse } from 'next/server';
import { getHealthStats, getGlobalHealthStats } from '@/app/lib/healthApi';

/**
 * Health Statistics API - Uses Disease.sh (completely free, no API key required)
 * GET /api/health-stats?country=india
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country');

        let stats;

        if (country) {
            // Get country-specific stats
            stats = await getHealthStats(country);

            if (!stats || stats.message) {
                return NextResponse.json({
                    error: `No data found for country: ${country}`,
                    suggestion: 'Try using the country name in English (e.g., india, usa, germany)'
                }, { status: 404 });
            }

            return NextResponse.json({
                country: stats.country,
                population: stats.population,
                healthMetrics: {
                    activeCases: stats.active,
                    recovered: stats.recovered,
                    critical: stats.critical,
                    casesPerMillion: stats.casesPerOneMillion,
                    testsPerMillion: stats.testsPerOneMillion,
                    totalTests: stats.tests
                },
                lastUpdated: new Date(stats.updated).toISOString(),
                source: 'Disease.sh API',
                disclaimer: 'Health statistics are updated regularly but may have slight delays.'
            });
        } else {
            // Get global stats
            stats = await getGlobalHealthStats();

            if (!stats) {
                return NextResponse.json({
                    error: 'Failed to fetch global statistics'
                }, { status: 500 });
            }

            return NextResponse.json({
                scope: 'Global',
                healthMetrics: {
                    activeCases: stats.active,
                    recovered: stats.recovered,
                    critical: stats.critical,
                    affectedCountries: stats.affectedCountries,
                    casesPerMillion: stats.casesPerOneMillion,
                    totalTests: stats.tests,
                    testsPerMillion: stats.testsPerOneMillion
                },
                lastUpdated: new Date(stats.updated).toISOString(),
                source: 'Disease.sh API',
                disclaimer: 'Global health statistics aggregated from multiple sources.'
            });
        }

    } catch (error) {
        console.error('Health stats error:', error);
        return NextResponse.json({
            error: 'Failed to fetch health statistics',
            message: error.message
        }, { status: 500 });
    }
}
