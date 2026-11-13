export async function GET(request: Request) {
    const url = new URL(request.url)

    // Temporary error log test
    if (url.searchParams.get('testError') === '1') {
        console.error('[TaskFlow] TEST ERROR: Controlled error log test')

        return Response.json({
            status: 'ok',
            message: 'Test error logged'
        })
    }

    try {
        const appEnv = process.env.APP_ENV

        if (!appEnv) {
            throw new Error('APP_ENV environment variable is missing')
        }

        return Response.json({
            status: 'ok',
            environment: appEnv,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('[TaskFlow] Health check failed:', error)

        return Response.json(
            {
                status: 'error',
                message: 'Health check failed'
            },
            { status: 500 }
        )
    }
}
