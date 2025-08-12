export const mean = (arr: number[]) => (arr.length ? arr.reduce((a,b)=>a+b,0)/arr.length : 0);
export const pct = (n: number, d: number) => (d === 0 ? 0 : n / d);

export function histogram(data: number[], binSize = 10){
  const bins: { start:number; end:number; count:number }[] = [];
  for(let start = 0; start < 100; start += binSize){
    const end = start + binSize;
    bins.push({ start, end, count: data.filter(v => v >= start && (v < end || (end===100 && v<=100))).length });
  }
  return bins;
}

export function zScores(values: number[]){
  const m = mean(values);
  const sd = Math.sqrt(mean(values.map(v => (v - m)**2)));
  return values.map(v => (sd ? (v - m) / sd : 0));
}
