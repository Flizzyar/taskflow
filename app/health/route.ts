export async function GET() {
    const appEnv = process.env.APP_ENV || 'unknown'

    return Response.json({
        status: 'ok',
        environment: appEnv,
        timestamp: new Date().toISOString()
    })
}
