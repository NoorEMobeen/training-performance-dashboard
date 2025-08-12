export function errorHandler(err: any, _req: any, res: any, _next: any) {
  console.error(err);
  res.status(400).json({ error: err?.message ?? 'Bad Request' });
}
