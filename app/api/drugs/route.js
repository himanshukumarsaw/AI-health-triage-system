import { NextResponse } from 'next/server';
import { searchDrugs, getDrugAdverseEvents } from '@/app/lib/healthApi';

/**
 * Drug Search API - Uses OpenFDA (completely free, no API key required)
 * GET /api/drugs?name=aspirin
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const drugName = searchParams.get('name');

        if (!drugName) {
            return NextResponse.json({
                error: 'Drug name is required. Usage: /api/drugs?name=aspirin'
            }, { status: 400 });
        }

        // Search for drug information from OpenFDA
        const drugs = await searchDrugs(drugName);

        if (drugs.length === 0) {
            return NextResponse.json({
                message: `No results found for "${drugName}"`,
                suggestion: 'Try searching with a different spelling or generic name'
            });
        }

        // Format the response
        const formattedDrugs = drugs.map(drug => ({
            brandName: drug.openfda?.brand_name?.[0] || 'Unknown',
            genericName: drug.openfda?.generic_name?.[0] || 'Unknown',
            manufacturer: drug.openfda?.manufacturer_name?.[0] || 'Unknown',
            purpose: drug.purpose?.[0] || drug.indications_and_usage?.[0]?.substring(0, 200) + '...' || 'Not specified',
            warnings: drug.warnings?.[0]?.substring(0, 300) + '...' || 'See product label',
            dosage: drug.dosage_and_administration?.[0]?.substring(0, 200) + '...' || 'Consult healthcare provider',
            activeIngredient: drug.active_ingredient?.[0] || drug.openfda?.substance_name?.[0] || 'Not listed',
            route: drug.openfda?.route?.[0] || 'Not specified',
            productType: drug.openfda?.product_type?.[0] || 'Not specified'
        }));

        return NextResponse.json({
            query: drugName,
            resultsCount: formattedDrugs.length,
            source: 'OpenFDA',
            drugs: formattedDrugs,
            disclaimer: 'This information is for educational purposes only. Always consult a healthcare professional before taking any medication.'
        });

    } catch (error) {
        console.error('Drug search error:', error);
        return NextResponse.json({
            error: 'Failed to search drugs',
            message: error.message
        }, { status: 500 });
    }
}

/**
 * Get adverse events for a drug
 * POST /api/drugs
 */
export async function POST(request) {
    try {
        const body = await request.json();
        const { drugName } = body;

        if (!drugName) {
            return NextResponse.json({
                error: 'Drug name is required'
            }, { status: 400 });
        }

        const adverseEvents = await getDrugAdverseEvents(drugName);

        if (adverseEvents.length === 0) {
            return NextResponse.json({
                message: `No adverse events found for "${drugName}"`,
                note: 'This does not mean the drug has no side effects'
            });
        }

        // Extract common reactions
        const reactions = {};
        adverseEvents.forEach(event => {
            event.patient?.reaction?.forEach(r => {
                const reaction = r.reactionmeddrapt;
                if (reaction) {
                    reactions[reaction] = (reactions[reaction] || 0) + 1;
                }
            });
        });

        // Sort by frequency
        const sortedReactions = Object.entries(reactions)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 20)
            .map(([reaction, count]) => ({ reaction, reportedCases: count }));

        return NextResponse.json({
            drug: drugName,
            totalReports: adverseEvents.length,
            commonReactions: sortedReactions,
            source: 'OpenFDA Adverse Event Reporting System',
            disclaimer: 'These are reported adverse events and may not represent all possible side effects.'
        });

    } catch (error) {
        console.error('Adverse events error:', error);
        return NextResponse.json({
            error: 'Failed to fetch adverse events',
            message: error.message
        }, { status: 500 });
    }
}
