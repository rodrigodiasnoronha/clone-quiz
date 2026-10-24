// Resultados das alunas: foto com selo "-X lbs"; "compact" mostra as três lado a lado
export default function Results({ content: c }) {
  return (
    <div className={`results ${c.compact ? 'compact' : ''}`}>
      {c.items.map(r => (
        <div className="result" key={r.name}>
          <div className="result-pic">
            <img src={r.image} alt={`${r.name}'s result`} loading="lazy" decoding="async" />
            <span className="result-kg">-{r.lbs} lbs</span>
          </div>
          {c.compact
            ? <small><b>{r.name}</b> · {r.days} days</small>
            : <p><b>{r.name}</b> lost {r.lbs} lbs in {r.days} days — <strong>before even finishing the 21-day challenge.</strong></p>}
        </div>
      ))}
    </div>
  );
}
