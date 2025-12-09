import type { NextApiRequest, NextApiResponse } from 'next';
import { environment } from '@/config/environment';

type ResponseData = {
  ok: boolean;
  timestamp: string;
  healthCheck?: {
    status: number;
    url: string;
    data: unknown;
  };
  error?: {
    status?: number;
    statusText?: string;
    message?: string;
    url: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      timestamp: new Date().toISOString(),
      error: {
        message: 'Método não permitido',
        url: '',
      },
    });
  }

  const authHeader = req.headers.authorization;
  const API_URL = environment.api.baseURL;
  const CRON_SECRET = environment.cron.secret;

  if (!CRON_SECRET) {
    console.error('[CRON] CRON_SECRET não configurado');
    return res.status(500).json({
      ok: false,
      timestamp: new Date().toISOString(),
      error: {
        message: 'CRON_SECRET não configurado',
        url: '',
      },
    });
  }

  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    console.error('[CRON] Não autorizado - token inválido');
    return res.status(401).json({
      ok: false,
      timestamp: new Date().toISOString(),
      error: {
        message: 'Não autorizado',
        url: '',
      },
    });
  }

  if (!API_URL) {
    console.error('[CRON] NEXT_PUBLIC_API_URL não configurado');
    return res.status(500).json({
      ok: false,
      timestamp: new Date().toISOString(),
      error: {
        message: 'API URL não configurado',
        url: '',
      },
    });
  }

  const healthUrl = `${API_URL}/v1/health`;
  const timestamp = new Date().toISOString();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      console.log(`[CRON] ✅ Health check bem-sucedido - ${timestamp}`, {
        status: response.status,
        url: healthUrl,
        data,
      });

      return res.status(200).json({
        ok: true,
        timestamp,
        healthCheck: {
          status: response.status,
          url: healthUrl,
          data,
        },
      });
    } else {
      console.error(`[CRON] ❌ Health check falhou - ${timestamp}`, {
        status: response.status,
        statusText: response.statusText,
        url: healthUrl,
      });

      return res.status(response.status).json({
        ok: false,
        timestamp,
        error: {
          status: response.status,
          statusText: response.statusText,
          url: healthUrl,
        },
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error(`[CRON] ❌ Erro ao executar health check - ${timestamp}`, {
      error: errorMessage,
      url: healthUrl,
    });

    return res.status(500).json({
      ok: false,
      timestamp,
      error: {
        message: errorMessage,
        url: healthUrl,
      },
    });
  }
}

