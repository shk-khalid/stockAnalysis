
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabase = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        const { action, query, symbol, shares, purchasePrice, watchlistId, symbols } = await req.json()

        // Helper to fetch data from Yahoo Finance
        const fetchYahooData = async (endpoint: string, params: Record<string, string>) => {
            const url = new URL(`https://query1.finance.yahoo.com/${endpoint}`);
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

            const response = await fetch(url.toString());
            if (!response.ok) throw new Error(`Yahoo API Error: ${response.statusText}`);
            return await response.json();
        };

        let result;

        switch (action) {
            case 'search': {
                if (!query) throw new Error('Query parameter is required');

                const data = await fetchYahooData('v1/finance/search', { q: query, quotesCount: '10', newsCount: '0' });

                result = data.quotes
                    .filter((q: any) => q.quoteType === 'EQUITY' || q.quoteType === 'ETF')
                    .map((q: any) => ({
                        symbol: q.symbol,
                        name: q.longname || q.shortname || q.symbol,
                        type: q.quoteType,
                        exch: q.exchange,
                    }));
                break;
            }

            case 'add-stock': {
                if (!symbol || !watchlistId || shares === undefined || purchasePrice === undefined) {
                    throw new Error('Missing required parameters');
                }

                // 1. Fetch Stock Info from Yahoo
                const quoteData = await fetchYahooData('v7/finance/quote', { symbols: symbol });
                const quote = quoteData.quoteResponse?.result?.[0];

                if (!quote) throw new Error('Stock not found');

                const name = quote.longName || quote.shortName || symbol;
                const sector = quote.sector || 'Unknown';
                const currentPrice = quote.regularMarketPrice || 0;

                // 2. Insert into DB
                // Note: We are simplifying the "User Stock" model to just "Watchlist Stock" for now
                // as per the schema we assumed earlier. 
                const { data: newStock, error } = await supabase
                    .from('watchlist_stocks')
                    .insert({
                        watchlist_id: watchlistId,
                        symbol: symbol.toUpperCase(),
                        shares: Number(shares),
                        purchase_price: Number(purchasePrice),
                        name: name,
                        sector: sector,
                        is_pinned: false
                    })
                    .select()
                    .single();

                if (error) throw error;

                result = {
                    message: 'Stock added successfully',
                    stock: {
                        id: newStock.id,
                        symbol: newStock.symbol,
                        name: newStock.name,
                        price: currentPrice,
                        change: quote.regularMarketChange || 0,
                        alerts: [],
                        pinned: false,
                        sector: newStock.sector,
                        shares: newStock.shares,
                        avgPrice: newStock.purchase_price,
                        chartData: [] // Could fetch history if needed
                    }
                };
                break;
            }

            case 'batch-quotes': {
                if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
                    result = {};
                    break;
                }

                const quoteData = await fetchYahooData('v7/finance/quote', { symbols: symbols.join(',') });
                const quotes = quoteData.quoteResponse?.result || [];

                const quoteMap: Record<string, any> = {};
                quotes.forEach((q: any) => {
                    quoteMap[q.symbol] = {
                        price: q.regularMarketPrice,
                        change: q.regularMarketChange,
                        name: q.longName || q.shortName,
                        sector: q.sector,
                        marketCap: q.marketCap,
                        volume: q.regularMarketVolume,
                        // Simple 1d chart data simulation or fetch separate endpoint
                        chartData: []
                    };
                });
                result = quoteMap;
                break;
            }

            case 'overview': {
                // This handles the "Overall Watchlist Overview" logic
                // 1. Fetch all stocks for user
                const { data: stocks, error } = await supabase
                    .from('watchlist_stocks')
                    .select('*'); // In real app, filter by user's watchlists

                if (error) throw error;
                if (!stocks || stocks.length === 0) {
                    result = { overallTotalValue: 0, overallTotalGainLoss: 0, stocks: [] };
                    break;
                }

                // 2. Batch fetch prices
                const uniqueSymbols = [...new Set(stocks.map((s: any) => s.symbol))];
                const quoteData = await fetchYahooData('v7/finance/quote', { symbols: uniqueSymbols.join(',') });
                const quotes = quoteData.quoteResponse?.result || [];
                const quoteMap = new Map(quotes.map((q: any) => [q.symbol, q]));

                let overallTotalValue = 0;
                let overallTotalGainLoss = 0;
                const stocksOverview = [];

                for (const stock of stocks) {
                    const quote: any = quoteMap.get(stock.symbol) || {};
                    const currentPrice = quote.regularMarketPrice || 0;
                    const shares = stock.shares;
                    const avgPrice = stock.purchase_price;

                    const totalValue = currentPrice * shares;
                    const gainLoss = (currentPrice - avgPrice) * shares;

                    overallTotalValue += totalValue;
                    overallTotalGainLoss += gainLoss;

                    stocksOverview.push({
                        symbol: stock.symbol,
                        historicalData: [], // Would need separate API calls for history
                        mostRecentDividend: quote.dividendDate ? {
                            paymentDate: new Date(quote.dividendDate * 1000).toISOString(),
                            amount: quote.dividendRate,
                            yield: quote.dividendYield
                        } : null
                    });
                }

                result = {
                    overallTotalValue,
                    overallTotalGainLoss,
                    stocks: stocksOverview
                };
                break;
            }

            default:
                throw new Error('Invalid action');
        }

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
