import { NextRequest } from 'next/server';

const BACKEND_BASE_URL = process.env.NEST_API_URL || 'http://localhost:4000';

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function proxy(request: NextRequest, context: RouteContext) {
  const { path: pathSegments } = await context.params;
  const path = pathSegments.join('/');
  const targetUrl = new URL(`${BACKEND_BASE_URL.replace(/\/$/, '')}/${path}`);

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  const authorization = request.headers.get('authorization');

  if (contentType) {
    headers.set('content-type', contentType);
  }

  if (authorization) {
    headers.set('authorization', authorization);
  }

  const canHaveBody = !['GET', 'HEAD'].includes(request.method.toUpperCase());
  const body = canHaveBody ? await request.text() : undefined;

  const backendResponse = await fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body,
    cache: 'no-store',
  });

  const responseBody = await backendResponse.text();
  const responseHeaders = new Headers();
  const backendContentType = backendResponse.headers.get('content-type');

  if (backendContentType) {
    responseHeaders.set('content-type', backendContentType);
  }

  return new Response(responseBody, {
    status: backendResponse.status,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxy(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxy(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxy(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxy(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxy(request, context);
}
